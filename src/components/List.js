import React from 'react';
import {Link} from 'react-router-dom';
import {Row,Col,Container,Button,Spinner,Image} from 'react-bootstrap';
import Icofont from 'react-icofont';
import PageTitle from './common/PageTitle';
import CardItem from './common/CardItem';
import CategoriesCarousel from './common/CategoriesCarousel';
import Config from '../CONFIG'
import  {CommonApi} from '../API/Common.API';
import {HomeApi} from '../API/Home.API'
import OwlCarousel from 'react-owl-carousel3';
import ProductBox from './home/ProductBox';
import BannerCard from './home/BannerCard';
class List extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 restaurantList:[],
			 sliderBanner:[],
			 offerBanners:[],
			 loaderDisplay:'',
			 bannerDisplay:false
		}
	}

	componentWillMount(){
		this.getInitialData();
	}

	getInitialData(){
		this.setState({loaderDisplay:''});
	
		CommonApi.restaurants("",'','10.0260688','76.3124753')
		         .then((response)=>{
					 this.setState({restaurantList:response.data.data.restuarants,
					                loaderDisplay:'none'})
				 }).catch((error)=>{
					 console.log(error)
				 });
	    HomeApi.homepage(10.022407,76.304138)
		       .then((response)=>{
                   console.log(response.data.data.slider_banners);
				   this.setState({sliderBanner:response.data.data.web_sliders,
					              offerBanners:response.data.data.offer_banners,
				                  bannerDisplay:true})
			   }).catch((error)=>{
				   console.log(error)
			   })
	}
	
	render() {
		let restaurantList=this.state.restaurantList;
		console.log(this.state.sliderBanner)
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
											alt='offers' />
								  ))
							  }
							 
							 </div>
						 </Col>
						</Row>
					}
					   <br></br>
					   {restaurantList.length>0? <h3 className='app-text-main pl-3'>{restaurantList.length} Restaurants found in this location</h3>:''}
					   <br></br>
			            <Row>
						  
			               <Col >
			                  <Row>
							  
								{
								  restaurantList.map((item,key)=>(
									<Col md={4} sm={6} className="mb-4 pb-2" key={key}>
										<CardItem 
											title={item.restaurant_name}
											subTitle={item.res_description}
											imageAlt='Product'
											image={item.thumnail_img}
											imageClass='img-fluid item-img'
											linkUrl={`detail/${item.id}`}
											offerText='65% off | Use Coupon OSAHAN50'
											time={item.average_delivery_time}
											price={Config.CURRENCY+" "+item.avg_price_person+" per person"}
											showPromoted={true}
											promotedVariant='dark'
											favIcoIconColor='text-danger'
											rating={item.res_rating}
										/>
			                        </Col>
								  ))
								}
			                     <Col md={12} className="text-center load-more" style={{display:this.state.loaderDisplay}}>
			                        <Button variant="primary" type="button" disabled="">
			                        	<Spinner animation="grow" size="sm" className='mr-1' />
				                        Loading...
			                        </Button>  
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