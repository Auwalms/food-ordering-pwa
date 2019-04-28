"use strict";
const config = {
    apiKey: "AIzaSyBcd5WmLL4Bwyh1cj0zkbHcBp8LZLg_rMY",
    authDomain: "auwsum-kitchen.firebaseapp.com",
    databaseURL: "https://auwsum-kitchen.firebaseio.com",
    projectId: "auwsum-kitchen",
    storageBucket: "auwsum-kitchen.appspot.com",
    messagingSenderId: "1042406491213"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const categoriesRef = db.collection("categories");
const ordersRef = db.collection("orders");

const getCategories = () => {
    showLoading();
    categoriesRef
        .get()
        .then(categories => {
            for (let category of categories.docs) {
                if (categoriesContainer)
                    categoriesContainer.append(
                        createCategoryHTML(category.data())
                    );
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
    const DishesRef = db.collection(`${category}-dishes`);
    DishesRef.get()
        .then(dishes => {
            showLoading();
            for (let dish of dishes.docs) {
                dishContainer.append(createDishesListing(dish.data()));
            }
            const orderButtons = Array.from(
                document.querySelectorAll(".addToCartBtn")
            );
            orderButtons.forEach(button => {
                button.addEventListener("click", getOrderDetails);
            });
        })
        .catch(error => {
            hideLoading();
            console.error(error);
        });
};

const submitOrder = orderDetail => {
    showLoading();
    ordersRef
        .add(orderDetail)
        .then(function(docRef) {
            hideLoading();
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            hideLoading();
            console.error("Error adding document: ", error);
        });
};

const getOrders = () => {
    showLoading();
    const orderTable = document.querySelector("#order-table");
    ordersRef
        .get()
        .then(orders => {
            hideLoading();
            orders.docs.forEach((order, index) => {
                orderTable.append(createTableHTML(order.data(), index));
                console.log(order.data());
            });
        })
        .catch(error => {
            hideLoading();
            console.error(error);
        });
};
