let title = document.getElementById("title");
let price =document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode="create";
let temp;
// get total 
onload=getTotal();
function getTotal(){
    total.innerHTML=0;
    if(price.value !=""){
        let result =+price.value + +taxes.value + +ads.value ;
        if(+discount.value >=0){
            result-=discount.value;
        }
        total.innerHTML =result;
        total.style.background ="var(--main-dark-color)";
    }else{
        total.style.background ="var(--inputs-dark-color)";
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
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };
    // count of products
    if(title.value != '' &&price.value != '' &&category.value !='' &&newProduct.count <= 100){
        if (mode ==="create"){
            if(newProduct.count > 1){
                for(let i=0;i< newProduct.count;i++){
                    productsArr.push(newProduct);            
                }
            }else{
                productsArr.push(newProduct); 
            }
        }else{
            productsArr[temp]=newProduct;
            mode="create";
            submit.innerHTML="create";
            count.style.display="inline-block";
            category.style.width="49%";
        }
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(productsArr));

    showData();
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
function showData() {
    let table ="";
    for(let i = 0; i < productsArr.length; i++){
        table +=`<tr>
                    <td>${i+1}</td>
                    <td>${productsArr[i].title}</td>
                    <td>${productsArr[i].price}</td>
                    <td>${productsArr[i].taxes}</td>
                    <td>${productsArr[i].ads}</td>
                    <td>${productsArr[i].discount}</td>
                    <td>${productsArr[i].total }</td>
                    <td>${productsArr[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDelete =document.getElementById("deleteAll")
    if(productsArr.length > 0){
        btnDelete.innerHTML=`
        <button onclick="deleteAll()">Delete All (${productsArr.length})</button>
        `;
    }else{
        btnDelete.innerHTML="";
    }
    getTotal();
}
showData(); 

// delete
function deleteData(i){
    productsArr.splice(i,1);
    localStorage.product = JSON.stringify(productsArr);
    showData();
}
function deleteAll(){
    productsArr=[];
    localStorage.clear();
    showData();
}
// update
function updateData(i){
    title.value = productsArr[i].title;
    price.value = productsArr[i].price;
    taxes.value = productsArr[i].taxes;
    ads.value = productsArr[i].ads;
    discount.value = productsArr[i].discount;
    getTotal();
    count.style.display="none";
    category.style.width="100%";
    submit.innerHTML="Update";
    category.value = productsArr[i].category;
    mode="update"
    temp=i;
    scrollTo({
        top:0,
        behavior:"smooth"
    });
}
// search
let searchMode="title" ;

function getSearchMode(id){
    let search = document.getElementById("search");
    id =="titleSearch"?searchMode="title":searchMode="category";
    search.focus();
    search.value="";
    showData();
    // search.placeholder = id;
    search.placeholder=`search by ${searchMode}`;
}
function searchData(value){
    let table =" ";
    value = value.toLowerCase();
    if(searchMode ==="title"){
        for(let i=0 ; i<productsArr.length ;i++){
            if (productsArr[i].title.includes(value)){
                table += `<tr>
                    <td>${i}</td>
                    <td>${productsArr[i].title}</td>
                    <td>${productsArr[i].price}</td>
                    <td>${productsArr[i].taxes}</td>
                    <td>${productsArr[i].ads}</td>
                    <td>${productsArr[i].discount}</td>
                    <td>${productsArr[i].total}</td>
                    <td>${productsArr[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
            }
        }else{
            for(let i=0 ; i<productsArr.length ;i++){
            if(productsArr[i].category.includes(value)){
                table += `<tr>
                    <td>${i}</td>
                    <td>${productsArr[i].title}</td>
                    <td>${productsArr[i].price}</td>
                    <td>${productsArr[i].taxes}</td>
                    <td>${productsArr[i].ads}</td>
                    <td>${productsArr[i].discount}</td>
                    <td>${productsArr[i].total}</td>
                    <td>${productsArr[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
            }
        }
    document.getElementById("tbody").innerHTML = table;
    }

// clean input data