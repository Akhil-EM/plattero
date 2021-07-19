import React from 'react';
import {Row,Col,Button,Spinner} from 'react-bootstrap';
import CardItem from '../common/CardItem';
import {ProfileApi} from '../../API/Profile.API';
import Config from '../../CONFIG';
class Favourites extends React.Component {
    constructor(props) {
		super(props)
	
		this.state = {
			favoriteList:[],
			loaderDisplay:true,
		}
	}

	componentDidMount(){
		this.getInitialData();
	}

	getInitialData=()=>{
		this.setState({loaderDisplay:true,favoriteList:[],});
		ProfileApi.wishList()
		          .then((response)=>{
					  this.setState({favoriteList:response.data.data.items,
						             loaderDisplay:false})
				  }).catch((error)=>{
					  console.log(error)
					  this.setState({loaderDisplay:false})
				  })
	}
	
	render() {
    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	                 <Col md={12}>
	                    <h4 className="font-weight-bold mt-0 mb-3">Favourites</h4>
	                 </Col>
                     {
					  this.state.loaderDisplay &&
					  <>
						<Col md={12} className="text-center load-more" >
							<Button variant="primary" type="button" disabled="">
								<Spinner animation="grow" size="sm" className='mr-1' />
								Loading...
							</Button>  
						</Col>
						<div style={{height:'300px'}}/>
					  </>
					  }
						{

						    !this.state.loaderDisplay &&(this.state.favoriteList).length <=0 ?
								<Col md={4} sm={6} className="mb-4 pb-2">
									<p>No Favorite items found</p>
								</Col>:''
	                    }
						{
						   
							
							
							this.state.favoriteList.map((item,key)=>(
								<Col md={4} sm={6} className="mb-4 pb-2" key={key}>
									<CardItem 
									    id={item.id}
										title={item.restaurant_name}
										subTitle={item.res_description}
										imageAlt='Product'
										image={item.thumnail_img}
										imageClass='img-fluid item-img'
										linkUrl={`detail/${item.id}`}
										offerText='65% off Coupon OSAHAN50'
										offerColor='danger'
										time={item.average_delivery_time}
										price={Config.CURRENCY+" "+item.avg_price_person}
										showPromoted={true}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating={item.res_rating}
										renderParent={this.getInitialData}
									/>
								</Col>
							))
						}
						
					
	              </Row>
			    </div>
		    </>
    	);
    }
}
export default Favourites;