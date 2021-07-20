import React from 'react';
import {Modal,Button} from 'react-bootstrap';

class ChangeCartDataModel extends React.Component {

	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="sm"
		   	  >

			  <Modal.Body>
  				<p className="mb-0 text-black">{this.props.message}</p>   
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			    <Button type='button' onClick={this.props.clearCart} variant="primary" className='d-flex w-50 text-center justify-content-center'>YES</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}
export default ChangeCartDataModel;