import React, { Component } from 'react';
import {Row,Col,Card} from 'react-bootstrap';
import Icofont from 'react-icofont';
import { CommonApi } from '../API/Common.API';

class HelpAndSupport extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 name:'',
			 email:'',
			 phone:'',
			 message:'',
			 subject:'',
			 nameError:false,
			 emailError:false,
			 phoneError:false,
			 messageError:false,
			 subjectError:false,

		}
	}

	submitForm=(e)=>{
		e.preventDefault();
        
		if(!this.validateFrom()){
			CommonApi.contactUs(this.state.name,this.state.email,
				                this.state.phone,this.state.subject,
								this.state.message)
		}
	}

	onChange=(e)=>{
		this.setState({[e.target.name]:e.target.value});
	}
	
	validateFrom=()=>{
		let formHasError=false;
		this.setState({
			nameError:false,
			emailError:false,
			phoneError:false,
			messageError:false,
			subjectError:false})

		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!this.state.name){
			formHasError=true;
			this.setState({nameError:true});
		}

		if(!this.state.email || !emailRegex.test(String(this.state.email).toLowerCase())){
          formHasError=true;
		  this.setState({emailError:true});
		}
		if((this.state.phone).length !== 10){
			formHasError=true;
            this.setState({phoneError:true});
		}

		if(!this.state.message){
			formHasError=true;
			this.setState({messageError:true});
		}
        
		if(!this.state.subject){
			formHasError=true;
			this.setState({subjectError:true});
		}

		return formHasError;
	}


	render() {
		return (
			<section className="section p-4 ">
			  <Row>
				  <Col md={6} className='mb-4'>
					  <h2 className='text-ash-underlined'>Get In touch</h2>
					  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
					  <form onSubmit={this.submitForm}>
						<div className="row">
							<div className="col">
							name
							<input type="text" 
								   placeholder="name"
								   name='name'
								   onChange={this.onChange}
								   className={`form-control ${this.state.nameError?'is-invalid':''}`}/>
								{this.state.nameError && <span className='text-danger'>name required.</span>}
							</div>
							<div className="col">
							email
							<input type="text"
								   placeholder="email"
								   name='email'
								   onChange={this.onChange}
								   className={`form-control ${this.state.emailError?'is-invalid':''}`}/>
								   {this.state.emailError&& <span className='text-danger'>invalid email.</span>}
							</div>
							
						</div>
						<div className="row mt-3">
							<div className="col">
							phone
							<input type="number" 
								   placeholder="phone"
								   name='phone'
								   onChange={this.onChange}
								   className={`form-control ${this.state.phoneError?'is-invalid':''}`}/>
							{this.state.phoneError&& <span className='text-danger'>invalid phone.</span>}
							</div>
							<div className="col">
							subject
							<input type="text"
							       min="0"
								   placeholder="subject"
								   name='subject'
								   onChange={this.onChange}
								   className={`form-control ${this.state.subjectError?'is-invalid':''}`}/>
							{this.state.subjectError&& <span className='text-danger'>subject required.</span>}
							</div>
							
						</div>
						<div  className="mt-3">
						  message
                          <textarea className="form-control" 
						            rows="3"
									name='message'
									onChange={this.onChange}
									className={`form-control ${this.state.messageError?'is-invalid':''}`}></textarea>
						</div>
						{this.state.messageError&& <span className='text-danger'>message required.</span>}
						<div className='mt-4'></div>
						<button type='submit' className='btn btn-primary'>Send Message</button>
					  </form>
				  </Col>
				  <Col md={6}>
				    <h2 className='text-ash-underlined'>Address</h2>
                    <Card className='p-4'>
					   <Icofont icon='map'
							          size='5'/>
					    <p>Intertoons Internet Services Pvt.Ltd.</p>
						<p>Sanjo Square, 1st Floor, Ashariparambu Road, Edapally,</p>
						<p>Kochi ,Kerala , India 682024</p>
						<br/>
						<p>Phone: +917907806606</p>
						<p>Email: support@intertoons.com</p>
					</Card>
				  </Col>
			  </Row>
			</section>
		);
	}
}

export default HelpAndSupport;

