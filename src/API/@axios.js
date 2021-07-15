import axios from "axios";
import Config from '../CONFIG';

export default axios.create({
    baseURL:Config.APPLICATION_BASE_URL,
    headers:Config.API_HEADERS

});