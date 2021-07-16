
let config=JSON.parse(localStorage.getItem('configurations'))===null?{}:
           JSON.parse(localStorage.getItem('configurations'))
let token=localStorage.getItem('api_token')===null?"":localStorage.getItem('api_token');

module.exports={
    APPLICATION_BASE_URL:'https://plattero.com/api/03879045/V1',
    APPLICATION_URL_SECOND:'https://plattero.com/api/V1/',
    API_HEADERS:{
        'Content-type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
    ABOUT_URL:config.about_url,
    COUNTRY:config.country,
    CURRENCY:config.currency,
    DEFAULT_LOCATION:config.default_location,
    DIALING_CODE:config.dialing_code,
    FAQ_URL:config.faq_url,
    HELP_CENTER_EMAIL:config.help_center_email,
    HELP_LINE:config.help_line,
    MOBILE_DIGITS:config.mobile_digits,
    INTEGRATION_TOKEN:config.integration_token,
    API_TOKEN:token
    
}
