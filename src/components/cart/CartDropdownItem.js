import React from 'react';
import PropTypes from 'prop-types'; 
class CartDropdownItem extends React.Component {
  constructor(props) {
    super(props)
    this.name=(this.props.title).length>20?(this.props.title).slice(0,20)+'...'
                              :this.props.title;
  }
  
	render() {
		return (
			<p className="mb-2"> 
             	<span >{this.name} {this.props.qty}</span>  
             	<span className="float-right text-secondary">{this.props.price}</span>
      </p>
		);
	}
}

CartDropdownItem.propTypes = {
  title: PropTypes.string,
  qty:PropTypes.string,
  price: PropTypes.string,
  icoIcon: PropTypes.string,
  iconclass: PropTypes.string
};

CartDropdownItem.defaultProps = {
  title: '',
  price: '',
  icoIcon: '',
  iconclass: '',
  qty:''
}

export default CartDropdownItem;