import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Spinner,Image} from 'react-bootstrap';
import ChooseAddressCard from './common/ChooseAddressCard';
import AddAddressModal from './modals/AddAddressModal';
import Icofont from 'react-icofont';
import {CheckoutApi} from "../API/Checkout.API.js";
import {ProfileApi} from '../API/Profile.API'
import QuickBite from './common/QuickBite';
import Config from '../CONFIG';
import CouponModal from './modals/CouponModal';
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

class Checkout extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.state = {
      	  showAddressModal: false,
			cartItems:[],
			customerAddressList:[],
			restaurantName:'',
			restaurantAddress:'',
			restaurantCity:'',
			restaurantImage:'',
			discount:0,
			grandTotal:0,
			subTotal:0,
			deliveryAddressId:null,
			paymentMethods:[],
			serviceableStatus:false,
			showCouponModal:false,
			selectedCoupon:'',
			couponApplied:false
	    };
	}
    
	componentDidMount() {
	    this.getInitialData();      
	}

	getInitialData=()=>{
        CheckoutApi.getCartData()
		           .then((response)=>{
					   this.setState({restaurantName:response.data.data.cart.restaurant.name,
						              restaurantAddress:response.data.data.cart.restaurant.address,
									  restaurantCity:response.data.data.cart.restaurant.city,
									  restaurantImage:response.data.data.cart.restaurant.logo,
									  discount:response.data.data.cart.discount,
									  subTotal:response.data.data.cart.subtotal,
                                      grandTotal:response.data.data.cart.grandtotal,
					                  cartItems:response.data.data.cartitems})
				   })
				   .catch((error)=>{
					   console.log(error)
				   });

		ProfileApi.getAddressList()
		          .then((response)=>{
					  this.setState({customerAddressList:response.data.data.customeraddress})
				  }).catch((error)=>{
					  console.log(error)
				  })
		
		
	}
	
	
    hideAddressModal = () => this.setState({ showAddressModal: false });
	hideCouponModal = () => this.setState({showCouponModal: false });
    setDeliveryAddress=(_deliveryAddressID)=>this.setState({deliveryAddressId:_deliveryAddressID},()=>{
		CheckoutApi.checkoutCart(this.state.deliveryAddressId)
		           .then((response)=>{
					   console.log(response.data.data.payment_methods);
					   this.setState({paymentMethods:response.data.data.payment_methods,serviceableStatus:true});
					   this.props.addToast("This address selected for delivery.", { appearance: 'info' });
				   }).catch((error)=>{
					   console.log(error.response.data)
					   this.props.addToast(error.response.data.message, { appearance: 'warning' });
				   })
		
	});

	selectCoupon=(_coupon)=>{
        this.setState({selectedCoupon:_coupon,showCouponModal:false})
	}

	applyCoupon=()=>{
		CheckoutApi.applyCoupon(this.state.selectedCoupon)
		           .then((response)=>{
					   console.log(response)
					   this.setState({couponApplied:true});
					 this.props.addToast(response.data.message, { appearance: 'success' });
					 this.getInitialData();
				   }).catch((error)=>{
					   console.log(error)
					//    console.log(error.response.data);
					//    this.props.addToast(error.response.data.message, { appearance: 'warning' });
				   })
	}

	removeCoupon=()=>{
		CheckoutApi.removeCoupon(this.state.selectedCoupon)
		           .then((response)=>{
					   this.setState({couponApplied:false});
					 this.props.addToast(response.data.message, { appearance: 'success' });
					 this.getInitialData();
				   }).catch((error)=>{
					   console.log(error.response.data);
					   this.props.addToast(error.response.data.message, { appearance: 'warning' });
				   })
	}

	render() {
    	return (
    		<section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
			 <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal}
			                 renderParent={this.getInitialData}/>
			 <CouponModal show={this.state.showCouponModal} 
			              onHide={this.hideCouponModal}
						  selectCoupon={this.selectCoupon}/>
	         <Container>
	            <Row>
				<Col md={4}>
	               	<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
					 <div>
                     <div className="d-flex mb-4 osahan-cart-item-profile">
                        <Image fluid className="mr-3 rounded-pill max-width-and-height" alt="osahan" src={this.state.restaurantImage} />
                        <div className="d-flex flex-column">
                           <h4 className="mb-1 text-white">{this.state.restaurantName}
                           </h4>
                           <h6 className="mb-0 text-white"><Icofont icon="location-pin" />{this.state.restaurantAddress+" "+this.state.restaurantCity}</h6>
                        </div>
                     </div>
                     <div className="mb-2 bg-white rounded p-2 clearfix">
                        <p className="mb-1">Sub Total <span className="float-right text-dark">{Config.CURRENCY+" "+this.state.subTotal}</span></p>
                        <p className="mb-1 text-success">Total Discount 
                           <span className="float-right text-success">{Config.CURRENCY+" "+this.state.discount}</span>
                        </p>
                        <hr />
                        <h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">{Config.CURRENCY+" "+this.state.grandTotal}</span></h6>
						</div>
                     </div>
                 	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY {Config.CURRENCY+" "+this.state.grandTotal}
                 	<Icofont icon="long-arrow-right" /></Link>
	   				</div>
				      {/* <div className="pt-2"></div> */}
	                  {/* <div className="alert alert-success" role="alert">
	                     You have saved <strong>$1,884</strong> on the bill
	                  </div> */}
	   				  <div className="pt-2"></div>
	   				  <div className="text-center pt-2">
	   				  	<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
	   				  </div>
					  <div className="pt-2"></div>
	   				  <div className="text-center pt-2">
	   				  	<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
	   				  </div>
	               </Col>
				   <Col md={8}>
				   <Row>
			        <h5 className="mb-4 mt-3 col-md-12">{this.state.cartItems.length} ITEMS FOUND IN CART</h5>
			        <Col md={12}>
			            {
							this.state.cartItems.map((item,key)=>(
								<div className="bg-white rounded border shadow-sm mb-1" key={key}>
									<QuickBite 
										id={item.item_id}
										itemClass="menu-list"
										image={item.menu_img}
										title={item.name}
										price={item.price}
										specialPrice={item.special_price}
										priceUnit={Config.CURRENCY}
										qty={item.qty}
										renderParent={this.getInitialData}/>
								</div>
							))
						}
			        </Col>
			        </Row>
					{  this.state.cartItems.length >0 &&
						<div className="bg-white rounded shadow-sm p-4 mb-4 mt-4">
	                        <h4 className="mb-1">Choose a delivery address</h4>
							{this.state.customerAddressList.length <=0 &&
								<Col md={12} className="text-center load-more mt-4 mb-4" >
									<Button variant="primary" type="button" disabled="">
										<Spinner animation="grow" size="sm" className='mr-1' />
										Loading...
									</Button>  
									<div style={{height:'250px'}}></div>
								</Col>}
	                        {  this.state.customerAddressList.length >0&&
							  <React.Fragment>
								{ this.state.customerAddressList.length>1 &&
								  <h6 className="mb-3 text-black-50">Multiple addresses in this location</h6>}
								<Row>
								 {
									this.state.customerAddressList.map((item,key)=>(
										<Col md={6} key={key}>
											<ChooseAddressCard 
											    
											    delId={item.id}
												boxclassName="border border-success"
												title={item.first_name+" "+item.last_name}
												icoIcon= 'location-pin'
												iconclassName= 'icofont-3x'
												address={item.add_line1+","+item.add_line2+","+item.add_city+","
												         +item.add_state+","+item.add_country+" "+item.pincode}
												onDeliverHereClick={this.setDeliveryAddress}
											/>
									   </Col>
									))
								 }
								
								<Col md={6}>
									<ChooseAddressCard 
										title= 'Or add a new delivery address'
										icoIcon= 'location-pin'
										iconclassName= ''
										type=""
										address= ''
										onAddNewClick={() => this.setState({ showAddressModal: true })}
									/>
								</Col>
								</Row>
								
								</React.Fragment>}
	                     </div>}
						  
						   
						   {  this.state.cartItems.length >0&&
							   <div className="bg-white rounded shadow-sm p-4 mb-4 mt-4">
							  
							  <Row>
							  <Col md={6} >
								<div className=''>
								   <h5 className="mb-3">Payment information's</h5>
									<div className="form-check form-check-inline">
										<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
										<label className="form-check-label" htmlFor="inlineRadio1">Cash on delivery</label>
									</div>
									<div className="mb-2 bg-white rounded p-2 clearfix">
										<InputGroup className="input-group-sm mb-2">
											<Form.Control type="text" placeholder="Enter promo code" value={this.state.selectedCoupon} readOnly/>
											<InputGroup.Append>
											<Button variant="primary" type="button" id="button-addon2"
											        onClick={this.applyCoupon}><Icofont icon="sale-discount" />APPLY</Button>
											</InputGroup.Append>
										</InputGroup>
									</div>
									<div className='d-flex'>
									   <Button className='w-50 mr-2' variant="primary" type="button" id="button-addon2" onClick={()=>this.setState({showCouponModal:true})}><Icofont icon="ticket" />coupons</Button>
									   <Button className='w-50' variant="primary" type="button" id="button-addon2" onClick={this.removeCoupon}>Remove coupon</Button>
									</div>
									
								</div>
							 </Col>
							 <Col md={6}>
							   <h5 className="mb-3">Cart Total</h5>
							   <h6>Sub Total {Config.CURRENCY+" "+this.state.subTotal}</h6>
							   <h6>Order Total {Config.CURRENCY+" "+this.state.grandTotal}</h6>
							   <br/>
							   <Button variant="warning" type="button" id="button-addon2">PLACE ORDER</Button>
							 </Col>
							</Row>
						   </div>}
						 
				   </Col>
	              
	            </Row>
	         </Container>
	      </section>
    	);
    }
}


export default withToast(Checkout);