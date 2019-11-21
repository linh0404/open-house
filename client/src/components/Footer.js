import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
          <div class="footer">
            <div class="row no-gutters">
              <div class="col-sm-3">OPEN HOUSE</div>
              <div class="col-sm-1"></div>
              <div class="col-sm-8">
                About | Design | Blog | Careers | Affiliate | Privacy | Terms |
                Contact Us
                <i class="fab fa-facebook"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-pinterest"></i>
              </div>
            </div>
          </div>
        );
    }
}

export default Footer;