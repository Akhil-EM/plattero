// /rest-wishlists/mine
import http from './@axios';
import Config from '../CONFIG'
import axios from 'axios';
const ProfileApi={
    wishList:()=>{
        return axios.get('https://plattero.com/api/V1/rest-wishlists/mine', {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
        
    },
    orderList:()=>{
        return axios.get('https://plattero.com/api/V1/orders/mine', {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    orderDetail:(_id)=>{
        return axios.get(`https://plattero.com/api/V1/orders/mine/${_id}`, {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    customerDetail:()=>{
        return axios.get(`https://plattero.com/api/V1/customers/me`, {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    editCustomer:(_firstName,_lastName,_phone,_email)=>{
        return http.put('https://plattero.com/api/V1/customers/me',{
                first_name:_firstName,
                last_name:_lastName,
                phone:_phone,
                email:_email},
                {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})

    },
    updatePassword:(_oldPassword,_newPassword)=>{
        return http.put('https://plattero.com/api/V1/customers/me/password',{
               current_password:_oldPassword,
               new_password:_newPassword},
                {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})

    },
    addNewAddress:(_firstName,_lastName,_addressLine1,
                   _addressLine2,_city,_state,_country,_pincode)=>{
       return axios.post(Config.APPLICATION_URL_SECOND+'addresses/mine',{
        first_name:_firstName,
        last_name:_lastName,
        add_line1:_addressLine1,
        add_line2:_addressLine2,
        add_city:_city,
        add_state:_state,
        add_country:_country,
        pincode:_pincode,
        lattitude: "45",
        longitude: "67"},
        {headers:{Authorization:`Bearer ${Config.API_TOKEN}`}})
    },
    getAddressList:()=>{
        return http.get(Config.APPLICATION_URL_SECOND+'addresses/mine', {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    },
    deleteAddress:(_addressId)=>{
        return http.delete(`${Config.APPLICATION_URL_SECOND}addresses/mine/${_addressId}`, {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })
    }

}
export  {ProfileApi};