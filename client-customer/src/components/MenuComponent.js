import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.props.categories ? this.props.categories.map((item) => {
      return (
        <li key={item._id} className="menu">
          <Link to={'/product/category/' + item._id}>{item.name}</Link>
        </li>
      );
    }) : [];

    return (
      <div>
        <ul>
          {cates}
        </ul>

        <form className="search">
          <input
            type="search"
            placeholder="Enter keyword"
            className="keyword"
            value={this.state.txtKeyword}
            onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
          />
          <input
            type="submit"
            value="SEARCH"
            onClick={(e) => this.btnSearchClick(e)}
          />
        </form>
      </div>
    );
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
}

export default withRouter(Menu);