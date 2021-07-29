import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import CONFIG from '../../CONFIG';
class VariantSelectModal extends React.Component {
    constructor(props) {
		super(props)
	
		this.state = {
			LoginLoaderDisplay:false,
			selectedVariantId:null,
			selectVariantError:false
		}
	}
	
	onChange=(e)=>{
		this.setState({selectVariantError:false});
		this.setState({selectedVariantId:e.target.value});
	}

	addToCart=()=>{
		this.setState({selectVariantError:false});
		if(this.state.selectedVariantId===null) return this.setState({selectVariantError:true});
		this.props.addToCart('variant',this.props.menuId,this.state.selectedVariantId);
	}
	render() {

		if(this.props.variants===undefined)return('')
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="sm"
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="delete-address">Customize {this.props.productName}</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>
			     {
					this.state.selectVariantError &&
					<p className='text-danger'>choose a variant..!</p>
				 }
			    {
					(this.props.variants)===null?'':
					this.props.variants.map((item,key)=>(
						<div className="form-check mb-2" key={key}>
							<input className="form-check-input" type="radio" name="variants" value={item.id} onChange={this.onChange}/>
							<label className="form-check-label d-flex justify-content-between" htmlFor="exampleRadios2">
								<span>{item.title}</span>
								<span>{CONFIG.CURRENCY+" "+item.price}</span>
							</label>
					    </div>
					))
				}
				
			  </Modal.Body>
			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="d-flex w-50 text-center justify-content-center">CANCEL</Button>
			    <Button type='button' onClick={()=>this.addToCart()} variant="primary" className='d-flex w-50 text-center justify-content-center'>ADD TO CART</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}
export default VariantSelectModal;