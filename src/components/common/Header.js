import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Navbar,Nav,Container,NavDropdown,Image,Badge} from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import Icofont from 'react-icofont';
import Config from '../../CONFIG';
import {MdLocationOn,MdSearch} from 'react-icons/md';
import SetAddressModal from '../modals/SetAddressModal';
import {withRouter} from 'react-router-dom';
class Header extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      isNavExpanded: false,
		  showDeliveryAddressSelector:false,
		  searchFor:''
	    };
	}

    searchChanged=(event)=>this.setState({searchFor:event.target.value});
	

    setIsNavExpanded = (isNavExpanded) => {
      this.setState({ isNavExpanded: isNavExpanded });
    }
    closeMenu = () => {
      this.setState({ isNavExpanded: false });
    }

    handleClick = (e) => {
      if (this.node.contains(e.target)) {
        // if clicked inside menu do something
      } else {
        // If clicked outside menu, close the navbar.
        this.setState({ isNavExpanded: false });
      }
    }
  
	componentDidMount() {
	    document.addEventListener('click', this.handleClick, false);      
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
						<Nav.Link>
						   <div className='header-search'>
						      <input type='text' 
							         placeholder="Search for dishes in plattero"
									 value={this.state.searchFor}
									 onChange={this.searchChanged}/>
							  <MdSearch fontSize='2em' width='10%'
							            onClick={()=>this.navigate('menu')}/>
						   </div>
                           
						</Nav.Link>
						<Nav.Link className='app-text-main' onClick={this.showAddressSelector}>
							<MdLocationOn fontSize='1.5em'/>
							Choose location<span className="sr-only">(current)</span>
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
			            			badgeValue={5}
			            		/>
			            	}>
                         
			                <div className="dropdown-cart-top shadow-sm">
			               	  {
			               	  	<CartDropdownHeader 
			               	  		className="dropdown-cart-top-header p-4" 
			               	  		title="Gus's World Famous Chicken"
			               	  		subTitle="310 S Front St, Memphis, USA"
			               	  		image="img/cart.jpg"
			               	  		imageClass="img-fluid mr-3"
			               	  		imageAlt="osahan"
			               	  		NavLinkUrl="#"
			               	  		NavLinkText="View Full Menu"
			               	    />
			               	  } 
			                  <div className="dropdown-cart-top-body border-top p-4">
			                     <CartDropdownItem 
			                     	icoIcon='ui-press'
			                     	iconClass='text-success food-item'
			                     	title='Corn & Peas Salad x 1'
			                     	price='$209'
			                     />

			                     <CartDropdownItem 
			                     	icoIcon='ui-press'
			                     	iconClass='text-success food-item'
			                     	title='Veg Seekh Sub 6" (15 cm) x 1'
			                     	price='$133'
			                     />

			                     <CartDropdownItem 
			                     	icoIcon='ui-press'
			                     	iconClass='text-danger food-item'
			                     	title='Chicken Tikka Sub 12" (30 cm) x 1'
			                     	price='$314'
			                     />

			                     <CartDropdownItem 
			                     	icoIcon='ui-press'
			                     	iconClass='text-success food-item'
			                     	title='Corn & Peas Salad x 1 '
			                     	price='$209'
			                     />
			                  </div>
			                  <div className="dropdown-cart-top-footer border-top p-4">
			                     <p className="mb-0 font-weight-bold text-secondary">Sub Total <span className="float-right text-dark">$499</span></p>
			                     <small className="text-info">Extra charges may apply</small>  
			                  </div>
			                  <div className="dropdown-cart-top-footer border-top p-2">
			                     <NavDropdown.Item eventKey={5.1} as={Link} className="btn btn-success btn-block py-3 text-white text-center dropdown-item" to="/checkout"> Checkout</NavDropdown.Item>
			                  </div>
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

export default withRouter(Header);