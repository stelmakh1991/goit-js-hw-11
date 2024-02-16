import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconClose from './img/iconClose.svg';
import iconSuccess from './img/iconSuccess.svg';

const galleryContainer = document.querySelector('.gallery');

const searchForm = document.querySelector('.search-form');

const loaderContainer = document.querySelector('.loader');

const GALLERY_LINK = 'gallery-link';

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const queryInput = e.target.elements.query.value.trim();

  if (queryInput === '') {
    return;
  }

  galleryContainer.innerHTML = '';
  loaderContainer.style.display = 'block';

  fetchImages(queryInput)
    .then(function ({ hits, total }) {
      if (Array.isArray(hits) && hits.length > 0) {
        const galleryHTML = hits.map(createGallery).join('');
        galleryContainer.innerHTML = galleryHTML;

        toastSuccess(`Was found: ${total} images`);

        const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);

        lightbox.refresh();
      } else {
        toastError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
    })
    .catch(function (error) {
      toastError(`Error fetching images: ${error}`);
    })
    .finally(function () {
      searchForm.reset();
      loaderContainer.style.display = 'none';
    });
});


const toastOptions = {
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  messageSize: '16px',
  position: 'topRight',
  displayMode: 'replace',
  closeOnEscape: true,
  pauseOnHover: false,
  maxWidth: 432,
  messageSize: '16px',
  messageLineHeight: '24px',
};


function toastError(message) {
  iziToast.show({
    message,
    backgroundColor: '#EF4040',
    progressBarColor: '#FFE0AC',
    iconUrl: iconClose,
    ...toastOptions,
  });
}


function toastSuccess(message) {
  iziToast.show({
    message,
    backgroundColor: '#59A10D',
    progressBarColor: '#B5EA7C',
    iconUrl: iconSuccess,
    ...toastOptions,
  });
}

const BASE_URL = 'https://pixabay.com/api/';


function fetchImages(q) {
  const searchParams = new URLSearchParams({
    key: '42384558-f7a36ff8eb6bf2b4054c0114f',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: true,
  });

  const PARAMS = `?${searchParams}`;
  const url = BASE_URL + PARAMS;

  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      toastError(`Error fetching images: ${error}`);
      throw error;
    });
}

function createGallery({
  largeImageURL,
  tags,
  webformatURL,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <a href="${largeImageURL}" class="${GALLERY_LINK}">
     <figure>
      <img src="${webformatURL}" alt="${tags}" class="gallery-image">
      <figcaption class="gallery__figcaption">
        <div class="image-item">Likes <span class="image-elem">${likes}</span></div>
        <div class="image-item">Views <span class="image-elem">${views}</span></div>
        <div class="image-item">Comments <span class="image-elem">${comments}</span></div>
        <div class="image-item">Downloads <span class="image-elem">${downloads}</span></div>
  </figcaption>
  </figure>
</a>
`;
}