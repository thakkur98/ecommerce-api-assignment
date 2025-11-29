import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import styled from "styled-components";

interface CartPageProps {
  onClose: () => void;
}

const Popup = ({ total, discount, onClose }: any) => {
  return (
    <PopupOverlay>
      <PopupBox>
        <h3>Order Successful 🎉</h3>

        <p><strong>Total:</strong> ₹{total.toFixed(2)}</p>
        <p><strong>Discount Applied:</strong> ₹{discount.toFixed(2)}</p>

        <button onClick={onClose}>Close</button>
      </PopupBox>
    </PopupOverlay>
  );
};

const CartPage: React.FC<CartPageProps> = ({ onClose }) => {
  const {
    cart = [],
    increaseQty,
    decreaseQty,
    checkout,
    discountCodes,
  } = useCart();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ total: 0, discount: 0 });

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0
  );

  const calculateDiscount = (code: string, total: number) => {
    if (code === "SAVE10") return total * 0.1;
    if (code === "WELCOME20") return total * 0.2;
    if (code === "FLAT50") return 50;
    return 0;
  };

  const handleCheckout = () => {
    if (discountCode && !discountCodes.includes(discountCode)) {
      setPopupData({ total: totalPrice, discount: 0 });
      setShowPopup(true);
      return;
    }

    const discountAmount = calculateDiscount(discountCode, totalPrice);
    setAppliedDiscount(discountAmount);

    setPopupData({
      total: totalPrice - discountAmount,
      discount: discountAmount,
    });

    setShowPopup(true);

    checkout(discountCode || undefined);

    setDiscountCode("");
  };

  const handleCodeClick = (code: string) => {
    setDiscountCode(code);
  };

  return (
    <Wrapper>
      <TopBar>
        <h2>Your Cart</h2>
        <CloseButton onClick={onClose}>X</CloseButton>
      </TopBar>

      {cart.length === 0 && <EmptyText>No items in cart.</EmptyText>}

      {cart.length > 0 &&
        cart.map((item: any) => (
          <Item key={item.id}>
            <img src={item.image} alt={item.title} width={70} />
            <ItemInfo>
              <h4>{item.title}</h4>
              <p>
                ₹ {item.price} x {item.qty} = ₹ {(item.price * item.qty).toFixed(2)}
              </p>
            </ItemInfo>

            <QtyBox>
              <QtyBtn onClick={() => decreaseQty(item.id)}>-</QtyBtn>
              <span>{item.qty}</span>
              <QtyBtn onClick={() => increaseQty(item.id)}>+</QtyBtn>
            </QtyBox>
          </Item>
        ))}

      {cart.length > 0 && (
        <>
          <DiscountWrapper>
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <ApplyBtn onClick={handleCheckout}>Checkout</ApplyBtn>
          </DiscountWrapper>

          <AvailableCodes>
            <p>Available Discount Codes (click to apply):</p>
            <ul>
              {discountCodes.map((code: string) => (
                <li key={code} onClick={() => handleCodeClick(code)}>
                  {code}
                </li>
              ))}
            </ul>
          </AvailableCodes>

          <Total>
            <strong>Total:</strong> ₹ {(totalPrice - appliedDiscount).toFixed(2)}
            {appliedDiscount > 0 && (
              <DiscountText>
                {" "}
                (Discount Applied: ₹{appliedDiscount.toFixed(2)})
              </DiscountText>
            )}
          </Total>
        </>
      )}

      {showPopup && (
        <Popup
          total={popupData.total}
          discount={popupData.discount}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Wrapper>
  );
};

export default CartPage;

const Wrapper = styled.div`
  padding: 20px;
  background: #f7f7f7;
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: #ff6f61;
  border: none;
  color: #fff;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ff856f;
  }
`;

const EmptyText = styled.p`
  margin-top: 30px;
  font-size: 16px;
  color: #555;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const QtyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QtyBtn = styled.button`
  width: 32px;
  height: 32px;
  background: #eee;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ddd;
  }
`;

const Total = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: right;
`;

const DiscountText = styled.span`
  color: #4caf50;
  font-weight: bold;
  margin-left: 10px;
`;

const DiscountWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
`;

const ApplyBtn = styled.button`
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #45a049;
  }
`;

const AvailableCodes = styled.div`
  margin-top: 15px;

  p {
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    background: #e6e6e6;
    display: inline-block;
    margin: 5px 5px 0 0;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: #d4d4d4;
    }
  }
`;

/* POPUP STYLES */
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const PopupBox = styled.div`
  background: white;
  padding: 25px;
  width: 320px;
  text-align: center;
  border-radius: 10px;
  animation: fadeIn 0.3s ease;

  h3 {
    margin-bottom: 10px;
  }

  button {
    margin-top: 15px;
    padding: 10px 15px;
    border: none;
    background: #4caf50;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background: #45a049;
  }
`;
