import React from 'react';
import {withRouter} from 'react-router-dom';
import {Image,Badge,Spinner} from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import Icofont from 'react-icofont';
import { ProfileApi } from '../../API/Profile.API';
import { useToasts } from 'react-toast-notifications'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}
class CardItem extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			loaderDisplay:false,
		    favIcoIconColor:this.props.favIcoIconColor,

		}
	}

	static getDerivedStateFromProps(props, state) {
        if(props.imageAlt !== state.name){
            //Change in props
            return{
              
            };
        }
        return null; // No change to state
    }
	
	navigate=(_to)=>{
		if(!this.props.isServiceable)return this.props.addToast("Sorry this restaurant is not serviceable..!", { appearance: 'warning' });
		this.props.history.push(`/detail/${_to}`)
	}

	removeFavorite=()=>{
		this.setState({loaderDisplay:true});
         ProfileApi.removeFromFavoriteRestaurantList(this.props.id)
		           .then((response)=>{
					   this.setState({favIcoIconColor:'text-secondary',loaderDisplay:false})
					   if(!this.props.fromList){
						  this.props.renderParent();
					    }
				   }).catch((error)=>{
					   this.setState({loaderDisplay:false})
					   console.log(error);
				   })
	}

	addToFavorite=()=>{
		this.setState({loaderDisplay:true});
		ProfileApi.addToFavoriteRestaurantList(this.props.id)
		          .then((response)=>{
					  this.setState({favIcoIconColor:'text-danger',loaderDisplay:false});
					  if(!this.props.fromList){
						 this.props.renderParent();
					   }
					  
				  }).catch((error)=>{
					  this.setState({loaderDisplay:false});
					  if(error.response.data.message==='Unauthenticated.'){
						this.props.addToast('please login to add favorite.', { appearance: 'warning' });
						this.props.history.push('/login')
					  }
				  })
	}

	changeFavorite=()=>{
		if(this.state.favIcoIconColor==='text-danger'){
			//already in favorite list so remove it
            this.removeFavorite();
		}

		if(this.state.favIcoIconColor==='text-secondary'){
			//not  in favorite list so add
            this.addToFavorite();
		}
	}
	render() {
    	return (
    		<div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
               <div className="list-card-image">
               	  {this.props.rating ? (
	                  <div className="star position-absolute">
                  		<Badge variant="success">
	                  		<Icofont icon='star'/> {this.props.rating}
	                  	</Badge>
	              	  </div>
	              	  )
	              	  :""
	              }
                  <div className={`favourite-heart position-absolute ${this.state.favIcoIconColor}`}
				       onClick={this.changeFavorite}>
                  		{
						    !this.state.loaderDisplay?
							<Icofont icon='heart'/>:
							<Spinner animation="grow" size="sm" variant="light"/>	
						}
                  </div>

					<div onClick={()=>this.navigate(this.props.id)} style={{cursor:'pointer'}}>
						<Image  src={this.props.image} className={this.props.imageClass} alt={this.props.imageAlt} />
					</div>

				  { !this.props.isServiceable &&
					<span className='badge  badge-warning'>
					  not serviceable
				    </span>}
				 
				  
                  
               </div>
               <div className="p-3 position-relative">
                  <div className="list-card-body">
                     <h6 className="mb-1" style={{cursor:'pointer'}}><div onClick={()=>this.navigate(this.props.id)} >{this.props.title}</div></h6>
                     {this.props.subTitle ? (
	                     <p className="text-gray mb-3">{this.props.subTitle}</p>
	                     )
	                     :''
	                 }
	                 {(this.props.time || this.props.price)? (
	                     <p className="text-gray mb-3 time">
	                     	{this.props.time ? (
		                     	<span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
		                     		<Icofont icon='wall-clock'/> {this.props.time}
		                     	</span> 
		                     	)
		                     	:""
		                    }
							{this.props.price ? (
	                     		<span className="float-right text-black-50"> {this.props.price}</span>
	                     		)
	                     		:""
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


CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  rating: PropTypes.string,
};
CardItem.defaultProps = {
  	imageAlt:'',
    imageClass:'',
    offerText: '',
    offerColor: 'success',
	subTitle: '',
	time: '',
	price: '',
	showPromoted: false,
  	promotedVariant: 'dark',
	favIcoIconColor: '',
	rating: '',
}

export default withToast(withRouter(CardItem));