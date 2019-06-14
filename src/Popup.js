import React, { Component } from 'react';
import './Popup.css';
import loader from './loader.gif';
import ReactHtmlParser from 'react-html-parser';
import CartButton from './Components/CartButton'

class Popup extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      product: '',
      loading: true
    };
  };

  componentDidMount() {
    fetch('http://localhost:3005/products/' + this.props.modalId)
      .then(res => res.json())
      .then(json => {
        this.setState({
          product: json,
          loading: false
        });
      });
  };

  render() {
    var loading = this.state.loading;
    if (loading) {
      return <img src={loader} className="loader" alt="loader" />
    };
    const desc = this.state.product.general.description;
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <img src={this.state.product.images.primary.large} alt="product" />
          <div className='media-body'>
            <h5 className='mt-0'>{this.state.product.general.name}</h5>
            <h6>{this.state.product.brand.name}</h6>
            <p>Product ID: {this.state.product.general.presentable_id}</p>
            <div>{ReactHtmlParser(desc)}</div>
            <CartButton />
            <button className='btn btn-danger' onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      </div>
    );
  };
};

export default Popup;