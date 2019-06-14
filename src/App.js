import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import loader from './loader.gif';
import './App.css';
import Popup from './Popup'
import ShoppingCartList from './Components/ShoppingCartList'
import ProductList from './Components/ProductList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: '',
      page: 1,
      links: '',
      showPopup: false,
      popUpTarget: null,
      searchingText: '',
    };
    this.firstPage = this.firstPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.showModal = this.showModal.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  };

  componentDidMount() {
    this.changePage('http://localhost:3005/products?_page=1');
  };

  changePage(url) {
    var address;
    fetch(url)
      .then(function (res) {
        if (res.headers.get('Link') !== null) {
          address = parse_link_header(res.headers.get('Link'));
        };

        function parse_link_header(header) {
          if (header.length === 0) {
            throw new Error("input must not be of zero length");
          };
          // Split parts by comma
          var parts = header.split(',');
          var links = {};
          // Parse each part into a named link
          for (var i = 0; i < parts.length; i++) {
            var section = parts[i].split(';');
            if (section.length !== 2) {
              throw new Error("section could not be split on ';'");
            };
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            links[name] = url;
          };
          return links;
        };
        return res.json()
      })
      .then(json => {
        this.setState({
          loading: false,
          links: address,
          products: json,
        });
      });
  };

  firstPage() {
    this.changePage(this.state.links.first)
  };
  nextPage() {
    this.changePage(this.state.links.next)
  };
  prevPage() {
    this.changePage(this.state.links.prev)
  };
  lastPage() {
    this.changePage(this.state.links.last)
  };

  showModal(e) {
    e.preventDefault();
    this.setState({
      popUpTarget: e.target.id,
      showPopup: !this.state.showPopup
    });
  };

  handleSearch(searchingText) {
    if (searchingText.length > 0) {
      this.changePage('http://localhost:3005/products?q=' + searchingText)
    }
    else
      this.componentDidMount()
  };

  render() {
    var { loading, products } = this.state;
    var cartList = products.slice(0, 1)
    if (loading) {
      return <img src={loader} className="loader" alt="loader" />
    }
    return (
      <div className="container">
        <ShoppingCartList products={cartList} showModal={this.showModal} />
        <ProductList products={products} showModal={this.showModal} handleSearch={this.handleSearch} />
        {this.state.links ?
          <div className='nav-buttons'>
            <button onClick={this.firstPage} className='btn btn-primary'>First Page</button>
            <button onClick={this.prevPage} className='btn btn-primary'>Previous Page</button>
            <button onClick={this.nextPage} className='btn btn-primary'>Next Page</button>
            <button onClick={this.lastPage} className='btn btn-primary'>Last Page</button>
          </div>
          : null}
        {this.state.showPopup ?
          <Popup closePopup={this.showModal} modalId={this.state.popUpTarget} />
          : null}
      </div>
    );
  };
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

  //Sources:
  //Popup https://codepen.io/bastianalbers/pen/PWBYvz?editors=0110
  //function  parse_lin_header https://gist.github.com/niallo/3109252