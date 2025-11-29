
import styled from "styled-components";
import { useCart } from "../../context/CartContext";

interface Rating {
  rate: number;
  count: number;
}

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const Card = styled.div`
  width: 260px;
  background: #ffffff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: contain;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-height: 40px;
`;

const Category = styled.span`
  font-size: 13px;
  color: #777;
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #111;
`;

const RatingBox = styled.div`
  font-size: 14px;
  color: #444;
`;

const Button = styled.button`
  background: #111;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #333;
  }
`;

const QtyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QtyBtn = styled.button`
  width: 32px;
  height: 32px;
  background: #eee;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
`;

const ProductCard = ({ title, price, category, image, rating , id}: any) => {
 const { cart, addItem, increaseQty, decreaseQty } = useCart();

  const item = cart.find((c: any) => c.id === id);
  const qty = item?.qty || 0;

  return (
     <Card>
      <ProductImage src={image} />

      <Title>{title}</Title>
      <Category>{category}</Category>
      <Price>₹ {price}</Price>
      <RatingBox>⭐ {rating.rate} ({rating.count})</RatingBox>

      {qty === 0 ? (
        <Button onClick={() => addItem({ id, title, price, image })}>
          Add to Cart
        </Button>
      ) : (
        <QtyBox>
          <QtyBtn onClick={() => decreaseQty(id)}>-</QtyBtn>
          <span>{qty}</span>
          <QtyBtn onClick={() => increaseQty(id)}>+</QtyBtn>
        </QtyBox>
      )}
    </Card>
  );
};

export default ProductCard;
