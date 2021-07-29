import React from 'react';
import {Image,Badge,Button,Media} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';
import {CheckoutApi} from "../../API/Checkout.API";
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}
class QuickBite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity:parseInt(this.props.qty) || 0,
      show: this.props.show || true,
      max:this.props.maxValue || 5,
      min:this.props.minValue || 0
    };
  }

  IncrementItem = () => {
    CheckoutApi.updateCartQuantity(this.props.id,this.state.quantity+1)
               .then(()=>{
                 this.setState((prevState,props)=>({
                     quantity:prevState.quantity +1
                  }),()=>{
                     this.props.renderParent();
                  })
                  
               }).catch((error)=>{
                 console.log(error)
               });
  }
  DecreaseItem = () => {
    if(this.state.quantity === 1) {
			this.props.addToast("Item quantity can not be less than 1", { appearance: 'error' });
       
    }else {
      CheckoutApi.updateCartQuantity(this.props.id,this.state.quantity-1)
                .then(()=>{
                  this.setState((prevState,props)=>({
                      quantity:prevState.quantity -1
                  }))
                  this.props.renderParent();
                }).catch((error)=>{
                  console.log(error)
                });
    }
  }
  
  deleteCartItem=()=>{
    CheckoutApi.deleteCartItem(this.props.id)
                .then(()=>{
                  this.props.addToast("Item removed from cart..!", { appearance: 'success' });
                  this.props.renderParent();
                  window.location.reload();
                }).catch((error)=>{
                  console.log(error)
  });
  }
  render() {
      return (
      	<div className={"p-3 border-bottom "+this.props.itemClass}>
          <div className='delete-icon' onClick={this.deleteCartItem}>
             <Icofont icon='close' size="2"/>
          </div>
		   {this.state.quantity===0?
	            <span className="float-right"> 
	              <Button variant='outline-secondary' onClick={this.IncrementItem} size="sm">ADD</Button>
	            </span>
	            :
	            <span className="count-number float-right">
	               <Button variant="outline-secondary" onClick={this.DecreaseItem} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
	               <input className="count-number-input" type="text" value={this.state.quantity} readOnly/>
	               <Button variant="outline-secondary" onClick={this.IncrementItem} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
	            </span>
	         }
		   <Media>
		      {this.props.image?
		      	<Image className={"mr-3 rounded-pill " +this.props.imageClass} src={this.props.image} alt={this.props.imageAlt} />
		      	:
		      	<div className="mr-3"><Icofont icon="ui-press" className={"text-"+this.props.badgeVariant+" food-item"} /></div>
		      }
		      <Media.Body>
		         <h6 className="mb-1">{this.props.title}{" X "+this.state.quantity}{this.props.showBadge?<Badge variant={this.props.badgeVariant}>{this.props.badgeText}</Badge>:""}</h6>
             {
               this.props.price !== this.props.specialPrice?
               <p className="text-gray mb-0"><s>{this.props.priceUnit}{this.props.price}</s> {this.props.priceUnit}{this.props.specialPrice} / item.</p>:
               <p className="text-gray mb-0">{this.props.priceUnit}{this.props.price} /item.</p>

             }
             
		      </Media.Body>
		   </Media>
		</div>
    );
  }
}


QuickBite.propTypes = {
  itemClass:PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};
QuickBite.defaultProps = {
  itemClass:'gold-members',
  imageAlt:'',
  imageClass:'',
  showBadge: false,
  price: '',
  priceUnit:'',
  showPromoted: false,
  badgeVariant: 'danger'
}

export default withToast(QuickBite);