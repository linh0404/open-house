import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import PRCarousel from "./Carousel";
import Modal from "./Modal";
import { submit } from './UserFunctions';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      landlord_name: '',
      landlord_contact: '',
      tenant_name: '',
      tenant_contact: '',
      address: '',
      isShowing: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
      email: decoded.email,
      role: decoded.role
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const newProperty = {
      landlord_name: this.state.landlord_name,
      landlord_contact: this.state.landlord_contact,
      tenant_name: this.state.tenant_name,
      tenant_contact: this.state.tenant_contact,
      address: this.state.address
    }

    console.log({newProperty})

    submit(newProperty).then(res => {
      this.props.history.push('/profile')
    })
  }


  render() {
    return (
      <div className="portfolio-container">
        <PRCarousel />
        <table className="table portfolio-table">
          <tbody>
            <tr>
              <td>Logged in as:</td>
              <td>{this.state.first_name} {this.state.last_name}</td>
            </tr>
          </tbody>
          <br></br>
          <br></br>
          <br></br>
          <tbody>
            <tr>
              <td>Property Address</td>
              <td>Landlord's Name</td>
              <td>Landlord's Email</td>
              <td>Tenant's Name</td>
              <td>Tenant's Email</td>
            </tr>
            <tr>
              <td>{this.state.address}</td>
              <td>{this.state.landlord_name}</td>
              <td>{this.state.landlord_contact}</td>
              <td>{this.state.tenant_name}</td>
              <td>{this.state.tenant_contact}</td>
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
                        value={this.state.tenant_contact}
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
