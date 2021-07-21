import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Image} from 'react-bootstrap';

class Thanks extends React.Component {

	render() {
    	return (
    		<section className="section pt-5 pb-5 osahan-not-found-page">
		         <Container>
		            <Row>
		               <Col md={12} className="text-center pt-5 pb-5">
		                  <Image className="img-fluid" src="/img/thanks.png" alt="404" />
		                  <h1 className="mt-2 mb-2">Congratulations...!</h1>
		                  <p className="mb-5">Your Order #{this.props.location.state.orderId} has been placed successfully.</p>
						  <Link className="btn btn-primary btn-lg mr-4" to="">KEEP SHOPPING</Link>
						  <Link className="btn btn-primary btn-lg" to="/myaccount/orders">MY ORDERS</Link>
		               </Col>
		            </Row>
		         </Container>
		    </section>
    	);
    }
}


export default Thanks;