"use strict";

const categoriesContainer = document.querySelector("#categories-container");

window.addEventListener("DOMContentLoaded", event => {
    getCategories();
});

const createCategoryHTML = category => {
    const categoryPath = document.createElement("a");
    categoryPath.classList.add("col-md-6", "col-lg-4", "category");
    categoryPath.href = `${category.path}.html`;
    categoryPath.dataset.id = category.id;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-light", "text-dark", "text-uppercase");

    const categoryImage = document.createElement("img");
    categoryImage.src = category.imageUrl;
    categoryImage.className = "card-img";
    categoryImage.alt = `An Image of ${category.name}`;

    const imageOverlayDiv = document.createElement("div");
    imageOverlayDiv.className = "card-img-overlay";

    const imageTitle = document.createElement("h5");
    imageTitle.className = "card-title";
    imageTitle.innerText = category.name;

    imageOverlayDiv.appendChild(imageTitle);
    cardDiv.appendChild(categoryImage);
    cardDiv.appendChild(imageOverlayDiv);
    categoryPath.appendChild(cardDiv);

    return categoryPath;
};
