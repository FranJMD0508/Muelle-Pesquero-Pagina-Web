import Carousel from 'react-bootstrap/Carousel';
import './carruselInfo.css';

function CarruselInfo() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' src='./assets/images/puerto-slide.jpg' alt="First slide" />
        <div className='slide-texto'>
          <h3>Muelle pesquero</h3>
          <p>La mayor calidad a tu disposición</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src='./assets/images/catalogo-slide.jpg' alt="Second slide" />
        <div className='slide-texto'>
          <h3>Nada como un buen catálogo</h3>
          <p>Échale un vistazo a nuestra selección, solo para ti...</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarruselInfo;