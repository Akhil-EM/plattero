// /rest-wishlists/mine
import http from './@axios';
import Config from '../CONFIG'
import axios from 'axios';
const ProfileApi={
    wishList:()=>{
        // return http.get('/rest-wishlists/mine',{
        //    headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}
        // });
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
    }

}
export  {ProfileApi};