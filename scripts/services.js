"use strict";
const baseURL = `http://localhost:1337`;
const categoriesAPI = `${baseURL}/categories`;
const dishesAPI = `${baseURL}/dishes`;
const ordersAPI = `${baseURL}/orders`;

const getCategories = () => {
    showLoading();
    fetch(categoriesAPI)
        .then(response => response.json())
        .then(categories => {
            for (let category of categories) {
                if (categoriesContainer)
                    categoriesContainer.append(createCategoryHTML(category));
            }
            hideLoading();
        })
        .catch(error => {
            console.error(error);
            hideLoading();
        });
};

const getDishes = category => {
    showLoading();
    const dishContainer = document.querySelector("#dish-container");
    fetch(dishesAPI)
        .then(response => response.json())
        .then(dishes => {
            // console.log(dishes);
            let newDishes = dishes.filter(dish => dish.category === category);

            for (let dish of newDishes) {
                console.log(dish);
                dishContainer.append(createDishesListing(dish));
            }
            const orderButtons = Array.from(
                document.querySelectorAll(".addToCartBtn")
            );
            orderButtons.forEach(button => {
                button.addEventListener("click", getOrderDetails);
            });
            hideLoading();
        })
        .catch(error => {
            console.error(error);
            hideLoading();
        });
};

const submitOrder = orderDetail => {
    showLoading();
    fetch(ordersAPI, { method: "POST", body: JSON.stringify(orderDetail) })
        .then(response => response.json())
        .then(response => {
            if (response.id) alert("Order Placed Successfully");
            hideLoading();
        })
        .catch(error => {
            console.error(error);
            hideLoading();
        });
};

const getOrders = () => {
    showLoading();
    const orderTable = document.querySelector("#order-table");

    fetch(ordersAPI)
        .then(response => response.json())
        .then(orders => {
            orders.forEach((order, index) => {
                orderTable.append(createTableHTML(order, index));
            });
        })
        .catch(error => {
            console.error(error);
            hideLoading();
        });
};
