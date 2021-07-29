import React from 'react';
import {Form,Modal,Button,Alert,Spinner} from 'react-bootstrap';
import {ProfileApi} from '../../API/Profile.API';

class ChangePasswordModal extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			oldPassword:'',
			newPassword:'',
			confirmPassword:'',
			oldPasswordError:false,
			newPasswordError:false,
			confirmPasswordError:false,
			passwordChangeError:'',
			passwordMissMatchError:false,
		    apiLoading:false,
		    oldPasswordApiError:false,
		    newPasswordApiError:false,
		    passwordMatching:false}
	}

    
	onInputItemChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

	updateDetails=()=>{

		if(!this.validateForm()){
			this.setState({apiLoading:true,oldPasswordApiError:false,newPasswordApiError:false})
			ProfileApi.updatePassword(this.state.oldPassword,
				                    this.state.newPassword)
					  .then(()=>{
                         this.setState({
						                oldPassword:'',
									    newPassword:'',
									    confirmPassword:'',
										apiLoading:false,},()=>{

							this.props.onHide();
							this.props.showToast();
						 });
						 
					  }).catch((error)=>{
						  this.setState({apiLoading:false})
						  if(error.response.data.errors.current_password !=null){
							  this.setState({oldPasswordApiError:true});
						  }
						  if(error.response.data.errors.new_password !=null){
							this.setState({newPasswordApiError:true});
						  }
					  })
		}

	}
    
	validateForm(){
		let hasError=false;
		this.setState({
			oldPasswordError:false,
			newPasswordError:false,
			confirmPasswordError:false,
		    passwordMissMatchError:false,
			passwordMatching:false});

		if(!this.state.oldPassword){
			hasError=true;
            this.setState({oldPasswordError:true});		
		}
		if(!this.state.newPassword){
			hasError=true;
            this.setState({newPasswordError:true});		
		}
		if(!this.state.confirmPassword){
			hasError=true;
            this.setState({confirmPasswordError:true});		
		}
		if(this.state.newPassword !== this.state.confirmPassword){
			hasError=true;
           this.setState({passwordMissMatchError:true})
		}
		if(this.state.newPassword===this.state.oldPassword){
			hasError=true;
			this.setState({passwordMatching:true})
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
			    <Modal.Title as='h5' id="edit-profile">Change Password</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
					{this.state.oldPasswordApiError &&
						<Alert  variant='warning' className='text-center'>
						Old password is not correct
						</Alert> }

					{this.state.newPasswordApiError &&
					 <Alert  variant='warning' className='text-center'>
					  New password must be at least 6 characters
					 </Alert>} 
					 {  this.state.passwordMatching &&
						<Alert  variant='warning' className='text-center'>
						   There is no change in password
						</Alert>
					 }
				
			    <Form>
               <div className="form-row">
			      <Form.Group className="col-md-12 mb-0">
                     <Form.Label>Current Password</Form.Label>
                     <Form.Control type="password" 
					               value={this.state.oldPassword}  
								   placeholder="Enter current password"
								   name="oldPassword"
								   className={this.state.oldPasswordError?'is-invalid':''}
								   onChange={this.onInputItemChange}
								   />
                  </Form.Group>
				  <Form.Group className="col-md-12 mb-0">
                     <Form.Label>New Password</Form.Label>
                     <Form.Control type="password"
					               value={this.state.newPassword} 
								   placeholder="Enter New Password"
								   name='newPassword'
								   className={this.state.newPasswordError?'is-invalid':''}
								   onChange={this.onInputItemChange}/>
                  </Form.Group>
                  <Form.Group className="col-md-12">
                     <Form.Label>Confirm Password</Form.Label>
                     <Form.Control type="password"
					               value={this.state.confirmPassword} 
								   placeholder="Enter Confirm Password"
								   name='confirmPassword'
								   className={`${this.state.confirmPasswordError?'is-invalid':''}  ${this.state.passwordMissMatchError?'is-invalid':''}`}
								   onChange={this.onInputItemChange}/>
					{this.state.passwordMissMatchError &&
					 <p className='text-danger'>passwords must match</p>}
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
				        onClick={this.updateDetails}>CHANGE</Button>}
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
export default ChangePasswordModal;