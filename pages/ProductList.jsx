import React, { useEffect, useState } from 'react';
import ProductCard, { Header } from '../components/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [finalMinPrice, setFinalMinPrice] = useState('');
    const [finalMaxPrice, setFinalMaxPrice] = useState('');
    const [material, setMaterial] = useState('');
    const [style, setStyle] = useState('');

    const categories = ['Mirrors', 'Chairs', 'Tables', 'Pillows', 'Clocks', 'Sofas', 'Bedroom', 'Living Room'];
    const materials = ['Wood', 'Metal', 'Leather', 'Fabric'];
    const styles = ['Modern', 'Traditional', 'Minimalist'];

    const fetchProducts = async (selectedCategory, min, max, selectedMaterial, selectedStyle) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/products?category=${selectedCategory}&minPrice=${min}&maxPrice=${max}&material=${selectedMaterial}&style=${selectedStyle}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    function CustomAccordionToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log(`Toggled eventKey: ${eventKey}`), 
      );
    
      return (
        <button className='btn-toggle'
          type="button"
          onClick={decoratedOnClick}
        >
          {children}
        </button>
      );
    }
    useEffect(() => {
        fetchProducts(category, finalMinPrice, finalMaxPrice, material, style);
    }, [category, finalMinPrice, finalMaxPrice, material, style]);

    const handleShowAll = () => {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        setMaterial('');
        setStyle('');
        fetchProducts('', '', '', '', '');
    };

    const handleCategoryChange = (item) => {
        setCategory(item);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleConfirm = () => {
        setFinalMinPrice(minPrice);
        setFinalMaxPrice(maxPrice);
    };

    const handleMaterialChange = (item) => {
        setMaterial(item);
    };

    const handleStyleChange = (item) => {
        setStyle(item);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }return (
   <div>
   <Header />
     <div className='all'>
     <h5>Home</h5>
      <h5 onClick={handleShowAll}> - ALL Collection - </h5>
       <h5>Furniture</h5>
       </div>
         <Row>
         <Col md={3}>
        <div className='filter-section'>
         <h2 style={{padding:'20px'}}>Filter:</h2>
         <Accordion defaultActiveKey={['0']} flush>
         <AccordionItem eventKey='0' style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
          <CustomAccordionToggle eventKey='0'>Category</CustomAccordionToggle>
          <AccordionBody className='cat'>
           {categories.map((item) => (
              <h5
              key={item}
             onClick={() => handleCategoryChange(item)}
              className={category === item ? 'active-category' : ''}
                   >
               {item}
                 </h5>
                  ))}
              </AccordionBody>
              </AccordionItem>
            <AccordionItem eventKey='1' style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
           <CustomAccordionToggle eventKey='1'>Price Range</CustomAccordionToggle>
          <AccordionBody>
            <div>
           <input className='btn-pricet' type='number' placeholder='Min Price' value={minPrice} onChange={handleMinPriceChange} />
           <input className='btn-pricet' type='number' placeholder='Max Price' value={maxPrice} onChange={handleMaxPriceChange} />
           <button className='btn-price' onClick={handleConfirm}><i className="bi bi-check-lg"></i></button>
           </div>
           </AccordionBody>
           </AccordionItem>
           <AccordionItem eventKey='2' style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
           <CustomAccordionToggle eventKey='2'>Material</CustomAccordionToggle>
           <AccordionBody className='mat'>
           {materials.map((item) => (
              <h5
                  key={item}
                  onClick={() => handleMaterialChange(item)}
                  className={material === item ? 'active-material' : ''}
                    >
                {item}
               </h5>
                ))}
           </AccordionBody>
             </AccordionItem>
             <AccordionItem eventKey='3' style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
             <CustomAccordionToggle eventKey='3'>Style</CustomAccordionToggle>
              <AccordionBody className='style1'>
                {styles.map((item) => (
                  <h5
                  key={item}
                  onClick={() => handleStyleChange(item)}
                  className={style === item ? 'active-style' : ''}
                >
                    {item}
                </h5>
                  ))}
                 </AccordionBody>
                </AccordionItem>
                </Accordion>
                </div>
                </Col>
                 <Col md={9}>
                <Row xs={1} md={2} lg={3} className="g-1">
                 {products.map(product => (
                 <ProductCard key={product.id} product={product} />
                 ))}
                  </Row>
                  </Col>
                  </Row>
                  </div>
                 );
                 }

    export default ProductList;