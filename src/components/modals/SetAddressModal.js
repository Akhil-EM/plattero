import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
class SetAddressModal extends Component {
    render() {
        return (
            <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        size="md"
		        centered
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="edit-profile">Select Delivery Address</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
			   <div style={{minHeight:'300px'}}>

               </div>
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-100 text-center justify-content-center">Deliver Here</Button>
			  </Modal.Footer>
			</Modal>
        );
    }
}

export default SetAddressModal;
