import Carousel from 'react-bootstrap/Carousel';
import './carruselInfo.css';

function CarruselInfo() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' src='./assets/images/puerto-slide.jpg' alt="First slide" />
        <div className='slide-texto'>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src='./assets/images/catalogo-slide.jpg' alt="Second slide" />
        <div className='slide-texto'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarruselInfo;