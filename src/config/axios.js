// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it

// Where you would set stuff like your 'Authorization' header, etc ...
axios.defaults.baseURL="http://18.232.35.222:3000"

export default axios;
