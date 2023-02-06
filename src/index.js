import './css/styles.css';
import Notiflix from 'notiflix';
import { request } from './api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let page = 1;
const imageContainerEl = document.querySelector(".gallery");
const searchFormEl = document.getElementById('search-form');
const loadMoreBtnEl = document.querySelector('.load-more')
// making a mark-up for photo card
function markUp(data){
     const markUpArr = data
     .map((el=>{return `<div class="photo-card"><a href="${el.largeImageURL}">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${el.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${el.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${el.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${el.downloads}</b>
      </p>
    </div>
  </div>`}))
  .join("");
  imageContainerEl.insertAdjacentHTML('beforeend',markUpArr);
}
// add a lightbox lib to gallery
let gallery = new SimpleLightbox('.gallery a');
// creating a function for searching form
async function searchHandler(event){
    event.preventDefault();
    page = 1;
    const requestData = event.target.searchQuery.value.trim();
    if(requestData===""){
        return;
    }
    try{
        const {data} = await request(requestData,page);
        if(data.hits.length){
            loadMoreBtnEl.classList.remove('hidden');
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }else{
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            loadMoreBtnEl.classList.add('hidden');
        }
        imageContainerEl.innerHTML = '';
        markUp(data.hits);
        gallery.refresh();
    
    }catch(err){
        Notiflix.Notify.failure(`Some ${err} broken all staff`)
    }
}
searchFormEl.addEventListener('submit',searchHandler);
// add a function for infite scroll load
async function loadMoreHandler(event){
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    page++;
    const requestData = searchFormEl.searchQuery.value;
    try{
        if (scrollTop + clientHeight >= scrollHeight - 5){
        const {data} = await request(requestData,page);
        console.log(data);
        if(page===Math.floor(data.totalHits / 40)){
        loadMoreBtnEl.classList.add('hidden');
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        }
        markUp(data.hits);
        gallery.refresh();}
    }catch(err){
        Notiflix.Notify.failure(`Some ${err} broken all staff`)
    }
    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
});
}
// add the listener for event scroll
window.addEventListener('scroll',() => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreHandler()
    }
}, {
    passive: true
});



