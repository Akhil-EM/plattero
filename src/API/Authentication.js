import http from './@axios';
import Config from '../CONFIG'
const AuthenticationApi={
    registerUser:(_firstName,_lastName,_phone,_email,_password)=>{
        return http.post('/customers',{
                first_name:_firstName,
                last_name:_lastName,
                phone:_phone,
                email:_email,
                password:_password},
                {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}})

    },
    loginUser:(_userName,_password)=>{
        return http.post('/integration/customer/token',{
                username:_userName,
                password:_password},
            {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}})
    }
}
export  {AuthenticationApi};