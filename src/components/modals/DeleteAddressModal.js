import React from 'react';
import {Modal,Button} from 'react-bootstrap';

class DeleteAddressModal extends React.Component {
	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="sm"
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="delete-address">Delete Address</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
  				<p className="mb-0 text-black">Are you sure? Once deleted, you will not be able to recover this data!</p>   
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			    <Button type='button' onClick={this.props.deleteAddress} variant="primary" className='d-flex w-50 text-center justify-content-center'>DELETE</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}
export default DeleteAddressModal;