import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import PRCarousel from "./Carousel";

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
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
              <td>Fist Name</td>
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
      </div>
    )
  }
}

export default Profile
