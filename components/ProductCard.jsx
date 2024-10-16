import Container from 'react-bootstrap/Container';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import './ProductCard.css';
import Col from 'react-bootstrap/Col';
export const Header= () =>{
  return(

<div className='head'>
<h6>EXPLORE OUR</h6>

<h1 > Luxurious Haven Collection </h1>
</div>
);
};

function ProductCard({ product }) {
  return (
        <Col>

      <Container className='my-1 mx-0'>
    <Card >      

{/*<Card.Img style={{backgroundColor:'black',width:'300px',height:'300px'}} variant="top" src={product.image}/>*/}
<div className='image' 
style={{ position: 'relative' }}>
            <Card.Img
              style={{ backgroundColor: 'black', width: '300px', height: '300px' }}
              variant="top"
              src={product.image}
            />
            <i className="bi bi-heart icon-heart"></i>
            <i className="bi bi-bag icon-bag"></i>
          </div>
          

      <Card.Body>
        <Card.Title> {product.category}</Card.Title>
        <Card.Text>
         <span className='product-name'>{product.name}</span> 
          <h6 className='product-price'>{product.price}</h6>
        </Card.Text>
      </Card.Body>
    </Card>
    </Container>
    </Col>

  );
}

export default ProductCard;
