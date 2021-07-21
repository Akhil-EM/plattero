import React from 'react';
import {Link, Route} from 'react-router-dom';
import {Row,Col,Container,Image,Card} from 'react-bootstrap';
import Icofont from 'react-icofont';
class About extends React.Component {

	render() {
    	return (
    		<section className="section pt-5 pb-5 ">
		         <Container>
		            <Row>
		               <Col md={9} className="">
		                  <h3>Who we are</h3>
						  <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		               </Col>
					   <Col md={3}>
					      <Image className="img-fluid" src="/img/cup-cake.jpg" alt="404" />
					   </Col>
		            </Row>
					<Row>
						<Col md={12}>
						  <h4>Culture at Plattero</h4>
						  <p>We strive to create an open,<br/>
                           engaging and employee-friendly workplace.</p>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
						   <h3>The Spirit</h3>
						   <p>A comfortable working atmosphere that follows a flat and open culture along with a great office space was why we were voted as one of India's top firms to work in 2017 by LinkedIn! We know you work best when you are happy.</p>
						</Col>
						<Col md={6}>
						  <h3>Our Values</h3>
						  <p>When your goal is to change the way the country eats, you need all the help you can get. Swiggy is an equal-opportunity employer offering competitive salaries, comprehensive health benefits and equity opportunities.</p>
						</Col>
					</Row>
					<h2 className='p-2'>What You'll Get</h2>
					<Row >
					  <Col md={4}>
					     <Card className='p-3'>
						     <Icofont icon='fast-delivery'
							          size='8'/>
							 <h6>Fast Delivery</h6>
							 <p>There are many variations of passages of Lorem Ipsum available in some form</p>
						 </Card>
					  </Col>
					  <Col md={4}>
					    <Card className='p-3'>
						     <Icofont icon='dining-table'
							          size='8'/>
							 <h6>Online Reservation</h6>
							 <p>There are many variations of passages of Lorem Ipsum available in some form</p>
						 </Card>
					  </Col>
					  <Col md={4}>
					    <Card className='p-3'>
						     <Icofont icon='map-pins'
							          size='8'/>
							 <h6>Live Order Tracking</h6>
							 <p>There are many variations of passages of Lorem Ipsum available in some form</p>
						 </Card>
					  
					  </Col>
					</Row>
		         </Container>
		    </section>
    	);
    }
}


export default About;