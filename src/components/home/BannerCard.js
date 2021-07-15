import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';
class BannerCard extends Component {
    render() {
        return (
            <div>
               <Image  src={this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} />
               <div className='banner-text p-3'>
                <h3 style={{color:'#fff'}}>40%</h3>
                <h5 style={{color:'#fff'}}>Buy Package 1 Got Discount</h5>
                <p style={{color:'#fff',width:'50%'}} className='d-none d-md-block'>
                    Ramadan discount of 40% for package 1 purchases, valid during the month of Ramadan
                </p>
               </div>
            </div>
        );
    }
}

BannerCard.propTypes = {
    linkUrl: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageClass: PropTypes.string,
    imageAlt: PropTypes.string,
    boxClass: PropTypes.string,
    title: PropTypes.string,
    counting: PropTypes.string,
};

BannerCard.defaultProps = {
  imageAlt:'',
  image:'',
  imageClass:'',
  linkUrl: '',
  boxClass:'products-box',
  title:'',
  counting:'',
}
export default BannerCard;
