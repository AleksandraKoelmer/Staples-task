import React from 'react';
import ProductView from './ProductView'

const ShoppingCartList = ({ products, showModal }) => (
  <div>
    <h4>Shopping Cart</h4>
    {products.map((product) => (<ProductView product={product} key={product.id} inCart={true} showModal={showModal} />)
    )}
  </div>
);

export default ShoppingCartList;