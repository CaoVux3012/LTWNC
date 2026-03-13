import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
  // 1. Khai báo các hàm cập nhật state TRƯỚC
  setToken = (value) => {
    this.setState({ token: value });
  }

  setCustomer = (value) => {
    this.setState({ customer: value });
  }

  setMycart = (value) => {
    this.setState({ mycart: value });
  }

  // 2. Khai báo state SAU (để có thể gọi được các hàm ở trên)
  state = {
    token: '',
    customer: null,
    mycart: [],
    setToken: this.setToken,
    setCustomer: this.setCustomer,
    setMycart: this.setMycart
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;