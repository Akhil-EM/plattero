import React from 'react';
import PropTypes from 'prop-types'; 
import {Link } from 'react-router-dom';
import {Image,Media} from 'react-bootstrap';
import Icofont from 'react-icofont';
import OrderDetail from '../offcanvas/OrderDetail';
import {ProfileApi} from '../../API/Profile.API';
class OrderCard extends React.Component {
    constructor(props) {
		super(props)
	
		this.state ={
			showDetail:false,
			orderId:'',
			restaurantDetail:{},
			deliveryAddress:'',
			items:[],
	        orderHistory:[],
			total:'',
			discount:'',
			orderPlacedDate:''

		}
	}
	handleClose = () =>this.setState({showDetail:false});
    handleShow = (_id)=>{
		this.setState({showDetail:true});
        ProfileApi.orderDetail(_id)
		          .then((response)=>{
					  this.setState({
						orderId:response.data.data.order.order_number,
						restaurantDetail:response.data.data.order.restuarant,
						deliveryAddress:response.data.data.order.address,
						items:response.data.data.order.items,
						orderHistory:response.data.data.order.order_history,
						total:response.data.data.order.total,
						discount:response.data.data.order.discount,
						orderPlacedDate:response.data.data.order.placed
					  })
				  }).catch((error)=>{
					  console.log(error);
				  })

		this.setState({showDetail:true});
    }
	
	render() {
    	return (
	      <div className="bg-white card mb-4 order-list shadow-sm">
			  <OrderDetail DetailsShow={this.state.showDetail} 
			               onHide={this.handleClose}
						   orderId={this.state.orderId}
						   restaurantDetail={this.state.restaurantDetail}
						   deliveryAddress={this.state.deliveryAddress}
						   items={this.state.items}
						   orderPlacedDate={this.state.orderPlacedDate}
						   orderHistory={this.state.orderHistory}
						   total={this.state.total}
						   discount={this.state.discount}/>
	          <div className="gold-members p-4">
	                <Media>
	                   <Image className="mr-4" src={this.props.image} alt={this.props.imageAlt} />
	                   <Media.Body>
	                   		{this.props.deliveredStatus?
	                   			(
			                      <span className="float-right text-dark"><b>Delivery Status :</b> 
								    <span className=''>{this.props.deliveredStatus}</span>  
			                      	{this.props.deliveredStatus==='Delivered'?
									 <Icofont icon="check-circled" className="text-success ml-1" />:''}
			                      </span>
			                    )
			                    :""
	                   		}
	                      <h6 className="mb-2">
	                      	<Link to={this.props.detailLink}  className="text-black">{this.props.orderTitle} </Link>
	                      </h6>
	                      <p className="text-gray mb-1">
	                      	<Icofont icon="location-arrow" /> {this.props.address} 
	                      </p>
	                      <p className="text-gray mb-3">
	                      	<Icofont icon="list" /> ORDER #{this.props.orderNumber} 
	                      	<Icofont icon="clock-time" className="ml-2" /> {this.props.orderDate} 
	                      </p>
						  <p className="text-dark">
							{
								this.props.itemList.map((item,key)=>(
									<span key={key}>{item.item_name +" X "+item.qty+","}</span>
								))
							}
						  </p>
	                      
	                      <hr />
	                      <div className="">
		                      <Link className="btn btn-sm btn-outline-primary mr-1 mt-1" to={this.props.helpLink}><Icofont icon="headphone-alt" /> HELP</Link>
		                      <button className="btn btn-sm btn-primary mt-1" to='' onClick={()=>this.handleShow(this.props.id)}><Icofont icon="info-circle" className='pr-1'/> ORDER DETAILS</button>
	                      </div>
	                      <p className="mb-0 text-black text-primary pt-2 float-right">
	                      	<span className="text-black font-weight-bold"> Total Paid:</span> {this.props.orderTotal}
	                      </p>
	                   </Media.Body>
	                </Media>
	          </div>
			  
	       </div>
    	);
    }
}

OrderCard.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  orderNumber: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  deliveredStatus: PropTypes.string,
  orderTitle: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orderProducts: PropTypes.string.isRequired,
  helpLink: PropTypes.string.isRequired,
  detailLink: PropTypes.string.isRequired,
  orderTotal: PropTypes.string.isRequired,
  itemList:PropTypes.array.isRequired
};
export default OrderCard;