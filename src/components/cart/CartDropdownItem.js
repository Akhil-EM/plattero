import React from 'react';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';

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
  title: PropTypes.string.isRequired,
  qty:PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclass: PropTypes.string.isRequired
};

CartDropdownItem.defaultProps = {
  title: '',
  price: '',
  icoIcon: '',
  iconclass: '',
  qty:''
}

export default CartDropdownItem;