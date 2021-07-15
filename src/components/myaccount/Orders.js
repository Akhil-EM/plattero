import React from 'react';
import OrderCard from '../common/OrderCard';
import {ProfileApi} from '../../API/Profile.API';
import {Col,Button,Spinner} from 'react-bootstrap';
import Config from '../../CONFIG';

class Orders extends React.Component {
    constructor(props) {
		super(props)
	
		this.state = {
			 orderList:[],
			 orderListLoading:true
			 
		}
	}

	componentDidMount=()=>{
		this.getInitialData();
        
	}

	getInitialData(){
		this.setState({orderListLoading:true})
        ProfileApi.orderList()
		          .then((response)=>{
					 this.setState({orderList:response.data.data.orders,
						            orderListLoading:false});
				  }).catch((error)=>{
					 console.log(error);
					 this.setState({orderListLoading:false})
				  })
	}
	
	render() {
		let orderList=this.state.orderList;
		// console.log(orderList)
    	return (
    		<React.Fragment>  
                
    		    <div className='p-4 bg-white shadow-sm'>

	              <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
				 {  
				    this.state.orderListLoading &&
					<div>
					<Col md={12} className="text-center load-more" >
							<Button variant="primary" type="button" disabled="">
								<Spinner animation="grow" size="sm" className='mr-1' />
								Loading...
							</Button>  
					</Col>
					<div style={{height:'200px'}}/>
					</div>
				  }
				  {   !this.state.orderListLoading &&
					  orderList.length <=0?
					  <p>No orders found for you...!</p>:''
				  }
				  {
					!this.state.orderListLoading &&
					 orderList.map((item,key)=>(
						<OrderCard
						    key={key}
							itemList={item.items}
							image={item.items[0].menu_image}
							imageAlt=''
							id={item.id}
							orderNumber={item.order_number}
							orderDate={item.placed}
							deliveredStatus={item.status_text}
							orderTitle={item.restuarant.name}
							address={item.restuarant.address+","+item.restuarant.city}
							orderProducts='Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1'
							orderTotal={Config.CURRENCY+" "+item.total} 
							helpLink='#'
							detailLink='/detail'/>
					 ))
						
	            }
			    </div>
		    </React.Fragment>
    	);
    }
}
export default Orders;