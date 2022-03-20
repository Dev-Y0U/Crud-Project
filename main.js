let title = document.getElementById("title");
let price =document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// get total 
function getTotal(){
    if(price.value !=""){
        let result =+price.value + +taxes.value + +ads.value ;
        if(+discount.value >=0){
            result-=discount.value;
        }
        total.innerHTML =result;
        total.style.background ="var(--main-dark-color)";
    }else{
        total.style.background ="var(--inputs-dark-color)";
        total.innerHTML=0;
    }
}

// creat product
let productsArr;
if(localStorage.product!=null){
    productsArr =JSON.parse(localStorage.product);
}else{
    productsArr =[];
}

// save localStorage 
submit.onclick = function (){
    let newProduct={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    productsArr.push(newProduct);
    console.log(productsArr);
    localStorage.setItem("product", JSON.stringify(productsArr));

    clearData();
}
// clear inputs
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// read
// count of products
// delete
// update
// search
// clean input data