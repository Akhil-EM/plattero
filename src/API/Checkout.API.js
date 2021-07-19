import http from './@axios';
import Config from '../CONFIG'
const CheckoutApi={
    getCartData:()=>{
        return http.get(Config.APPLICATION_URL_SECOND+'carts/mine', {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })

    },
    updateCartQuantity:(_cartIemID,_count)=>{
        return http.put(`${Config.APPLICATION_URL_SECOND}carts/mine/items/${_cartIemID}`,{
                qty:_count,
                request_from: "web"
            },
            {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    }
   
}

export {CheckoutApi};