import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../components/header/Header";
import { fetchProducts } from "../../redux/products/ProductAction";
import ProductCard from "../../components/card/Card";
import CartPage from "../cart/Cart";

const DashboardWrapper = styled.div`
  padding: 30px 50px;
  background: #f7f7f7;
  min-height: 100vh;
  overflow-x: hidden;
`;

const ProductGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  padding-top: 40px;
  text-align: center;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const { loading, data } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header onViewCart={() => setShowCart(true)} />

      {showCart ? (
        <CartPage onClose={() => setShowCart(false)} />
      ) : (
        <DashboardWrapper>
          {loading && <LoadingText>Loading...</LoadingText>}

          {data?.length > 0 && (
            <ProductGrid>
              {data.map((item: any) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </ProductGrid>
          )}
        </DashboardWrapper>
      )}
    </>
  );
};

export default Dashboard;
