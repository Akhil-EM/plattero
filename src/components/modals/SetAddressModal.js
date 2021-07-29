import React, { Component } from 'react';
import {Modal,Button} from 'react-bootstrap';
// import { GoogleMap, LoadScript,Autocomplete} from '@react-google-maps/api';
import MapLoader from '../common/MapLoader';

class SetAddressModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
            latitude:10.0260688,
			longitude:76.3124753,
			address:'Edappally'
		}
	}
    
	setData=(_latitude,_longitude,_address)=>{
		this.setState({latitude:_latitude,longitude:_longitude,address:_address});
	}
    
	selectDelivery=()=>{
		// this.props.setLocation(this.state.latitude,this.state.longitude,this.state.address);
		localStorage.setItem('latitude',this.state.latitude);
		localStorage.setItem('longitude',this.state.longitude);
		localStorage.setItem('address',this.state.address);
		this.props.onHide();
		window.location.reload();
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
			    <Modal.Title as='h5' id="edit-profile">Select Your Location</Modal.Title>
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
