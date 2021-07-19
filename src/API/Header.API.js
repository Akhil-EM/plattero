import http from './@axios';
import Config from '../CONFIG'
const HeaderApi={
    getCartData:()=>{
        return http.get(Config.APPLICATION_URL_SECOND+'carts/mine', {
            headers:{Authorization:`Bearer ${Config.API_TOKEN}`}
        })

    },
   
}
export {HeaderApi};