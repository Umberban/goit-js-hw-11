const API_KEY = '33396171-581c3cabf7afd0272218aaf17';
const URL = `https://pixabay.com/api/?key=`
// https://pixabay.com/api/?key=${API_KEY}&q=${searchRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
import axios from 'axios';
function  request(searchRequest,page){
console.log(URL)
return axios.get(`${URL}${API_KEY}&q=${searchRequest}&${searchParams}&page=${page}`)}
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation:"horizontal",
    safesearch:true,
    per_page:40
  });



export {request};