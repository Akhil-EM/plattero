import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Image} from 'react-bootstrap';
import {AuthenticationApi} from '../API/Authentication'
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

class Register extends React.Component {
	
    constructor(props) {
		super(props)
	
		this.state = {
			 firstName:'',
			 lastName:'',
			 email:'',
			 phone:'',
			 password:'',
			 confirmPassword:'',
			 firstNameError:false,
			 lastNameError:false,
			 emailError:false,
			 phoneError:false,
			 passwordError:false,
			 confirmPasswordError:false,
		}
	}

	onInputItemChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
	
	formSubmit=(event)=>{
		event.preventDefault();
		if(this.validateForm()){
			var fName=this.state.firstName;
			var lName=this.state.lastName;
			var email=this.state.email;
			var phone=this.state.phone;
			var password=this.state.password;
			AuthenticationApi.registerUser(fName,lName,phone,email,password)
			               .then((response)=>{
							   console.log(response);
							   this.props.addToast(response.message, { appearance: 'success' });
							   this.props.history.push('/login');
							   window.location.reload();
						   }).catch((error)=>{
							   console.log(error)
							   this.props.addToast(error.response.data.message, { appearance: 'error' });
						   })
		}
	}



	validateForm(){

		let validationStatus=true;
		this.setState({
			firstNameError:false,
			lastNameError:false,
			emailError:false,
			phoneError:false,
			passwordError:false,
			confirmPasswordError:false});

		if(!this.state.firstName){
			validationStatus=false;
           this.setState({firstNameError:true})
		}
		if(!this.state.lastName){
			validationStatus=false;
			this.setState({lastNameError:true})
		}
		if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(this.state.email)){
			validationStatus=false;
           this.setState({emailError:true})
		}

		if(this.state.phone.length !==10){
			validationStatus=false;
			this.setState({phoneError:true})
		}

		if(!this.state.password){
			validationStatus=false;
			this.setState({passwordError:true})
		}

		if(this.state.password !== this.state.confirmPassword || !this.state.confirmPassword){
			validationStatus=false;
			this.setState({confirmPasswordError:true});
		}

		return validationStatus;
	}
	render() {
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex">
				  <Image src="/img/cup-cake.jpg" alt='login-image' className='img-fluid w-100 p-0' />
				</Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Start With An Account.</h3>
	                           <Form onSubmit={this.formSubmit}>
							      <div className="form-label-group">
	                                 <Form.Control type="text" 
									               id="inputFirstName"
												   placeholder="First Name"
												   name="firstName"
												   value={this.state.firstName}
												   onChange={this.onInputItemChange}
												   className={`${this.state.firstNameError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
									 {this.state.firstNameError && 
									  <p className='text-danger'>first name required</p>}
	                              </div>
								  <div className="form-label-group">
	                                 <Form.Control type="text"
									               id="inputLastName"
												   placeholder="Last Name"
												   name="lastName"
												   value={this.state.lastName}
												   onChange={this.onInputItemChange}
												   className={`${this.state.lastNameError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
									 {this.state.lastNameError && 
									  <p className='text-danger'>last name required</p>}
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="text"
									               id="inputEmail"
												   placeholder="Email address" 
												   name="email"
												   value={this.state.email}
												   onChange={this.onInputItemChange}
												   className={`${this.state.emailError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputEmail">Email address</Form.Label>
									 {this.state.emailError && 
									  <p className='text-danger'>invalid email id</p>}
	                              </div>
								  <div className="form-label-group">
	                                 <Form.Control type="number"
									               id="inputPhone"
												   placeholder="phone" 
												   name="phone"
												   value={this.state.phone}
												   onChange={this.onInputItemChange}
												   className={`${this.state.phoneError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputPhone">Phone number</Form.Label>
									 {this.state.phoneError && 
									   <p className='text-danger'>invalid phone number</p>}
	                               </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password"
									               id="inputPassword"
												   placeholder="Password"
												   name="password"
												   value={this.state.password}
												   onChange={this.onInputItemChange}
												   className={`${this.state.passwordError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
									 {this.state.passwordError && 
									   <p className='text-danger'>password required</p>}
	                              </div>
								  <div className="form-label-group">
	                                 <Form.Control type="password"
									               id="inputConfirmPassword" 
												   placeholder="Confirm Password"
												   name="confirmPassword"
												   value={this.state.confirmPassword}
												   onChange={this.onInputItemChange}
												   className={`${this.state.confirmPasswordError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputConfirmPassword">Confirm Password</Form.Label>
									 {this.state.confirmPasswordError && 
									   <p className='text-danger'>passwords must match</p>}
	                              </div>
								   <Button type="submit" variant="outline-danger"
										   className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">
									 Sign Up
								   </Button>
	                              {/* <Link to="/login" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign Up</Link> */}
	                              <div className="text-center pt-3">
	                                 Already have an account? <Link className="font-weight-bold" to="/login">Sign In</Link>
	                              </div>
	                           </Form >
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
    }
}


export default withRouter(withToast(Register));