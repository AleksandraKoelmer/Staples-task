import React from 'react';
import ProductView from './ProductView';
import Search from '../Search'

const ProductList = ({ products, showModal, handleSearch }) => (
  <div>
    <h3 className='header-inline'>Products List</h3> <Search handleSearch={handleSearch} />
    {products.map((product) =>
      <ProductView product={product} key={product.id} inCart={false} showModal={showModal} >
        <input className='quantity-input' type='number'></input>
      </ProductView>
    )}
  </div>
);

export default ProductList;