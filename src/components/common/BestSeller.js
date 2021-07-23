import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Image,Badge,Button} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';
import {CheckoutApi} from '../../API/Checkout.API';
import { useToasts } from 'react-toast-notifications'
import ChangeCartDataModel from '../modals/ChangeCartDataModel';


function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

class BestSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity:parseInt(this.props.qty) || 0,
      show: this.props.show || true,
      max:this.props.maxValue || 5,
      min:this.props.minValue || 0,
      showAlert:false,
      alertMessage:''
    };
  }

  IncrementItem = () => {
    CheckoutApi.updateCartQuantity(this.props.id,this.state.quantity)
               .then(()=>{
                 this.setState((prevState,props)=>({
                     quantity:prevState.quantity +1
                  }))
               }).catch((error)=>{
                 console.log(error)
               });
  }
  DecreaseItem = () => {
    if(this.state.quantity === 1) {
			this.props.addToast("Item quantity can not be less than 1", { appearance: 'error' });
       
    }else {
      CheckoutApi.updateCartQuantity(this.props.id,this.state.quantity)
                .then(()=>{
                  this.setState((prevState,props)=>({
                      quantity:prevState.quantity -1
                  }))
                }).catch((error)=>{
                  console.log(error)
                });
    }
  }
 
  componentDidMount(){
    console.log(this.props.isServiceable?"yes one"+this.props.title:'no iam not')
  }
  addToCart=()=>{
    
    if(!this.props.isServiceable){
       return this.props.addToast("This restaurant is not serviceable.", { appearance: 'warning' });
    }
    CheckoutApi.addToCart(this.props.id)
               .then((response)=>{
                  console.log(response)
                  this.setState({quantity:1})
                  this.props.addToast("Item added to cart..!", { appearance: 'success' });
                  window.location.reload();
               }).catch((error)=>{
                 let str='Your cart contain dishes';
                 let errorMessage=error.response.data.message;
                 if(errorMessage==='Unauthenticated.'){
                   this.props.addToast('you must login to add cart item', { appearance: 'warning' });
                   this.props.history.push('/login');
                 }
                 if(errorMessage.includes(str))
                  {
                     this.setState({showAlert:true,alertMessage:error.response.data.message})
                  }
               });
  }

  clearCartAndAddNewProducts=()=>{
       CheckoutApi.clearCartAndAddNewProducts(this.props.id)
                  .then(()=>{
                    window.location.reload();
                    this.props.addToast("Item added to cart..!", { appearance: 'success' });
                  }).catch((error)=>{
                    console.log('error');
                  }) 
  }
  hideAlert=()=>this.setState({showAlert:false});

  render() {
      return (
        <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
            <ChangeCartDataModel show={this.state.showAlert}
                                 onHide={this.hideAlert}
                                 message={this.state.alertMessage}
                                 clearCart={this.clearCartAndAddNewProducts}/>
               <div className="list-card-image">
                  <Link to="">
                    <Image src={this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} />
                  </Link>
               </div>
               <div className="p-3 position-relative">
                  <div className="list-card-body">
                     <h6 className="mb-1"><Link to="" className="text-black">{this.props.title}</Link></h6>
                     {this.props.subTitle ? (
                       <p className="text-gray mb-3">{this.props.subTitle}</p>
                       )
                       :''
                   }
                   {(this.props.price)? (
                       <p className="text-gray time mb-0">
                          {
                            parseInt(this.props.specialPrice)===0?
                            <Link className="btn btn-link btn-sm pl-0 text-black pr-0" to="">
                              {this.props.priceUnit}{this.props.price} 
                            </Link>:
                            <>
                             <Link className="btn btn-link btn-sm pl-0 text-black pr-0" to="">
                              {this.props.priceUnit}{this.props.specialPrice} 
                             </Link> 
                             <Link className="btn btn-link btn-sm pl-3 text-black pr-0 " to="">
                                <s>{this.props.priceUnit}{this.props.price}</s>
                              </Link>
                            </>

                          }
                          
                           {/* {(this.props.isNew)? (<Badge variant="success" className='ml-1'>NEW</Badge>):"" } */}
                           
                         {this.state.quantity===0?
                            <span className="float-right"> 
                              <Button variant='outline-secondary' onClick={this.addToCart} size="sm">ADD</Button>
                            </span>
                            :
                            <span className="count-number float-right">
                               <Button variant="outline-secondary" onClick={()=>this.props.history.push('/checkout')} className="btn-sm left dec"><Icofont icon="cart" />View in cart</Button>
                            </span>
                         }
                       </p>
                       ):''
                   }
                  </div>
               </div>
            </div>
    );
  }
}


BestSeller.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  isNew: PropTypes.bool,
  subTitle: PropTypes.string,
  price: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string,
  rating: PropTypes.string,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  getValue: PropTypes.func.isRequired
};
BestSeller.defaultProps = {
  imageAlt:'',
  imageClass:'',
  isNew: false,
  subTitle: '',
  price: '',
  priceUnit:'$',
  showPromoted: false,
  promotedVariant: 'dark',
  favIcoIconColor: '',
  rating: ''
}

export default withRouter(withToast(BestSeller));