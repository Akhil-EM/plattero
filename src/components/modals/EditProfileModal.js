import React from 'react';
import {Form,Modal,Button,Alert,Spinner} from 'react-bootstrap';
import {ProfileApi} from '../../API/Profile.API';

class EditProfileModal extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			firstName:"",
            lastName:'',
			email:'',
			phone:'',
		    firstNameError:false,
		    lastNameError:false,
			emailError:false,
			phoneError:false,
		    warningDisplay:false,
		    apiLoading:false}
	}

	componentDidMount(){
		 this.loadInitialData();
	}

	loadInitialData=()=>{
		ProfileApi.customerDetail()
				  .then((response)=>{
					   this.fname=response.data.data.customer.first_name;
					   this.lname=response.data.data.customer.last_name;
					   this.email=response.data.data.customer.email;
					   this.phone=response.data.data.customer.phone;

					   this.setState({firstName:response.data.data.customer.first_name,
									  lastName:response.data.data.customer.last_name,
									  email:response.data.data.customer.email,
									  phone:response.data.data.customer.phone})
				  }).catch((error)=>{
					   console.log(error);
				  })
	}
    
	onInputItemChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

	updateDetails=()=>{
	   this.setState({warningDisplay:false});
       if(this.fname===this.state.firstName &&
		  this.lname===this.state.lastName &&
		  this.email===this.state.email &&
		  this.phone===this.state.phone){
			return this.setState({warningDisplay:true});
		}

		if(!this.validateForm()){
			this.setState({apiLoading:true})
			ProfileApi.editCustomer(this.state.firstName,
				                    this.state.lastName,
								    this.state.phone,
									this.state.email)
					  .then(()=>{
                         this.setState({apiLoading:false},()=>{
							this.loadInitialData();
							this.props.renderParent();
							this.props.onHide();
						 });
						 
					  }).catch((error)=>{
						  this.setState({apiLoading:false})
						  console.log(error)
					  })
		}

	}
    
	validateForm(){
		let hasError=false;
		this.setState({
			firstNameError:false,
			lastNameError:false,
			emailError:false,
			phoneError:false});

		if(!this.state.firstName){
			hasError=true;
            this.setState({firstNameError:true});		
		}
		if(!this.state.lastName){
			hasError=true;
            this.setState({lastNameError:true});		
		}
		if((this.state.phone).length !==10){
			hasError=true;
            this.setState({phoneError:true});		
		}
		if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(this.state.email)){
			hasError=true;
           this.setState({emailError:true})
		}
		return hasError;
	}
	

	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        size="sm"
		        centered>
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="edit-profile">Edit profile</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
				{ this.state.warningDisplay &&
					<Alert  variant='warning' className='text-center'>
						no changes found..!
					</Alert> }
				
			    <Form>
               <div className="form-row">
			      <Form.Group className="col-md-12 mb-0">
                     <Form.Label>First Name</Form.Label>
                     <Form.Control type="text" 
					               value={this.state.firstName}  
								   placeholder="Enter First Name"
								   name="firstName"
								   className={this.state.firstNameError?'is-invalid':''}
								   onChange={this.onInputItemChange}
								   />
                  </Form.Group>
				  <Form.Group className="col-md-12 mb-0">
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control type="text"
					               value={this.state.lastName} 
								   placeholder="Enter Last Name"
								   name='lastName'
								   className={this.state.lastNameError?'is-invalid':''}
								   onChange={this.onInputItemChange}/>
                  </Form.Group>
                  <Form.Group className="col-md-12">
                     <Form.Label>Phone number</Form.Label>
                     <Form.Control type="text"
					               value={this.state.phone} 
								   placeholder="Enter Phone number"
								   name='phone'
								   className={this.state.phoneError?'is-invalid':''}
								   onChange={this.onInputItemChange}/>
                  </Form.Group>
                  <Form.Group className="col-md-12">
                     <Form.Label>Email id</Form.Label>
                     <Form.Control type="text"
					               value={this.state.email} 
								   placeholder="Enter Email id"
								   name='email'
								   className={this.state.emailError?'is-invalid':''}
								   onChange={this.onInputItemChange}/>
                  </Form.Group>
                  
               </div>
              </Form>
			  </Modal.Body>
			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			   {!this.state.apiLoading &&
			    <Button type='button' 
				        variant="primary" 
						className='d-flex w-50 text-center justify-content-center'
				        onClick={this.updateDetails}>UPDATE</Button>}
                {this.state.apiLoading &&	            
				 <Button variant="primary" type="button" disabled="">
                    <Spinner animation="grow" size="sm" className='mr-1' />
                    Updating...
                  </Button>  }
			  </Modal.Footer>
		  </Modal>
    	);
    }
}
export default EditProfileModal;