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
    },
    deleteCartItem:(_cartIemID)=>{
        return http.delete(`${Config.APPLICATION_URL_SECOND}carts/mine/items/${_cartIemID}`,
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    },
    checkoutCart:(_addressId)=>{
        return http.get(`${Config.APPLICATION_BASE_URL}/checkout/mine`,{
            params:{address_id:_addressId},
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    addToCart:(_menu_id)=>{
        return http.post(Config.APPLICATION_URL_SECOND+'carts/mine/items',
        {menu_id:_menu_id,
         qty:1,
         request_from: "web"},
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    },
    clearCartAndAddNewProducts:(_menu_id)=>{
        return http.post(Config.APPLICATION_URL_SECOND+'carts/mine/clear/items',
        {menu_id:_menu_id,
         qty:1,
         request_from: "web"},
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    },
    couponList:()=>{
        return http.get(`${Config.APPLICATION_URL_SECOND}carts/mine/coupons`,{
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    applyCoupon:(_offer)=>{
        return http.post(Config.APPLICATION_URL_SECOND+'carts/mine/coupons',
        {coupon:_offer},
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    },
    removeCoupon:()=>{
        return http.delete(Config.APPLICATION_URL_SECOND+'carts/mine/coupons',
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})

    },
    placeOrder:(_orderNotes,_payMethod,_addressId,_payment)=>{
        return http.post(Config.APPLICATION_BASE_URL+'/order',
            {order_customer_notes:_orderNotes,
             pay_method:_payMethod,
             address_id:_addressId,
             payment:{}},
            {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    }

   
}

export {CheckoutApi};