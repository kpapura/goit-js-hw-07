import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
let markup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
    .join("");
  
galleryList.insertAdjacentHTML("beforeend", markup);

galleryList.addEventListener("click", openModal);

let instance;

function openModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) return;
  const options = {
    onShow: (instance) => {
      document.addEventListener("keydown", closeModal);
    },
    onClose: (instance) => {
      document.removeEventListener("keydown", closeModal);
    },
  };
  instance = basicLightbox.create(
    `<img
      class="gallery__image"
      src="${event.target.dataset.source}"
    />`,
    options
  );
  instance.show();
}

function closeModal(event) {
  console.log(event.code);
  if (event.code !== "Escape") return;
  instance.close();
}
