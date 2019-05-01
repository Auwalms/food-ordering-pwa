"use strict";
const title = window.location.pathname
    .split("/")
    .pop()
    .split(".")[0];
const dishId = window.location.search.split("=").pop();

window.addEventListener("DOMContentLoaded", () => {
    switch (dishId) {
        case "1":
            showDishContent("rice");
            break;
        case "2":
            showDishContent("snack");
            break;
        case "3":
            showDishContent("soup");
            break;
        case "4":
            showDishContent("swallow");
            break;
        case "5":
            showDishContent("stew");
            break;
        case "6":
            showDishContent("drink");
            break;

        default:
            window.location.href = "/";
            break;
    }
});

const showDishContent = dishType => {
    document.querySelector("#page-title").innerText = `${dishType} Listings`;
    getDishes(dishType);
};

const createDishesListing = dish => {
    const dishDiv = document.createElement("div");
    dishDiv.classList.add("col-md-6", "col-lg-4", "dish");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "bg-light", "text-dark", "text-uppercase");

    const dishImage = document.createElement("img");
    dishImage.src = dish.photoUrl;
    dishImage.className = "card-img";
    dishImage.alt = `An Image of ${dish.name}`;

    const imageOverlayDiv = document.createElement("div");
    imageOverlayDiv.className = "card-img-overlay";

    const imageTitle = document.createElement("h5");
    imageTitle.className = "card-title";
    imageTitle.innerText = dish.name;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const priceContainer = document.createElement("h5");
    priceContainer.className = "price-container";

    const priceSpan = document.createElement("span");
    priceSpan.className = "dish-price";
    priceSpan.innerText = `₦${dish.price}`;

    const addToCartSpan = document.createElement("span");
    addToCartSpan.className = "float-right";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute("type", "button");
    addToCartBtn.classList.add("btn", "btn-success", "addToCartBtn");
    addToCartBtn.dataset.id = dish.id;
    addToCartBtn.dataset.name = dish.name;
    addToCartBtn.dataset.price = dish.price;
    addToCartBtn.innerHTML = "Order";

    imageOverlayDiv.appendChild(imageTitle);
    priceContainer.appendChild(priceSpan);
    addToCartSpan.appendChild(addToCartBtn);
    cardFooter.appendChild(priceContainer);
    cardFooter.appendChild(addToCartSpan);

    cardDiv.appendChild(dishImage);
    cardDiv.appendChild(imageOverlayDiv);
    cardDiv.appendChild(cardFooter);
    dishDiv.appendChild(cardDiv);

    return dishDiv;
};
const getOrderDetails = event => {
    const targetItem = event.target.dataset;
    const order = {};
    order.price = parseInt(targetItem.price);
    order.id = targetItem.id;
    order.name = targetItem.name;
    submitOrder(order);
};
