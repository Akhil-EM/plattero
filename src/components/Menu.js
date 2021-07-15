import React, { Component } from 'react';
import {CommonApi} from '../API/Common.API';
import {Row,Col,Container,Form,InputGroup,Button,Tab,Nav,Image,Badge,Spinner} from 'react-bootstrap';
import BestSeller from './common/BestSeller';
import Config from '../CONFIG';
import {AiOutlineClose} from 'react-icons/ai'
class Menu extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categoryList:[],
             foodList:[],
             selectedNavItem:0,
             loaderDisplay:true,
             loaderTwoDisplay:true,
             searchTerm:this.props.location.state.searchTerm,
             categoryId:this.props.match.params.id
        }

    }

    componentWillMount(){
        this.getInitialData();
        
    }

    getInitialData(){
        this.setState({loaderDisplay:true})
        CommonApi.categories(0)
                 .then((response)=>{
                     this.setState({categoryList:response.data.data,
                                    loaderDisplay:false})
                 }).catch((error)=>{
                     console.log(error)
                     this.setState({loaderDisplay:false})
                 });
        
        if(this.state.searchTerm==='')this.getFoodList(0,0,"")
        else this.getFoodList(0,0,this.state.searchTerm)
    }

    getFoodList=(_categoryId,_navItemId,_searchString)=>{
		this.setState({loaderTwoDisplay:true,
			           selectedNavItem:_navItemId})
        // (_currentPage,_categoryId,_restaurantId,_pagesize,_searchString,
        //                 _field,_direction)
		CommonApi.products(1,_categoryId,"",100,_searchString,"",'desc')
	            .then((response)=>{
				  
                  console.log(response.data.data)
				  this.setState({foodList:response.data.data.products,
                                 loaderTwoDisplay:false});
				}).catch((error)=>{
					console.log(error)
					this.setState({loaderDisplay:'none',
                                   loaderTwoDisplay:false})
				})
	}

    getQty = ({id,quantity}) => {
    	//console.log(id);
    	//console.log(quantity);
	}

    closeSearch=()=>{
       this.setState({searchTerm:''});
       this.getFoodList(0,0,"")
    }

    
    render() {
        console.log(this.state.searchTerm)
        return (
            <div>
               <br/>
               {
				this.state.loaderDisplay &&
                <Col md={12} className="text-center load-more" >
					<Button variant="primary" type="button" disabled="">
						<Spinner animation="grow" size="sm" className='mr-1' />
						Loading...
					</Button>  
                </Col>
			  }
              {
                  this.state.loaderDisplay &&
                  <div style={{height:'600px'}}/>
              }
               {!this.state.loaderDisplay  &&
                <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
                 
		        { this.state.searchTerm===''?
                    <Container>
                        <Row>
                        <Col md={12}>
                            
                            <Nav  id="pills-tab">
                            <Nav.Item  onClick={()=>this.getFoodList('',0,"")}>
                                    <Nav.Link className={`${this.state.selectedNavItem===0?'nav-active-item':''}`}>All</Nav.Link>
                                </Nav.Item>
                                {
                                    this.state.categoryList.map((item,key)=>(
                                        <Nav.Item key={key} onClick={()=>this.getFoodList(0,key+2,item.cat_name)}>
                                        <Nav.Link className={`${this.state.selectedNavItem===key+2?'nav-active-item':''}`} >{item.cat_name}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                }
                                
                            </Nav>
                        </Col>
                        </Row>
                    </Container>:
                    <div className='p-3 d-flex'>
                        <h5>Showing results for {this.state.searchTerm}</h5>
                        <button className='btn mb-3 ml-3 p-0' onClick={this.closeSearch}>
                             <AiOutlineClose fontSize='1.5em' className='m-0 p-0' />
                        </button>
                    </div>
                }
	      	</section>}
            <br/>
            {
				this.state.loaderTwoDisplay &&
                <Col md={12} className="text-center load-more" >
					<Button variant="primary" type="button" disabled="">
						<Spinner animation="grow" size="sm" className='mr-1' />
						Loading...
					</Button>  
                </Col>
			  }
           {!this.state.loaderTwoDisplay &&
            <Container>
        
                 {this.state.foodList.length<=0?
                    <Container>
		            <Row>
		               <Col md={12} className="text-center pt-5 pb-5">
		                  <Image className="img-fluid" src="/img/404.png" alt="404" />
		                  <h1 className="mt-2 mb-2">No food items found.!</h1>
		                  <p>Please try again with another category.</p>
		                  
		               </Col>
		            </Row>
		         </Container>
                 :''}
				 <Row>
					{
						this.state.foodList.map((item,key)=>(
							   <Col  md={4} sm={6} className="mb-4 " key={key}>
									<BestSeller 
										id={1}
										title={item.name}
										// subTitle='North Indian • American • Pure veg'
										imageAlt={item.url_key}
										image={item.image===null?'':item.image}
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
		           
				</Container>}
                {
                  this.state.loaderTwoDisplay &&
                  <div style={{height:'600px'}}/>
              }
	           
        </div>
        );
    }
}



export default Menu;
