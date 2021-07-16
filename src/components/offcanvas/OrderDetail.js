import React, { Component } from 'react';
import {Col,Row,Button,Spinner} from 'react-bootstrap';
import Icofont from 'react-icofont';
import Config from '../../CONFIG';
class OrderDetail extends Component {
  
    render() {
        return (
           <React.Fragment>

              { this.props.DetailsShow&&
              <Row className='off-canvas-bg '>
               
                
               <Col xs={1} md={8} lg={8} className="off-canvas-shadow m-0 p-0"
                    onClick={this.props.onHide}>
               </Col>
               <Col xs={11} md={4} lg={4} className='off-canvas '>
                  <div className='d-flex justify-content-between m-0 pt-4'>
                     <h4>Order Details</h4>
                     <button className='btn float-right off-canvas-btn'
                             onClick={this.props.onHide}>
                        <Icofont icon="close" style={{fontSize:'1.3em'}}/>
                     </button>
                  </div>
                  <br/>
                  <div className='off-canvas-container p-2'>
                     { this.props.orderId===''?
                     <Col md={12} className='text-center'>
                        <Button variant="primary" type="button" disabled="">
                              <Spinner animation="grow" size="sm" className='mr-1' />
                              Loading...
                        </Button>
                     </Col>:
                     <div> 
                        <h5>ORDER: #{this.props.orderId}</h5>
                        <br/>
                        <div className='d-flex'>
                           <Icofont icon="fast-food" style={{fontSize:'2em',color:'#f32129'}}/>
                           <div>
                           <h6>{this.props.restaurantDetail.name}</h6>
                           </div>
                        </div>
                        <p className='dashed-left-border'>
                           {
                              this.props.restaurantDetail.address+" "+
                              this.props.restaurantDetail.city+" "+
                              this.props.restaurantDetail.state
                           }
                        </p>
                        <div className='d-flex'>
                           <Icofont icon="location-pin" style={{fontSize:'2em',color:'#f32129'}}/>
                           <div>
                           <h6>
                              {
                                 this.props.deliveryAddress.first_name+" "+
                                 this.props.deliveryAddress.last_name

                              }
                           </h6>
                           <p>{
                                 this.props.deliveryAddress.address1+" "+
                                 this.props.deliveryAddress.address2+" "+
                                 this.props.deliveryAddress.city+" "+
                                 this.props.deliveryAddress.pincode

                              }
                           </p>
                           </div>
                        </div>
                        <hr/>
                        <div className='d-flex'>
                           <Icofont icon="tick-mark" className='text-success' style={{fontSize:'2em'}}/>
                           <p>Placed On {this.props.orderPlacedDate}</p>
                        </div>
                        <hr style={{margin:'5px'}}/>
                        {
                           this.props.orderHistory.map((item,key)=>(
                              <div className='d-flex' key={key}>
                               <Icofont icon="tick-mark" className='text-success' style={{fontSize:'2em'}}/>
                               <p>{item.status}  {item.status_date}</p>
                              </div>
                           ))
                        }
                        
                        <hr style={{margin:'5px'}}/>
                        <h6>Items</h6>
                           {
                              this.props.items.map((item,key)=>(
                                 <div className='d-flex justify-content-between' key={key}>
                                    <p>{item.item_name} X {item.qty}</p>
                                    <p>{item.special_price}</p>
                                 </div>
                              ))
                           }
                          
                      
                        <div className='line-breaker'/>
                        { this.props.discount===''?'':
                          <div className='d-flex justify-content-between'>
                              <h6>Discount Amount</h6>
                              <h6>{Config.CURRENCY+" "+this.props.discount}</h6>
                           </div>}
                        <div className='d-flex justify-content-between'>
                           <h5>Item Total</h5>
                           <h6>{Config.CURRENCY+" "+this.props.total}</h6>
                        </div>
                     </div>}
                  </div>
                  
               </Col>
            </Row>}
           </React.Fragment>
           
        );
    }
}

export default OrderDetail;
