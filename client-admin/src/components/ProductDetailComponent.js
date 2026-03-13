import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: ''
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (
          <option
            key={cate._id}
            value={cate._id}
            selected={cate._id === this.props.item.category._id}
          >
            {cate.name}
          </option>
        );
      }
      return (
        <option key={cate._id} value={cate._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="float-right">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtID}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) =>
                      this.setState({ txtName: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) =>
                      this.setState({ txtPrice: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select
                    onChange={(e) =>
                      this.setState({ cmbCategory: e.target.value })
                    }
                  >
                    {cates}
                  </select>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <input type="submit" value="ADD NEW" onClick={(e)=>this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e)=>this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e)=>this.btnDeleteClick(e)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <img
                    src={this.state.imgProduct}
                    width="300px"
                    height="300px"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item != null) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }

  // event handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtName && txtPrice && cmbCategory && imgProduct) {
      const cate = {
        name: txtName,
        price: txtPrice,
        category: cmbCategory,
        image: imgProduct.split(',')[1]
      };
      this.apiPostProduct(cate);
    } else {
      alert('Please input all fields');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtID && txtName && txtPrice && cmbCategory) {
      const cate = {
        name: txtName,
        price: txtPrice,
        category: cmbCategory,
        image: imgProduct.split(',')[1]
      };
      this.apiPutProduct(txtID, cate);
    } else {
      alert('Please input all fields');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      if (this.state.txtID) {
        this.apiDeleteProduct(this.state.txtID);
      } else {
        alert('Please select product');
      }
    }
  }

  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then(() => {
      alert('OK BABY!');
      window.location.reload();
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/products/${id}`, prod, config).then(() => {
      alert('OK BABY!');
      window.location.reload();
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/products/${id}`, config).then(() => {
      alert('OK BABY!');
      window.location.reload();
    });
  }
}

export default ProductDetail;
