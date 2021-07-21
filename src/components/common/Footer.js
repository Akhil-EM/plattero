import React from 'react';
import PropTypes from 'prop-types'; 
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,FormControl,Button,Image} from 'react-bootstrap';
import FontAwesome from './FontAwesome';

class Footer extends React.Component {

	render() {
    	return (
    		<>
		      <section className={this.props.sectionclassName}>
		         <div className="container">
		            <Row>
		               <Col xs={12}>
		                  <p className={this.props.popularFHclassName}>MORE </p>
		                  <div className="search-links">
		                     <Link to="/about">About us</Link> |  
		                     <Link to="/terms-and-conditions">Terms & Conditions</Link> | 
		                     <Link to="/privacy-policy">Privacy & Policy</Link> |  
		                     <Link to="/help-and-support">Help & Support</Link>  |  
		                  </div>
		               </Col>
		            </Row>
		         </div>
		      </section>
		      <footer className="pt-4 pb-4 text-center">
		         <Container>
		            <p className="mt-0 mb-0">{this.props.copyrightText}</p>
		         </Container>
		      </footer>
		    </>
    	);
    }
}


Footer.propTypes = {
  sectionclassName: PropTypes.string,
  popularCHclassName:PropTypes.string,
  popularCountries: PropTypes.array,
  popularFHclassName:PropTypes.string,
  popularFood: PropTypes.array,
  copyrightText: PropTypes.string,
  madewithIconclassName: PropTypes.string,
  firstLinkText: PropTypes.string,
  firstLink: PropTypes.string,
  secondLinkText: PropTypes.string,
  secondLink: PropTypes.string,
};

Footer.defaultProps = {
    sectionclassName: 'footer-bottom-search pt-5 pb-5 bg-white',
	popularCHclassName:'text-black',
	popularCountries: [],
	popularFHclassName:'mt-4 text-black',
	popularFood: [],
	copyrightText: '© 2020 All Rights Reserved by Plattero',
	madewithIconclassName: '',
	firstLinkText: '',
	firstLink: "",
	secondLinkText: '',
	secondLink: '//askbootstrap.com/',
}



export default Footer;