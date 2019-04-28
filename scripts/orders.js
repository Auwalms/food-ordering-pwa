"use script";

window.onload = () => getOrders();

const createTableHTML = (orderData, index) => {
    const tr = document.createElement("tr");
    const serialTd = document.createElement("td");
    serialTd.innerText = `${index + 1}`;
    const nameTd = document.createElement("td");
    nameTd.innerText = orderData.name;
    const priceTd = document.createElement("td");
    priceTd.innerText = `₦${orderData.price}`;
    const statusTd = document.createElement("td");
    statusTd.innerText = "😂😂";

    tr.appendChild(serialTd);
    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(statusTd);

    return tr;
};
