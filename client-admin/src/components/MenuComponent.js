import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu"><Link to="/admin/home">HOME</Link></li>
            <li className="menu"><Link to="/admin/category">CATEGORY</Link></li>
            <li className="menu"><Link to="/admin/product">PRODUCT</Link></li>
            <li className="menu"><Link to="/admin/order">ORDER</Link></li>
            <li className="menu"><Link to="/admin/customer">CUSTOMER</Link></li>
          </ul>
        </div>

        <div className="float-right">
          Hello <b>{this.context.username}</b> |{' '}
          <span className="link" onClick={() => this.lnkLogoutClick()}>Logout</span>
        </div>

        <div className="float-clear" />
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;
