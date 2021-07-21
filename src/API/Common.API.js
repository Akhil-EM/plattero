import http from './@axios';
import Config from '../CONFIG'
const CommonApi={
    configuration:()=>{
        return http.get('/configuration');
    },
    restaurants:(_category,_pincode,_lattitude,_longitude)=>{
        return http.post('/restuarants',{
            filter: {
            category:_category,
            pincode:_pincode,
            lattitude:_lattitude,
            longitude:_longitude
           }
          },{headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}})
    },
    restaurantDetail:(_restaurantID)=>{
        return http.get(`restuarant/${_restaurantID}`,
                                     {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}
                                      });
    },
    categories:(_categoryId)=>{
        return http.get(`categories/${_categoryId}`,
                                     {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}
                                     });
    },
    products:(_currentPage,_categoryId,_restaurantId,_pagesize,_searchString,
              _field,_direction)=>{
        return http.post('/products',{
                         currentpage:_currentPage,
                         filter: {category:_categoryId,restaurant_id:_restaurantId},
                         category:_categoryId,
                         restaurant_id:_restaurantId,
                         pagesize:_pagesize,
                         searchstring:_searchString,
                         sortorder: {field:_field, direction:_direction},
                         direction:_direction,
                         field:_field},
                         {headers:{Authorization:`Bearer ${Config.INTEGRATION_TOKEN}`}})
        
    },
    contactUs:(_name,_email,_phone,_subject,_message)=>{
        console.log(_name,_email,_phone,_subject,_message)
    }
}
export  {CommonApi};