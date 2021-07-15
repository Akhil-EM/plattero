import http from './@axios';
import Config from '../CONFIG'
const MenuApi={
    registerUser:(_firstName,_lastName,_phone,_email,_password)=>{
        return http.post('/customers',{
                first_name:_firstName,
                last_name:_lastName,
                phone:_phone,
                email:_email,
                password:_password},
                {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}})

    },
}
export  {MenuApi};