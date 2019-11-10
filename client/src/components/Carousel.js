import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';

class PRCarousel extends Component {
    
    render() {
        return (
            <Carousel>
                <div>
                    <img src="/images/main.jpg" />
                </div>
                <div>
                    <img src="/images/image2.jpg" />
                </div>
                <div>
                    <img src="/images/image3.jpg" />
                </div>
                <div>
                    <img src="/images/image4.jpg" />
                </div>
                <div>
                    <img src="/images/image5.jpg" />
                </div>
                <div>
                    <img src="/images/image6.jpg" />
                </div>
                <div>
                    <img src="/images/image8.jpg" />
                </div>
            </Carousel>
        );
    };
}

export default PRCarousel;