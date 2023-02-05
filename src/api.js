KEY = '33396171-581c3cabf7afd0272218aaf17';
searchRequest = 'flowers';
import axios from 'axios';
async function  Request(){
return axios.get(`https://pixabay.com/api/?key=${KEY}&q=${searchRequest}`).then(res=>(console.log(res.data.hits[0].pageURL)));}
export {Request};