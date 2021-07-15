import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Row,Col,Container,Form,Button,Spinner,Image} from 'react-bootstrap';
import {AuthenticationApi} from '../API/Authentication'
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}
class Login extends React.Component {
    constructor(props) {
		super(props)
	
		this.state = {
			 userName:'',
			 password:'',
			 userNameError:false,
			 passwordError:false,
			 LoginLoaderDisplay:false
		}
	}

	onInputChange=(e)=>{
		this.setState({[e.target.name]:e.target.value});
	}

	onFormSubmit=(event)=>{
		event.preventDefault();
		if(this.validateForm()){
			this.setState({LoginLoaderDisplay:true});
			AuthenticationApi.loginUser(this.state.userName,this.state.password)
			                 .then((response)=>{
								console.log(response);

								this.props.addToast(response.data.message, { appearance: 'success' });
								localStorage.setItem('api_token',response.data.data.api_token)
								this.setState({LoginLoaderDisplay:false});
								this.props.history.push('/');
								window.location.reload();
							 }).catch((error)=>{
								//  console.log(error.response.data.message)
								this.props.addToast(error.response.data.message, { appearance: 'error' });
								this.setState({LoginLoaderDisplay:false});

							 })
		}
	}

	validateForm(){
		let formErrorStatus=true;
		this.setState({
			userNameError:false,
	        passwordError:false});

		if(!this.state.userName){
			formErrorStatus=false;
			this.setState({userNameError:true})
		}

		if(!this.state.password){
			formErrorStatus=false;
			this.setState({passwordError:true})
		}

		return formErrorStatus;
	}
	
	render() {
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
	            <Col md={4} lg={6} className="d-none d-md-flex bg-success p-0">
					
				  <Image src="/img/cup-cake.jpg" alt='login-image' className='img-fluid w-100' />
				</Col>
	            <Col md={8} lg={6}>
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Welcome back!</h3>
	                           <Form onSubmit={this.onFormSubmit}>
	                              <div className="form-label-group">
	                                 <Form.Control type="text" 
									               id="inputEmail" 
												   placeholder="Email address"
												   value={this.state.userName}
												   onChange={this.onInputChange}
												   name="userName"
												   className={`${this.state.userNameError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputEmail">Email address / Mobile</Form.Label>
									 {this.state.userNameError && 
									  <p className='text-danger'>email or phone number required</p>}
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control type="password"
									               id="inputPassword"
												   placeholder="Password"
												   name="password"
												   value={this.state.password}
												   onChange={this.onInputChange}
												   className={`${this.state.passwordError?'input-error':''}`}/>
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
									 {this.state.passwordError && 
									  <p className='text-danger'>password required</p>}
	                              </div>
								  <br/>
								  <br/>
								  <br/>
	                              
	                              {/* <Link to="/" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign in</Link> */}
								  <Button type="submit" variant="outline-danger"
										   className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">
									 {
										 this.state.LoginLoaderDisplay?
										 <span>
									       <Spinner animation="grow" size="sm" className='mr-1' />
						                   please wait...
									     </span>:'Sign In'
									 }
									 
									 
									 
								   </Button>
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
	                           </Form>
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


export default withRouter(withToast(Login));