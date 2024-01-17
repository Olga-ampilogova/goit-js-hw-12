import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const galleryTile = document.querySelector('.gallery');
const searchValue = document.querySelector('.searchform')
const searchForm = document.querySelector('.search-form');
const loadIndicator  = document.querySelector('.spinner');
const loadMoreButton = document.querySelector('.load_more');

loadMoreButton.addEventListener("click", async () => {
    hideMoreButton();
    showLoadIndicator();
    page += 1;
    queryParams.page = page;
    try {
        await fetchPhotos();
    } catch (error) {
        console.log(error);
    }
    const myImage = document.querySelector('.gallery-item');
    const buttonRect = myImage.getBoundingClientRect();
    const buttonHeight = buttonRect.height;
    window.scrollBy({
        top: buttonHeight*2,
        behavior: 'smooth',
    });
});

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    cleanScreen();
    hideMoreButton();
    const adjastedValue = searchValue.value.trim();
    if (adjastedValue.length === 0) {
        iziToast.error({
            title: 'Error',
            position: 'topCenter',
            message: "Sorry, Please choose a topic."
         });
        return;
    }
    showLoadIndicator();
    queryParams.q = adjastedValue;
    fetchPhotos();
    searchValue.value = '';
});

let hitsPerPage = 40;
let page = 1;
let totalPages = 0;
let gallery = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: 'alt', close: true, className: 'modal-style' });
gallery.on('show.simplelightbox', function () {});
axios.defaults.baseURL = 'https://pixabay.com/api';
const myAPI_KEY = '41618210-7d4eb9e03ab25b6c1f3452a1d';
const queryParams = {
    key: myAPI_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: hitsPerPage,
    page: page,
};

async function fetchPhotos() {
    showLoadIndicator();
    hideMoreButton()

    try {
        queryParams.page = page;
        const response = await axios.get('/', { params: queryParams });
        const { totalHits, hits } = response.data;
        totalPages = Math.ceil(totalHits/ hitsPerPage);

        if (hits.length === 0) {
            iziToast.error({
                title: 'Error',
                position: 'topCenter',
                message: "Sorry, there are no images matching your search query. Please try again!"
            });
            return console.log(response.data);
        }

        let renderImages = hits.reduce(
            (html, image) =>
                html +
                `<li class="gallery-item">
                        <a class="gallery-link" href="${image.largeImageURL}">
                            <img class="gallery-image" data-source="${image.largeImageURL}" src="${image.webformatURL}" alt="${image.tags}" width="360" height="200"/>
                        </a>
                        <div class='title'>
                            <p>Likes:<span class="value">${image.likes}</span></p>
                            <p>Views:<span class="value">${image.views}</span></p>
                            <p>Comments:<span class="value">${image.comments}</span></p>
                            <p>Downloads:<span class="value">${image.downloads}</span></p>
                        </div>
                </li>`,
            '');
        galleryTile.insertAdjacentHTML("beforeend", renderImages);
        gallery.refresh();
        hideLoadIndicator();
        if (page >= totalPages) {
            iziToast.info({
                position: "topCenter",
                message: "We're sorry, there are no more posts to load"
            });
        }
        else {
            showMoreButton();
        }
    } catch (error) {
        console.error(error);
    }
}

function cleanScreen() {
    galleryTile.replaceChildren();
}

function hideLoadIndicator() {
    loadIndicator .style.visibility = 'hidden';
}

function showLoadIndicator() {
    loadIndicator .style.visibility = 'visible';
}

function showMoreButton() {
    loadMoreButton.style.visibility = 'visible';
}

function hideMoreButton() {
    loadMoreButton.style.visibility = 'hidden';
}






















