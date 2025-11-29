import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 16px 24px;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  overflow-x: hidden;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

const CartButton = styled.button`
  padding: 8px 16px;
  background: #fff;
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ff856f;
  }
`;

interface HeaderProps {
  onViewCart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewCart }) => {
  return (
    <HeaderContainer>
      <Title>Cart Shop</Title>
      <CartButton onClick={onViewCart}>View Cart</CartButton>
    </HeaderContainer>
  );
};

export default Header;
