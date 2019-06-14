import React from 'react';
import CartButton from './CartButton'
import './ProductView.css'

const ProductView = ({ product, inCart, children, showModal }) => (
  <div className='media'>
    <img className='align-self-center mr-3 product-image' onClick={showModal} id={product.id} src={product.images.primary.large} alt="product" />
    <div className='media-body'>
      <h5 className='mt-0' onClick={showModal} id={product.id}>{product.general.name} </h5>
      <h6 onClick={showModal} id={product.id}>{product.brand.name}</h6>
      <p onClick={showModal} id={product.id}>Product ID: {product.general.presentable_id}</p>
      <CartButton inCart={inCart} />
      {children}
    </div>
  </div>
);

export default ProductView;