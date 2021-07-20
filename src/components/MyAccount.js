import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {NavLink,Link } from 'react-router-dom';
import {Row,Col,Container,Image,Button,Spinner} from 'react-bootstrap';
import Orders from './myaccount/Orders';
import Favourites from './myaccount/Favourites';
import Addresses from './myaccount/Addresses';
import EditProfileModal from './modals/EditProfileModal';
import {ProfileApi} from '../API/Profile.API';
import ChangePasswordModal from './modals/ChangePasswordModal';
class MyAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showEditProfile: false,
      showEditPassword:false,
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      profileDetailsLoading:true
    };
  }

  componentDidMount=()=>{
     this.loadInitialData();
  }

  loadInitialData=()=>{
   this.setState({profileDetailsLoading:true});
   ProfileApi.customerDetail()
             .then((response)=>{
                  this.setState({firstName:response.data.data.customer.first_name,
                                 lastName:response.data.data.customer.last_name,
                                 email:response.data.data.customer.email,
                                 phone:response.data.data.customer.phone,
                                 profileDetailsLoading:false})
             }).catch((error)=>{
                  console.log(error);
                  this.setState({profileDetailsLoading:false});
             })
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });
  hideEditPassword=()=> this.setState({showEditPassword:false});
  logoutUser=()=>{
      localStorage.clear();
      this.props.history.push('/');
      window.location.reload();
  }
	render() {
    	return (
    		<>
        <EditProfileModal 
                          show={this.state.showEditProfile} 
                          onHide={this.hideEditProfile}
                          renderParent={this.loadInitialData}/>
       <ChangePasswordModal show={this.state.showEditPassword} 
                            onHide={this.hideEditPassword}
                            renderParent={this.loadInitialData}/>
        <section className="section pt-4 pb-4 osahan-account-page">
           <Container>
              <Row>
                 <Col md={3}>
                    <div className="osahan-account-page-left shadow-sm bg-white h-100">
                       <div className="border-bottom p-4">
                          <div className="osahan-user text-center">
                             <div className="osahan-user-media">
                                <Image className="mb-3 rounded-pill shadow-sm mt-1" src="/img/user-icon.png" alt="gurdeep singh osahan" />
                                <div className="osahan-user-media-body">
                                { this.state.profileDetailsLoading &&
                                   <Col md={12} className="text-center load-more mt-3" >
                                       <Button variant="primary" type="button" disabled="">
                                          <Spinner animation="grow" size="sm" className='mr-1' />
                                          Loading...
                                       </Button>  
                                       <div style={{height:'60px'}}/>
                                   </Col>}
                                  { !this.state.profileDetailsLoading &&
                                   <div>
                                    <h6 className="mb-2">{this.state.firstName} {this.state.lastName}</h6>
                                    <p className="mb-1">+91 {this.state.phone}</p>
                                    <p>{this.state.email}</p>
                                   
                                   <div className="d-flex justify-content-between">
                                    <p className="mb-0 text-black font-weight-bold small-font"><Link to='#' onClick={() => this.setState({ showEditProfile: true })} className="text-primary"><i className="icofont-ui-edit"></i>EDIT</Link></p>
                                    <p className="mb-0 text-black font-weight-bold small-font"><Link to='#' onClick={() => this.setState({showEditPassword: true })} className="text-primary"><i className="icofont-key"></i>CHANGE PASSWORD</Link></p>
                                   </div>
                                   </div>}
                                </div>
                             </div>
                          </div>
                       </div>
                       <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/favourites"><i className="icofont-heart"></i> Favourites</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/addresses"><i className="icofont-location-pin"></i> Addresses</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/orders"><i className="icofont-food-cart"></i> Orders</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" onClick={this.logoutUser} exact to=""><i className="icofont-logout"></i>Logout</NavLink>
                          </li>
                       </ul>
                    </div>
                 </Col>
                 <Col md={9}>
                  <Switch>
                    <Route path="/myaccount/orders" exact component={Orders} />
                    <Route path="/myaccount/favourites" exact component={Favourites} />
                    <Route path="/myaccount/addresses" exact component={Addresses} />
                  </Switch>
                 </Col>
              </Row>
           </Container>
        </section>
    		</>
    	);
    }
}


export default MyAccount;