import http from './@axios';
import Config from '../CONFIG'
const HomeApi={
    restaurants:(_pageSize,_currentPage,_searchString,_latitude,_longitude)=>{
        return http.post('/restuarants',{
            "pagesize":_pageSize,
            "currentpage":_currentPage,
            "searchstring":_searchString,
            "filter":{
                "lattitude":_latitude,
                "longitude":_longitude
            }
        
        })

    },
    homepage:(_latitude,_longitude)=>{
         return http.get('/home',{
             params:{
                latitude:_latitude,
                longitude:_longitude,
                platform:"web",
            },
             headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}
         })
    }
}
export {HomeApi};