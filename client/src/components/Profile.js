import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import PRCarousel from "./Carousel";
import Modal from "./Modal";
import { submit } from './UserFunctions';
import axios from 'axios';

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
      data: [],
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

    // fetch data
    axios.get(`/properties/display?role=${decoded.role}&email=${decoded.email}`).then( (data) => {
      this.setState({
        data: data.data.data
        
      })
    })

    this.fetchPortfolio()
  }

    fetchPortfolio() {
         const token = localStorage.usertoken;
         const decoded = jwt_decode(token);
             axios
               .get(
                 `/properties/display?role=${decoded.role}&email=${decoded.email}`
               )
               .then(data => {
                 this.setState({
                   data: data.data.data
                 });
               });
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
      this.props.history.push('/profile');
      this.fetchPortfolio();
    });

  }



  render() {
    return (
      <div className="portfolio-container">
        <PRCarousel />
        <table className="table portfolio-table">
          <tbody className="portfolio-user">
            <tr>
              <td>Logged in as:</td>
              <td>
                {this.state.first_name} {this.state.last_name}
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr className="table-header">
              <td>Landlord's Name</td>
              <td>Landlord's Email</td>
              <td>Tenant's Name</td>
              <td>Tenant's Email</td>
              <td className="portfolio-address">Property Address</td>
            </tr>

            {this.state.data.map(contact => {
              return (
                <tr className="table-content">
                  <td>{contact.landlord_name}</td>
                  <td>{contact.landlord_contact}</td>
                  <td>{contact.tenant_name}</td>
                  <td>{contact.tenant_contact}</td>
                  <td className="portfolio-address">{contact.address}</td>
                </tr>
              );
            })}
          </tbody>
          {this.state.isShowing ? (
            <div onClick={this.closeModalHandler} className="back-drop"></div>
          ) : null}

          <button className="open-modal-btn" onClick={this.openModalHandler}>
            Add Property
          </button>
        </table>

        <div className="add-modal">
          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
          >
            <div className="modal-container">
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
                      <label htmlFor="name">Landlord Email</label>
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
                      <label htmlFor="name">Tenant's Email</label>
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
                    <button
                      type="submit"
                      className="btn-continue"
                      onClick={this.closeModalHandler}
                    >
                      Submit
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={this.closeModalHandler}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Profile
