import React from 'react';
import {Form,InputGroup,Modal,Spinner,Button} from 'react-bootstrap';
import {ProfileApi} from '../../API/Profile.API'
import MapLoader3 from '../common/MapLoader3';
class EditAddressModal extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			 firstName:'',
			 lastName:'',
			 addressLine1:'',
			 addressLine2:'',
			 city:'',
			 pincode:'',
			 state:'',
			 country:'IN',
			 latitude:null,
			 longitude:null,
			 addressId:null,
			 firstNameError:false,
			 lastNameError:false,
			 addressLine1Error:false,
			 addressLine2Error:false,
			 cityError:false,
			 pincodeError:false,
			 stateError:false,
			 invalidPincodeError:false,
			 loadingApi:false,
			 coordinates:{}
		}
	}
	
	static getDerivedStateFromProps(props, state) {
		//invoked when props changed in parent.
        if(props.fName !== state.firstName){
            //Change in props
            return{
                firstName: props.fName,
				lastName:props.lName,
				addressLine1:props.addLine1,
				addressLine2:props.addLine2,
				city:props.city,
				pincode:props.pincode,
				state:props.state,
				addressId:props.addressId,
                coordinates:props.coordinates
            };
        }
        return null; // No change to state
    }
    
	setCoordinates=(_latitude,_longitude,_address)=>{
		this.setState({latitude:_latitude,longitude:_longitude});
	}

	submitForm=()=>{
        if(!this.validateForm()){
			this.setState({loadingApi:true});
			ProfileApi.updateAddress(this.state.firstName,this.state.lastName,
				                     this.state.addressLine1,this.state.addressLine2,
									 this.state.city,this.state.state,this.state.country,
									 this.state.pincode,
									 this.state.addressId,this.state.latitude,this.state.longitude)
					  .then(()=>{
						  this.setState({ firstName:'',
										lastName:'',
										addressLine1:'',
										addressLine2:'',
										city:'',
										pincode:'',
										state:'',
										country:'IN',
										firstNameError:false,
										lastNameError:false,
										addressLine1Error:false,
										addressLine2Error:false,
										cityError:false,
										pincodeError:false,
										stateError:false,
										invalidPincodeError:false,
									    loadingApi:false},
								()=>{
                                    this.props.renderParent();
						            this.props.onHide();
								})
                          
					  }).catch((error)=>{
						  this.setState({loadingApi:false});
						  console.log(error);
					  })
		}
	}
    
	validateForm=()=>{
		let formError=false;
		this.setState({
			firstNameError:false,
			lastNameError:false,
			addressLine1Error:false,
			addressLine2Error:false,
			cityError:false,
			pincodeError:false,
			stateError:false,
			invalidPincodeError:false});

		if(!this.state.firstName){
			formError=true;
			this.setState({firstNameError:true});
		}
		if(!this.state.lastName){
			formError=true;
			this.setState({lastNameError:true});
		}
		if(!this.state.addressLine1){
			formError=true;
			this.setState({addressLine1Error:true});
		}
		if(!this.state.addressLine2){
			formError=true;
			this.setState({addressLine2Error:true});
		}
		if(!this.state.city){
			formError=true;
			this.setState({cityError:true});
		}
		if(!this.state.pincode){
			formError=true;
			this.setState({pincodeError:true});
		}

		if((this.state.pincode).length !=6){
			formError=true;
			this.setState({pincodeError:true,
				           invalidPincodeError:true});
		}
        if(!this.state.state){
			formError=true;
			this.setState({stateError:true});
		}
	    return formError;
	}
   



	onInputItemChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
	
	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="add-address">Add Delivery Address</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
			  <div style={{height:'200px',position:'relative'}}>
			      <MapLoader3 coordinates={this.props.coordinates} setInfo={this.setCoordinates}  usedTo={'editAddress'}/>
			  </div>
  			<Form >
             <div className="form-row pt-3">
			    <Form.Group className="col-md-6">
                   <Form.Label>First Name</Form.Label>
                   <Form.Control type="text" 
				                 placeholder="Enter first name" 
								 value={this.state.firstName}
								 onChange={this.onInputItemChange}
								 name='firstName'
								 className={this.state.firstNameError?'is-invalid':''}/>
                </Form.Group>
                <Form.Group className="col-md-6">
                   <Form.Label>Last Name</Form.Label>
                   <Form.Control type="text" 
				                 placeholder="Enter Last Name"
								 value={this.state.lastName}
								 onChange={this.onInputItemChange}
								 name='lastName'
								 className={this.state.lastNameError?'is-invalid':''}/>
                </Form.Group>
                <Form.Group className="col-md-6">
                   <Form.Label>Address Line 1</Form.Label>
                   <Form.Control type="text" 
				                 placeholder="Enter address line 1"
								 value={this.state.addressLine1}
								 onChange={this.onInputItemChange}
								 name='addressLine1'
								 className={this.state.addressLine1Error?'is-invalid':''}/>
                </Form.Group>
				<Form.Group className="col-md-6">
                   <Form.Label>Address Line 2</Form.Label>
                   <Form.Control type="text"
				                 placeholder="Enter address line 2"
								 value={this.state.addressLine2}
								 onChange={this.onInputItemChange}
								 name='addressLine2'
								 className={this.state.addressLine2Error?'is-invalid':''}/>
                </Form.Group>
				<Form.Group className="col-md-6">
                   <Form.Label>City</Form.Label>
                   <Form.Control type="text"
				                 placeholder="Enter city"
								 value={this.state.city}
								 onChange={this.onInputItemChange}
								 name='city'
								 className={this.state.cityError?'is-invalid':''}/>
                </Form.Group>
				<Form.Group className="col-md-6">
                   <Form.Label>Pincode</Form.Label>
                   <Form.Control type="number" 
				                 placeholder="Enter pincode"
								 value={this.state.pincode}
								 onChange={this.onInputItemChange}
								 name='pincode'
								 className={`${this.state.pincodeError?'is-invalid':''} ${this.state.invalidPincodeError?'is-invalid':''}`}/>
				  { this.state.invalidPincodeError &&
					<p className='text-danger m-0' style={{lineHeight:'20px'}}>Invalid pincode</p>}
                </Form.Group>
				<Form.Group className="col-md-6">
                   <Form.Label>State</Form.Label>
                   <Form.Control type="text"
				                 placeholder="Enter state"
								 value={this.state.state}
								 onChange={this.onInputItemChange}
								 name='state'
								 className={this.state.stateError?'is-invalid':''}/>
                </Form.Group>
				<Form.Group className="col-md-6">
                   <Form.Label>Country</Form.Label>
                   <select className="form-control"
				            value={this.state.country}
							onChange={this.onInputItemChange}
							name='country'>
					 <option defaultValue>IN</option>
				   </select>
                </Form.Group>

                
             </div>
          </Form>      
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			    <Button type='button' 
				        variant="primary" 
				        className='d-flex w-50 text-center justify-content-center'
						onClick={this.submitForm}>
						{!this.state.loadingApi ?'SUBMIT':
						<>
						<Spinner animation="grow" size="sm" className='mr-1' />
                         Updating...
						</>}
				</Button>
 
			  </Modal.Footer>
			</Modal>
    	);
    }
}
export default EditAddressModal;