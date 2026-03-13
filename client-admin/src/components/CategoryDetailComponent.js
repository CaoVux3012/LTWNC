import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div className="float-right">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input type="text" value={this.state.txtID} readOnly />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={e => this.setState({ txtName: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="button" value="ADD NEW" onClick={() => this.btnAddClick()} />
                  <input type="button" value="UPDATE" onClick={() => this.btnUpdateClick()} />
                  <input type="button" value="DELETE" onClick={() => this.btnDeleteClick()} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item != null) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name
      });
    }
  }

  // ===== APIs =====
  btnAddClick() {
    const category = { name: this.state.txtName };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', category, config).then(() => {
      this.reloadCategories();
    });
  }

  btnUpdateClick() {
    const category = { name: this.state.txtName };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/categories/${this.state.txtID}`, category, config).then(() => {
      this.reloadCategories();
    });
  }

  btnDeleteClick() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/categories/${this.state.txtID}`, config).then(() => {
      this.reloadCategories();
    });
  }

  reloadCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then(res => {
      this.props.updateCategories(res.data);
      this.setState({ txtID: '', txtName: '' });
    });
  }
}

export default CategoryDetail;
