import React from 'react';
import {Row,Col,Container,Button,Spinner,Image} from 'react-bootstrap';
import CardItem from './common/CardItem';
import Config from '../CONFIG'
import  {CommonApi} from '../API/Common.API';
import {HomeApi} from '../API/Home.API';
import { ProfileApi } from '../API/Profile.API';
import OwlCarousel from 'react-owl-carousel3';
import BannerCard from './home/BannerCard';

let favoriteRestaurantIdList=[];
class List extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 restaurantList:[],
			 sliderBanner:[],
			 offerBanners:[],
			 favoriteList:[],
			 loaderDisplay:'',
			 bannerDisplay:false
		}
	}

	componentDidMount(){
		this.getInitialData();
		
	}

	getInitialData=()=>{
		this.setState({loaderDisplay:''});
	    ProfileApi.wishList()
				  .then((response)=>{ 
					  let resArray=response.data.data.items;
					  if(resArray.length <=0){
							if(localStorage.getItem("latitude") === null){
								this.getRestaurants('','');
							}else{
								this.getRestaurants(localStorage.getItem("latitude"),localStorage.getItem("longitude"));
							} 
					  }
					  resArray.forEach(items=>{
						  favoriteRestaurantIdList.push(parseInt(items.res_id));
						  if(favoriteRestaurantIdList.length===resArray.length){
								if(localStorage.getItem("latitude") === null){
									this.getRestaurants('','');
								}else{
									this.getRestaurants(localStorage.getItem("latitude"),localStorage.getItem("longitude"));
								} 
						   }
					  })
					  ;
				  }).catch((error)=>{

						if(localStorage.getItem("latitude") === null){
							this.getRestaurants('','');
						}else{
							this.getRestaurants(localStorage.getItem("latitude"),localStorage.getItem("longitude"));
						} 
					console.log(error);
					this.setState({loaderDisplay:false});
				  })
	    HomeApi.homepage(10.022407,76.304138)
		       .then((response)=>{
				   this.setState({sliderBanner:response.data.data.web_sliders,
					              offerBanners:response.data.data.offer_banners,
				                  bannerDisplay:true})
			   }).catch((error)=>{
				   console.log(error)
			   })
	}
	
	getRestaurants=(_latitude,_longitude)=>{
		this.setState({loaderDisplay:''})
		//CommonApi.restaurants("",'','10.0260688','76.3124753')
		CommonApi.restaurants("",'',_latitude,_longitude)
				.then((response)=>{
				this.setState({restaurantList:response.data.data.restuarants,
								loaderDisplay:'none'})
			}).catch((error)=>{
				console.log(error);
				this.setState({loaderDisplay:'none'})
			});
	}


	checkIsFavorite(_rest_id){
		const found = favoriteRestaurantIdList.find(element => element ===_rest_id);
        if(found===undefined) return false;
		return true;
	}
	render() {
		let restaurantList=this.state.restaurantList;
    	return (
    		<>  
	    		<section className="section pt-2 pb-5 products-listing">
			        <Container>
					
					{this.state.bannerDisplay &&
                         <Row >
						 <Col md={9}>
								 <div className="osahan-slider pl-4 pt-3">
								 <OwlCarousel nav loop {...options2} className="homepage-ad owl-theme">
									 {
										 this.state.sliderBanner.map((item,key)=>(
											 <div className="item" key={key}>
											 <BannerCard 
												 image={item.banner_img}
												 imageClass='img-fluid rounded'
												 imageAlt='"restaurant"'
												 linkUrl='listing'/>
										 </div>
										 ))
									 }
								 </OwlCarousel>
							 </div>
						 </Col>
						 <Col md={3}>
							 <div className='pt-3'>
							  {
								  this.state.offerBanners.map((item,key)=>(
									 <Image key={key} 
									        src={item.banner_img} 
											className="img-fluid w-100"
											alt='offers'/>
								  ))
							  }
							 
							 </div>
						 </Col>
						</Row>
					}
					  
			            <Row>
						  
			               <Col >
			                  <Row>
							    { (restaurantList.length===0 && this.state.loaderDisplay ==='none')&&
									<div className='text-center  w-100 mt-5' style={{height:'250px'}}>
                                        <h4 className='text-ash'>No Restaurant's found for this location...!</h4>
									</div>
								}
								
								{
								  restaurantList.map((item,key)=>(
									<Col md={3} sm={4} className="mb-4 pb-2" key={key}>
										<CardItem 
										    id={item.id}
											title={item.restaurant_name}
											subTitle={item.res_description}
											imageAlt='Product'
											image={item.thumnail_img}
											imageClass='img-fluid item-img'
											linkUrl={`detail/${item.id}`}
											isServiceable={item.is_servicable}
											offerText='65% off | Use Coupon OSAHAN50'
											time={item.average_delivery_time}
											price={Config.CURRENCY+" "+item.avg_price_person+" per person"}
											showPromoted={true}
											promotedVariant='dark'
											favIcoIconColor={this.checkIsFavorite(item.id)?'text-danger':'text-secondary'}
											rating={item.res_rating}
											renderParent={this.getInitialData}
											fromList={true}/>
			                        </Col>
								  ))
								}
			                     <Col md={12} className="text-center load-more" style={{display:this.state.loaderDisplay}}>
			                        <Button variant="primary" type="button" disabled="">
			                        	<Spinner animation="grow" size="sm" className='mr-1' />
				                        Loading...
			                        </Button>  
									<div style={{height:'250px'}}/>
			                     </Col>
			                  </Row>
			               </Col>
			            </Row>
			         </Container>
			    </section>
	    	</>
    	);
    }
}

const options2={
	  items:1,
      lazyLoad: true,
      loop: true,
      autoplay: true,
      autoplaySpeed: 1000,
      dots: true,
      autoplayTimeout: 2000,
      nav:false,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
      autoplayHoverPause: true,
}
export default List;