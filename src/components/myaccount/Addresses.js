import React from 'react';
import {Row,Col,Button,Spinner} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import EditAddressModal from '../modals/EditAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';
import {ProfileApi} from '../../API/Profile.API'
class Addresses extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
      	  showAddressModal: false,
		  customerAddressList:[],
		  addressLoading:true,
		  deleteAddressId:null,
		  editAddressModal:false,
		  firstName:'',
		  lastName:'',
		  addressId:0,
		  latitude:'',
		  longitude:''
	    };
	}

	componentDidMount(){
        this.getInitialData();
	}

	getInitialData=()=>{
		this.setState({addressLoading:true})
        ProfileApi.getAddressList()
		          .then((response)=>{
					//   console.log(response)
					  this.setState({customerAddressList:response.data.data.customeraddress,
					                 addressLoading:false});
				  }).catch((error)=>{
					  console.log(error.response);
					  this.setState({addressLoading:false});
				  })
	}
    
	deleteAddress=()=>{
		ProfileApi.deleteAddress(this.state.deleteAddressId)
		          .then(()=>{
					this.setState({showDeleteModal:false});
					this.getInitialData();
				  });
	}
	
	showDeleteDialogue=(_deleteAddressId)=>{
		this.setState({deleteAddressId:_deleteAddressId},
			    ()=>{
					this.setState({showDeleteModal: true });
				});
		
	}
    hideDeleteModal = () => this.setState({ showDeleteModal: false });
    hideAddressModal = () => this.setState({ showAddressModal: false });
    hideEditAddressModal=()=> this.setState({editAddressModal:false});
    showEditAddressModal=(_firstName,_lastName,_addressLine1,_addressLine2,
		                  _city,_pincode,_state,_id,_latitude,_longitude)=>{

		this.setState({firstName:_firstName,
						lastName:_lastName,
						addressLine1:_addressLine1,
						addressLine2:_addressLine2,
						city:_city,
						pincode:_pincode,
						state:_state,
						addressId:_id,
						latitude:_latitude,
						longitude:_longitude,
					    editAddressModal:true,});
	}
	render() {
    	return (
	      <>
		    {/* this.state.showAddressModal */}
	        <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal}
			                 renderParent={this.getInitialData}/>
	        <DeleteAddressModal show={this.state.showDeleteModal} 
			                    onHide={this.hideDeleteModal}
								deleteAddress={this.deleteAddress}/>
			<EditAddressModal show={this.state.editAddressModal}
			                  onHide={this.hideEditAddressModal}
							  firstName={this.state.firstName}
							  lastName={this.state.lastName}
							  addLine1={this.state.addressLine1}
							  addLine2={this.state.addressLine2}
							  city={this.state.city}
							  pincode={this.state.pincode}
							  state={this.state.state}
							  addressId={this.state.addressId}
							  renderParent={this.getInitialData}
							  coordinates={{lat:parseFloat(this.state.latitude),lng:parseFloat(this.state.longitude)}}/>
		    <div className='p-4 bg-white shadow-sm'>
              <Row>
               <Col md={12}>
                  <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
               </Col>
			   <Col md={12} className='p-3'>
			     <Button type='button ' onClick={() => this.setState({ showAddressModal: true })} variant="outline-primary" className="d-flex w-75 text-center justify-content-center">
				  Add New Address
				</Button>
               </Col>
			   {this.state.addressLoading &&
                    <Col md={12} className="text-center load-more mt-3" >
                      <Button variant="primary" type="button" disabled="">
                        <Spinner animation="grow" size="sm" className='mr-1' />
                         Loading...
                        </Button>  
                    <div style={{height:'200px'}}/>
                </Col>}
             
			   {
				 !this.state.addressLoading &&
				 this.state.customerAddressList.map((item,key)=>(
					<Col md={6} key={key}>
					  <AddressCard 
						boxClass="shadow-sm address-box-extra"
						title={item.first_name+' '+item.last_name}
						icoIcon= 'location-pin'
						iconclassName= 'icofont-3x'
						address={item.add_line1+' , '+item.add_line2+' , '+item.pincode+' , '+item.add_city+' , '+item.add_state+' , '+item.add_country}
						onEditClick= {()=>this.showEditAddressModal(item.first_name,item.last_name,item.add_line1,
							                                        item.add_line2,item.add_city,item.pincode,item.add_state,
																	item.id,item.lattitude,item.longitude)}
						onDeleteClick={() => this.showDeleteDialogue(item.id)}
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
export default Addresses;