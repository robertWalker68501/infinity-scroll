const imageContainer = document.getElementById("image-container");
const loadingSpinner = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const numberOfImages = 30;
const apiKey = "FlYFzKFjELKa-M8A-GnR6mTIBq1yFdR2pJxSYvWCQgs";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfImages}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready = true;
    loadingSpinner.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Create <a> to link Unsplash
    const item = document.createElement("a");
    setAttributes(item, {href: photo.links.html, target: "_blank",});

    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    if(!photo.description) {
      setAttributes(img, {alt: "No description for this image", title: "No description for this image"});
    } else {
      setAttributes(img, {alt: photo.description, title: photo.description});
    }

    // Event listener, check to see when each photo has loaded
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotosFromUnsplash() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
  }
}

// check to see if scrolling is near the bottom of the page, load more photos
window.addEventListener("scroll", () =>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotosFromUnsplash();
  }
})

// On load
getPhotosFromUnsplash();