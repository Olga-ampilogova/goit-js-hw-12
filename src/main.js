import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

window.scrollBy(0, window.innerHeight);
window.scrollBy(0, -window.innerHeight);

const item = document.querySelector('.gallery');
const inputValue = document.querySelector('.searchform')
const searchForm = document.querySelector('.search-form');
const loadingIndicator  = document.querySelector('.spinner');
const loadMoreButton = document.querySelector('.load_more');



let perPage = 40;
const totalPages = Math.ceil(100 / perPage);
let page = 1;
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
    per_page: perPage,
    page: page,
};

async function fetchPhotos() {
    showLoad();
    hideMoreButton()
    if (page > totalPages) {
        hideLoad();
        iziToast.error({
            position: "topCenter",
            message: "We're sorry, there are no more posts to load"
        });
        return;
    }

    try {
        const response = await axios.get('/', { params: queryParams });
        const { hits } = response.data;

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
        item.insertAdjacentHTML("beforeend", renderImages);
        gallery.refresh();
        hideLoad();
        showMoreButton();
    } catch (error) {
        console.error(error);
    }
}
loadMoreButton.addEventListener("click", async () => {
    hideMoreButton();
    showLoad();
    try {
        page += 1;
        queryParams.page = page;
        const posts = await fetchPhotos();
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
    if (inputValue.value.trim().length === 0) {
        return;
    }
    cleanScreen();
    showLoad();
    queryParams.q = inputValue.value;
    fetchPhotos();
    inputValue.value = '';
});

function cleanScreen() {
    item.replaceChildren();
}

function hideLoad() {
    loadingIndicator .style.visibility = 'hidden';
      }
function showLoad() {
    loadingIndicator .style.visibility = 'visible';
      }
function showMoreButton() {
    loadMoreButton.style.visibility = 'visible';
}

function hideMoreButton() {
    loadMoreButton.style.visibility = 'hidden';
}






















