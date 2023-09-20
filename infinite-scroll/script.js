const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let photosArray = [];
let imagesLoaded = 0;
let totalImagages = 0;

// unsplash api 
const count = 30;
const apiKey = 'Em9IO_l-w4yIeMaPSkjTTWXwlag8j8dChyiXPxGKpA0';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImagages) {
        ready = true;
    };
};

// helper function 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
};
// create elements for links and photos, add to DOM

function displayPhotos() {
    totalImagages = photosArray.length;

    photosArray.forEach((photos) => {
        // create <a> to link unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photos.links.html,
            target: '_blank',
        });
        // create <img> for photo 

        const img = document.createElement('img');

        setAttributes(img, {
            src: photos.urls.regular,
            alt: photos.alt_description,
            title: photos.alt_description,
        });

        // check when each is finished laoding 

        img.addEventListener('load', imageLoaded);

        // put img inside a and put both inside container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//  get photos from unsplash api 

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {

    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos()
    }
});

// on load 
getPhotos();

