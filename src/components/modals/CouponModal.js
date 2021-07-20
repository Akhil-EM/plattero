import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import { CheckoutApi } from '../../API/Checkout.API';
class CouponModal extends React.Component {
    constructor(props) {
		super(props)
	
		this.state = {
			 couponList:[]
		}
	}
	componentDidMount(){
		CheckoutApi.couponList()
		           .then((response)=>{
					   this.setState({couponList:response.data.data.coupons});
				   }).catch((error)=>{
					   console.log(error)
				   })
	}
	
	render() {
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="md"
		   	  >

			  <Modal.Body>
				{
				  this.state.couponList.map((item,key)=>(
					<div className='coupon-container' key={key} onClick={()=>this.props.selectCoupon(item.coupon)}>
						<h3 className='text-primary'>{item.coupon}</h3>
						<p>{item.description}</p>
				    </div>
				  ))
				}
  				 
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex text-center justify-content-center">CANCEL</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}
export default CouponModal;