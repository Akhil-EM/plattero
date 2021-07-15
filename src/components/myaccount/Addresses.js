import React from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';
import Icofont from 'react-icofont';
class Addresses extends React.Component {
	constructor(props, context) {
	    super(props, context);

	    this.state = {
	      showDeleteModal: false,
      	  showAddressModal: false,
	    };
	}

    hideDeleteModal = () => this.setState({ showDeleteModal: false });
    hideAddressModal = () => this.setState({ showAddressModal: false });

	render() {
    	return (
	      <>
	        <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal}/>
	        <DeleteAddressModal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}/>
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
               <Col md={6}>
				   {/* border border-primary shadow */}
               	  <AddressCard 
               	  	  boxClass="shadow-sm address-box-extra"
					  title= 'Home'
					  icoIcon= 'ui-home'
					  iconclassName= 'icofont-3x'
					  address= 'Osahan House, Jawaddi Kalan, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Work'
					  icoIcon= 'briefcase'
					  iconclassName= 'icofont-3x'
					  address= 'NCC, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'Delhi Bypass Rd, Jawaddi Taksal, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'MT, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'GNE Rd, Jawaddi Taksal, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
               <Col md={6}>
               	  <AddressCard 
               	  	  boxClass="shadow-sm"
					  title= 'Other'
					  icoIcon= 'location-pin'
					  iconclassName= 'icofont-3x'
					  address= 'GTTT, Model Town Rd, Pritm Nagar, Model Town, Ludhiana, Punjab 141002, India'
					  onEditClick= {() => this.setState({ showAddressModal: true })}
					  onDeleteClick={() => this.setState({ showDeleteModal: true })}
               	  />
               </Col>
              </Row>
		    </div>
	      </>
    	);
    }
}
export default Addresses;