import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,Image,Badge,Spinner} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
import BestSeller from './common/BestSeller';
import QuickBite from './common/QuickBite';
import StarRating from './common/StarRating';
import RatingBar from './common/RatingBar';
import Review from './common/Review';
import Icofont from 'react-icofont';


import { CommonApi } from '../API/Common.API';
import Config from '../CONFIG';
class Detail extends React.Component {
	constructor(props, context) {
	    super(props, context);
        this.restaurantID=this.props.match.params.id;
	    this.state = {
      	  showAddressModal: false,
		  restaurantName:'',
		  restaurantAddress:'',
		  restaurantRating:'',
		  restaurantDescription:'',
		  restaurantImage:'',
		  restaurantThumbnailImage:'',
		  deliveryTime:'',
		  avgDeliveryCharge:'',
		  serviceable:false,
		  categoryList:[],
		  foodList:[],
		  loaderDisplay:true,
		  selectedNavItem:0
	    };
	}

	componentWillMount(){
          this.getInitialData();
	}
     
	getInitialData(){
       CommonApi.restaurantDetail(this.restaurantID)
	            .then((response)=>{
					let resData=response.data.data;
					this.setState({restaurantName:resData.restaurant_name,
						           restaurantAddress:resData.address,
								   restaurantRating:resData.res_rating,
								   restaurantDescription:resData.res_description,
								   restaurantImage:resData.logo,
								   restaurantThumbnailImage:resData.thumnail_img,
								   avgDeliveryCharge:Config.CURRENCY+' '+resData.avg_price_person,
								   deliveryTime:resData.average_delivery_time,
								   serviceable:resData.is_servicable})
				}).catch((error)=>{
					console.log(error)
				})

	   CommonApi.categories(this.restaurantID)
	            .then((response)=>{
                //   console.log(response.data.data)
				  this.setState({categoryList:response.data.data})
				}).catch((error)=>{
					console.log(error)
				});
	    this.getFoodList('',0);
	}

    hideAddressModal = () => this.setState({ showAddressModal: false });
    getQty = ({id,quantity}) => {
    	//console.log(id);
    	//console.log(quantity);
	}
	getStarValue = ({value}) => {
    	console.log(value);
    	//console.log(quantity);
	}
    


	getFoodList=(_categoryId,_navItemId)=>{
		this.setState({loaderDisplay:true,
			           selectedNavItem:_navItemId})
		CommonApi.products(1,_categoryId,this.restaurantID,100,"","menu_name",'desc')
	            .then((response)=>{
				  
                  console.log(response.data.data)
				  this.setState({foodList:response.data.data.products,
					             loaderDisplay:false});
				}).catch((error)=>{
					console.log(error)
					this.setState({loaderDisplay:'none',
					               loaderDisplay:false})
				})
	}


	render() {
		console.log(this.state.categoryList)
    	return (
		<>
    	  <section className="restaurant-detailed-banner">
	         <div className="text-center">
	            <Image fluid className="cover" src={this.state.restaurantThumbnailImage} />
	         </div>
	         <div className="restaurant-detailed-header">
	            <Container>
	               <Row className="d-flex align-items-end">
	                  <Col md={8}>
	                     <div className="restaurant-detailed-header-left">
	                        <Image fluid className="mr-3 float-left" alt="osahan" src={this.state.restaurantImage} />
	                        <h2 className="text-white">{this.state.restaurantName}</h2>
	                        <p className="text-white mb-1"><Icofont icon="location-pin" />{this.state.restaurantAddress}
							{
								this.state.serviceable?
								<Badge  variant="success">OPEN</Badge>:
								<Badge  variant="danger">CLOSED</Badge>
							}
							
	                        </p>
	                        <p className="text-white mb-0"><Icofont icon="food-cart" />{this.state.restaurantDescription}
	                        </p>
	                     </div>
	                  </Col>
	                  <Col md={4}>
	                     <div className="restaurant-detailed-header-right text-right">
	                        <Button variant='success' type="button"><Icofont icon="clock-time" />{this.state.deliveryTime}
	                        </Button>
	                        <h6 className="text-white mb-0 restaurant-detailed-ratings">
	                           <span className="generator-bg rounded text-white">
	                              <Icofont icon="star" />{this.state.restaurantRating}
	                           </span>
							  
	                        </h6>
	                     </div>
	                  </Col>
	               </Row>
	            </Container>
	         </div>
	         
	      </section>

          <Tab.Container defaultActiveKey="first">
	      	<section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
		         <Container>
		            <Row>
		               <Col md={12}>
		                  
		                  <Nav  id="pills-tab">
						   <Nav.Item  onClick={()=>this.getFoodList('',0)}>
								<Nav.Link className={`${this.state.selectedNavItem===0?'nav-active-item':''}`}>All</Nav.Link>
							</Nav.Item>
							  {
								  this.state.categoryList.map((item,key)=>(
									<Nav.Item key={key} onClick={()=>this.getFoodList(item.cat_id,key+2)}>
									   <Nav.Link className={`${this.state.selectedNavItem===key+2?'nav-active-item':''}`} >{item.cat_name}</Nav.Link>
								    </Nav.Item>
								  ))
							  }
		                     
		                  </Nav>
		               </Col>
		            </Row>
		         </Container>
	      	</section>
			  <br/>
			  <br/>
		      <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
			  {
				this.state.loaderDisplay &&
                <Col md={12} className="text-center load-more" >
					<Button variant="primary" type="button" disabled="">
						<Spinner animation="grow" size="sm" className='mr-1' />
						Loading...
					</Button>  
                </Col>
			  }
			  { !this.state.loaderDisplay &&		    
		        <Container>
				 <Row>
					{
						this.state.foodList.map((item,key)=>(
							   <Col md={4} sm={6} className="mb-4 " key={key}>
									<BestSeller 
										id={1}
										title={item.name}
										// subTitle='North Indian • American • Pure veg'
										imageAlt={item.url_key}
										image={item.image}
										imageClass='img-fluid custom-image'
										price={item.price}
										priceUnit={Config.CURRENCY}
										specialPrice={item.special_price}
										isNew={false}
										showPromoted={false}
										promotedVariant='dark'
										favIcoIconColor='text-danger'
										rating='3.1 (300+)'
										getValue={this.getQty}
									/>
							    </Col>
								))
							}
						</Row>
		           
				</Container>
	           }
		      </section>

	      </Tab.Container>
	    </>
    	);
    }
}


export default Detail;