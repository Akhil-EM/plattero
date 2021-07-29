import React, { Component } from 'react';
import {CommonApi} from '../API/Common.API';
import {Row,Col,Container,Button,Nav,Image,Spinner} from 'react-bootstrap';
import BestSeller from './common/BestSeller';
import Config from '../CONFIG';
import {AiOutlineClose} from 'react-icons/ai';
import {withRouter} from 'react-router-dom';
import {HeaderApi} from '../API/Header.API';
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
             searchTerm2:this.props.location.state.searchTerm,
             categoryId:this.props.match.params.id
        }
        this.cartIdList=[];
       
    }

    componentDidMount(){
        this.getCartData();
        this.getInitialData();
    }
    
    getCartData=()=>{
        HeaderApi.getCartData()
          .then((response)=>{
              let resArray=response.data.data.cartitems;
              if(resArray.length <=0){
                  if(this.state.searchTerm==='')return this.getFoodList(0,0,'');
                  else return  this.getFoodList(0,0,this.state.searchTerm);
              }
              //get cart  product id and quantity
              resArray.forEach(item=>{
                  this.cartIdList.push({id:parseInt(item.id),qty:parseInt(item.qty)});
                  if(this.cartIdList.length===resArray.length){
                    if(this.state.searchTerm==='')return  this.getFoodList(0,0,'');
                    else return  this.getFoodList(0,0,this.state.searchTerm);
                  }
              });
          }).catch((error)=>{
            if(this.state.searchTerm===''){return  this.getFoodList(0,0,'');}
            else {  
                this.getFoodList(0,0,this.state.searchTerm);
                return this.setState({loaderDisplay:false}); 
            }
          });
    }
    

    getInitialData(){
        this.setState({loaderDisplay:true})
            // console.log(this.state.searchTerm==='')
            if(this.state.searchTerm===''){
                this.getFoodList(0,0,"");
                CommonApi.categories(0)
                 .then((response)=>{
                     this.setState({categoryList:response.data.data,
                                    loaderDisplay:false})
                 }).catch((error)=>{
                     console.log(error)
                     this.setState({loaderDisplay:false})
                 });

            }
            else this.getFoodList(0,0,this.state.searchTerm);

       
    }

    getFoodList=(_categoryId,_navItemId,_searchString)=>{
		this.setState({loaderTwoDisplay:true,
			           selectedNavItem:_navItemId})
		CommonApi.products(1,_categoryId,"",100,_searchString,"",'desc')
	            .then((response)=>{

				  this.setState({foodList:response.data.data.products,
                                 loaderDisplay:false,
                                 loaderTwoDisplay:false});
				}).catch((error)=>{
					console.log(error)
					this.setState({loaderDisplay:false,
                                   loaderTwoDisplay:false})
				})
	}

    getQty = ({id,quantity}) => {;
	}

    closeSearch=()=>{
       this.setState({searchTerm:''});
       this.getFoodList(0,0,"")
    this.props.history.push({pathname:`/menu/0`,
    search: `?search_input=`,
    state:{from:'search',searchTerm:''}
});
}
    
componentDidUpdate(prevProps){

        if (this.props.location.state.searchTerm !== prevProps.location.state.searchTerm) {
            this.setState({searchTerm:this.props.location.state.searchTerm});
            this.getFoodList(0,0,this.props.location.state.searchTerm);
        }
}

checkProductInCart(_productId){
    let count=0;
    for(let i=0;i<this.cartIdList.length;i++){
        if(this.cartIdList[i].id===_productId) count=this.cartIdList[i].qty;
    }
    return count;

}
    
    render(){
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
                 
		       
                    {this.state.searchTerm===''?
                        <Container>
                        <Row>
                        <Col md={12}>
                            
                            <Nav  id="pills-tab">
                                <Nav.Item  onClick={()=>this.getFoodList(0,0,"")}>
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
                    </div>}
                
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
										id={item.id}
										title={item.name}
										imageAlt={item.url_key}
										image={item.image==null?'':item.image}
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
										isServiceable={item.is_servicable}
										renderParent={this.getCartData}
										qty={this.checkProductInCart(item.id)}
										variants={item.variations}/>
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



export default withRouter(Menu);
