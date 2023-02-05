API_KEY = '33396171-581c3cabf7afd0272218aaf17';
import axios from 'axios';
function  Request(searchRequest,page){
return axios.get(`https://pixabay.com/api/?key=33396171-581c3cabf7afd0272218aaf17&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)}
export {Request};