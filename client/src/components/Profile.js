import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import PRCarousel from "./Carousel";
import Modal from "./Modal";

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      isShowing: false,
      errors: {}
    }
  }
  
  openModalHandler = () => {
    this.setState({ isShowing: true });
  }

  closeModalHandler = () => {
    this.setState({ isShowing: false });
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }


  render() {
    return (
      <div className="portfolio-container">
        <PRCarousel />
        <table className="table portfolio-table">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{this.state.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{this.state.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.email}</td>
            </tr>
          </tbody>
        </table>

        <div>
          {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}

          <button className="open-modal-btn" onClick={this.openModalHandler}>Add Property</button>

          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}>
            <div className="login-container">
              <div className="row">
                <div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Add Property</h1>
                    <div className="form-group">
                      <label htmlFor="name">Landlord Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="landlord_name"
                        placeholder="Enter your Landlord's Name"
                        value={this.state.landlord_name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Landlord Contact Details</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="landlord_contact"
                        pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                        placeholder="Enter your Landlord's Contact Number"
                        value={this.state.landlord_contact}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Tenant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tenant_name"
                        placeholder="Enter your Tenant's Name"
                        value={this.state.tenant_name}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Tenant's Contact Details</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="tenant_contact"
                        pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                        placeholder="Enter your Tenant's Contact Number"
                        value={this.state.landlord_contact}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Enter your Property's Address"
                        value={this.state.address}
                        onChange={this.onChange}
                      />
                    </div>
                    <button type="submit" className="btn-continue">Submit</button>
                    <button className="btn-cancel" onClick={this.closeModalHandler}>Close</button>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>



      </div>
    )
  }
}

export default Profile
