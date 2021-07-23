import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
// import { GoogleMap, LoadScript,Autocomplete} from '@react-google-maps/api';
import MapLoader from '../common/MapLoader';

class SetAddressModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
            latitude:'',
			longitude:'',
			address:{}
		}
	}
    
	setData=(_latitude,_longitude,_address)=>{
		this.setState({latitude:_latitude,longitude:_longitude,address:_address})
		
	}
    
	selectDelivery=()=>{
		this.props.setLocation(this.state.latitude,this.state.longitude,this.state.address);
		this.props.onHide();
	}
	
   
    render() {
        return (
            <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        size="lg"
		        centered
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="edit-profile">Select Delivery Address</Modal.Title>
			  </Modal.Header>
			  <Modal.Body className='p-0' >
				<div style={{height:'400px'}}>
				  <MapLoader setInfo={this.setData}/>
				</div>
			    
			  </Modal.Body>
			 
			  <Modal.Footer >
			    <Button type='button' onClick={this.selectDelivery} variant="outline-primary" className="d-flex w-100 text-center justify-content-center">Deliver Here</Button>
			  </Modal.Footer>
			</Modal>
        );
    }
}

export default SetAddressModal;
