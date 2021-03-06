import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Navbar,Nav,Container,NavDropdown,Image, Spinner} from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import Icofont from 'react-icofont';
import Config from '../../CONFIG';
import {MdLocationOn,MdSearch} from 'react-icons/md';
import SetAddressModal from '../modals/SetAddressModal';
import {withRouter} from 'react-router-dom';
import { HeaderApi } from '../../API/Header.API';
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      isNavExpanded: false,
		  showDeliveryAddressSelector:false,
		  searchFor:'',
		  loadingData:true,
		  cart:{},
		  cartItems:[]

	    };
	}


	getInitialData=()=>{
		this.setState({loadingData:true});
		HeaderApi.getCartData()
		         .then((response)=>{
					 this.setState({cart:response.data.data.cart,
						            cartItems:response.data.data.cartitems,
						            loadingData:false});
				 }).catch((error)=>{
					 this.setState({loadingData:false});
				 })
	}

    searchChanged=(event)=>{
		this.setState({searchFor:event.target.value});
	}
	

    setIsNavExpanded = (isNavExpanded) => {
      this.setState({ isNavExpanded: isNavExpanded });
    }
    closeMenu = () => {
      this.setState({ isNavExpanded: false });
    }

    handleClick = (e) => {
      if (this.node.contains(e.target)) {
      } else {
        // If clicked outside menu, close the navbar.
        this.setState({ isNavExpanded: false });
      }
    }
  
	componentDidMount() {
		this.getInitialData();
	    document.addEventListener('click', this.handleClick, false);   
		if(localStorage.getItem("latitude") === null){
			this.setState({showDeliveryAddressSelector:true})
		}
	}

	componentWillUnmount() {
	    document.removeEventListener('click', this.handleClick, false);
	}
	hideAddressSelector= () => this.setState({showDeliveryAddressSelector: false });
	showAddressSelector= () => this.setState({showDeliveryAddressSelector:true});

	navigate=(_path)=>{
		this.props.history.push({pathname:`/${_path}/0`,
				search: `?search_input=${this.state.searchFor}`,
				state:{from:'search',searchTerm:this.state.searchFor}
			});
	}



	logoutUser=()=>{
		localStorage.clear();
		this.props.history.push('/')
		window.location.reload();
	}
	navigateToCart=()=>{
        if((this.state.cartItems).length <=0){
			this.props.addToast("No items found in your cart..!", { appearance: 'warning' }); 
		}else{
			this.props.history.push('/checkout')
		}
		
	}
	render() {
    	return (
    		<div ref={node => this.node = node}>
				
			<SetAddressModal show={this.state.showDeliveryAddressSelector} onHide={this.hideAddressSelector}/>
			<Navbar onToggle={this.setIsNavExpanded}
               expanded={this.state.isNavExpanded} color="light" expand='lg' className="navbar-light osahan-nav shadow-sm">
			   <Container>
			      <Navbar.Brand as={NavLink} to="/">
					  <Image src="/img/logo.png" alt='' />
				  </Navbar.Brand>
			      <Navbar.Toggle/>
			      <Navbar.Collapse id="navbarNavDropdown">
					  
			         <Nav className="ml-auto" onSelect={this.closeMenu}>
						 {/* Nav.link preventing space bar entering. */}
						<div className='nav-link'> 
							<div className='header-search'>
								<input type='text' 
									placeholder="Find your favorite food now..."
									value={this.state.searchFor}
									onChange={this.searchChanged}
									onKeyPress={(e) => e.key === 'Enter' && this.navigate('menu')}/>
								<MdSearch fontSize='2em' width='10%' style={{cursor:'pointer'}}
									onClick={()=>this.navigate('menu')}/>
							</div>
						</div>
						<Nav.Link className='app-text-main' onClick={this.showAddressSelector}>
							<MdLocationOn fontSize='1.5em'/>
							{
								localStorage.getItem('address')===null?'Choose location':
								localStorage.getItem('address').slice(0,25)+'...'
							}
							<span className="sr-only">(current)</span>
						</Nav.Link>
						<Nav.Link eventKey={1} as={NavLink} activeclassname="active" exact to="/">
						   Restaurants
			            </Nav.Link>
						{
							Config.API_TOKEN===''?
							<Nav.Link eventKey={2} as={NavLink} activeclassname="active" to="/register">
             				  Signup
			                </Nav.Link>:''

						}
						{
							Config.API_TOKEN===''?
							<Nav.Link eventKey={3} as={NavLink} activeclassname="active" to="/login">
             				  Login
			                </Nav.Link>
							:<NavDropdown 
			            	 title={
			            		<DropDownTitle 
			            			className='d-inline-block' 
			            			image="img/user-icon.png"
			            			imageAlt='user'
			            			imageClass="nav-osahan-pic rounded-pill"
			            			title='My Account'
			            		/>
			            	  }
			                >
							<NavDropdown.Item eventKey={4.1} as={NavLink} activeclassname="active" to="/myaccount/favourites"><Icofont icon='heart'/> Favorites</NavDropdown.Item>
							<NavDropdown.Item eventKey={4.2} as={NavLink} activeclassname="active" to="/myaccount/addresses"><Icofont icon='location-pin'/>Addresses</NavDropdown.Item>
							<NavDropdown.Item eventKey={4.3} as={NavLink} activeclassname="active" to="/myaccount/orders"><Icofont icon='list'/>My Orders</NavDropdown.Item>
							<NavDropdown.Item activeclassname="active" onClick={this.logoutUser}><Icofont icon='logout'/>Logout</NavDropdown.Item>
			              </NavDropdown>

						}
			            {
							Config.API_TOKEN &&			
			            <NavDropdown activeclassname="active"  className="dropdown-cart" 
			            	title={
			            		<DropDownTitle 
			            			className='d-inline-block' 
			            			faIcon='shopping-basket'
			            			iconClass='mr-1'
			            			title='Cart'
			            			badgeClass='ml-1'
			            			badgeVariant='success'
			            			badgeValue={this.state.cartItems.length}
			            		/>
			            	}>
                         
			                <div className="dropdown-cart-top shadow-sm">
							  { this.state.loadingData &&
								<div className='text-center mt-5'>
									<Spinner animation="grow" size="xl" />
								</div>
							  }
			               	  {
								!this.state.loadingData &&
			               	  	<CartDropdownHeader 
			               	  		className="dropdown-cart-top-header p-4" 
			               	  		title={this.state.cart.restaurant.name}
			               	  		subTitle={this.state.cart.restaurant.address +" "+this.state.cart.restaurant.city}
			               	  		image={this.state.cart.restaurant.logo}
			               	  		imageClass="img-fluid mr-3"
			               	  		imageAlt="osahan"
			               	  		NavLinkUrl="#"
			               	  		NavLinkText="View Full Menu"
			               	    />
			               	  } 
			                  { !this.state.loadingData &&
								  <div className="dropdown-cart-top-body border-top p-4">
									{
										this.state.cartItems.map((item,key)=>(
											<CartDropdownItem 
											    key={key}
												icoIcon='ui-press'
												iconClass='text-success food-item'
												title={item.name}
												qty={" X "+item.qty}
												price={Config.CURRENCY+" "+(item.special_price===null?item.price:item.special_price)+"/Item"}/>
											
										))
									}
									{
										this.state.cartItems.length<=0 &&
										<p>nothing found in your cart...!</p>
									}
			                  </div>}
							 { !this.state.loadingData &&
							  <div>
			                  <div className="dropdown-cart-top-footer border-top p-4">
			                     <p className="mb-0 font-weight-bold text-secondary">Grand Total <span className="float-right text-dark">{Config.CURRENCY+" "+this.state.cart.subtotal}</span></p>
			                     <small className="text-info">Extra charges may apply</small>  
			                  </div>
			                  <div className="d-flex">
			                     <NavDropdown.Item eventKey={5.1} as={Link} className="btn btn-success  py-3 text-white text-center dropdown-item  m-1" to="#" onClick={this.navigateToCart}>Cart</NavDropdown.Item>
								 {/* <NavDropdown.Item eventKey={5.2} as={Link} className="btn btn-success  py-3 text-white text-center dropdown-item w-50 m-1" to="/checkout"> Checkout</NavDropdown.Item> */}
			                  </div>
							  </div>}
			                </div>
			            </NavDropdown>}
			         </Nav>
			      </Navbar.Collapse>
			   </Container>
			</Navbar>
			</div>
		);
	}
}

export default withRouter(withToast(Header));