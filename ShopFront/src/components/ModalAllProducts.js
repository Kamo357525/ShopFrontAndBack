import React from 'react';
import {Carousel} from "react-bootstrap";
import NoImg from '../assets/img/no-image-available-vector-hand-260nw-745639717.webp';


function ModalAllProducts({prod}) {
    return (<div className='prodInfoCarousel'>
            <Carousel>
                {prod.Images.length ?
                    prod.Images.map((item, i) => (
                        <Carousel.Item key={i} interval={1000}>
                            <img
                                className="allProdImg"
                                src={item.src}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    )) : <Carousel.Item interval={1000}>
                        <img
                            className="allProdImg"
                            src={NoImg}
                            alt="First slide"
                        />
                    </Carousel.Item>
                }
            </Carousel>
            <div>
                <h1>Name {prod.name}</h1>
                <h1>Price {prod.price}$</h1>
                <h1 style={{backgroundColor: prod.color}}>Color {prod.color}</h1>
            </div>
        </div>
    )
}


export default ModalAllProducts