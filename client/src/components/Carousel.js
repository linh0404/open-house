import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class PRCarousel extends Component {
    
    render() {
        return (
            <Carousel>
                <div>
                    <img src="../../public/images/main.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="../../public/images/image2.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="../../public/images/image3.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="../../public/images/image4.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="../../public/images/image5.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="../../public/images/floorplan1.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    };
}

export default PRCarousel;