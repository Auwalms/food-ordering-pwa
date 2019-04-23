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

const getCategories = () => {
    categoriesRef
        .get()
        .then(categories => {
            for (let category of categories.docs) {
                categoriesContainer.append(createCategoryHTML(category.data()));
            }
        })
        .catch(error => {
            console.error(error);
        });
};
