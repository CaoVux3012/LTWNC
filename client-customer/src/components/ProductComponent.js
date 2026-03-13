import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
  return (
    <figure key={item._id}>
      <Link to={'/product/' + item._id}>
        <img src={'data:image/jpg;base64,' + item.image} />
      </Link>
      <figcaption>
        {item.name}
        <br/>
        Price: {item.price}
      </figcaption>
    </figure>
  );
});

    return (
      <div className="text-center">
        <h2>LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }

  componentDidMount() {
  const params = this.props.params;
  if (params.cid) {
    this.apiGetProductsByCatID(params.cid);
  } 
  else if (params.keyword) {
    this.apiGetProductsByKeyword(params.keyword);
  }
}

  componentDidUpdate(prevProps) {
  const params = this.props.params;

  if (params.cid && params.cid !== prevProps.params.cid) {
    this.apiGetProductsByCatID(params.cid);
  } 
  else if (params.keyword && params.keyword !== prevProps.params.keyword) {
    this.apiGetProductsByKeyword(params.keyword);
  }
}

  // APIs

  apiGetProductsByKeyword(keyword) {
  axios.get('/api/customer/products/search/' + keyword).then((res) => {
    const result = res.data;
    this.setState({ products: result });
  });
}

  apiSearchProducts(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);