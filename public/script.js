const mp = document.getElementById("root");

const inpName = document.createElement("input");
inpName.type = "text";
inpName.placeholder = "item name";

const btnPostNewItem = document.createElement("button");
btnPostNewItem.type = "button";
btnPostNewItem.innerText = "Add New Item";
btnPostNewItem.addEventListener(
    "click",
    async (event) => {
        const response = await fetch("/api/items", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({name : inpName.value})
        });
        console.dir(response);
    }
);


const btnGetAllItems = document.createElement("button");
btnGetAllItems.type = "button";
btnGetAllItems.innerText = "Get All Items";
btnGetAllItems.addEventListener(
    "click",
    async (event) => {
        const response = await fetch("/api/items");
        //const data = await response.json();
        const dataText = await response.text();
        const res = document.createElement("span");
        res.innerText = dataText;
        mp.appendChild(res);
        //console.dir(data);  
    }
);


mp.appendChild(inpName);
mp.appendChild(btnPostNewItem);
mp.appendChild(btnGetAllItems);


