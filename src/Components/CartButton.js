import React from 'react';
import Button from './Button';

const CartButton = ({ inCart }) => (
    inCart ?
      <Button className="btn btn-danger" label='Remove from cart' /> :
      <Button className="btn btn-success" label='Add to cart' />
  );    
  
  export default CartButton;