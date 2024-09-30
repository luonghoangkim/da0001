import React from 'react';
import { Card, Col, Carousel } from 'antd';
import { CSSProperties } from 'react';
import Image from 'next/image'
import { APP_CSS } from '@/utils/app-css';


interface SlideComponentProps {
    images: string[];
}

const SlideComponent: React.FC<SlideComponentProps> = ({ images }) => {

    return (
        <Col xs={47} sm={12} md={8}>
            <Card style={APP_CSS.cardStyle}>
                <Carousel autoplay style={APP_CSS.carouselStyle}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <div style={APP_CSS.contentStyle}>
                                <Image
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    fill

                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Card>
        </Col>
    );
};

export default SlideComponent;