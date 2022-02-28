let inputTitle = document.getElementById("inputTitle");
let inputPrice = document.getElementById("PriceInput");
let inputTaxes = document.getElementById("inputTaxes");
let inputAds = document.getElementById("inputAds");
let inputDisc = document.getElementById("inputDisc");
let ProdctTotal = document.getElementById("ProdctTotal");
let inputCount = document.getElementById("inputCount");
let inputCate = document.getElementById("inputCate");
let searchInput = document.getElementById("searchInput");
let createProduct = document.getElementById("createProduct");
let deleteAll = document.getElementById("deleteAll");
let tableRow = document.getElementById("tableRow");
let productContainer ;
let mood = 'Create Product';
let temp;
if(localStorage.getItem("newProduct") != null ){
    productContainer = JSON.parse(localStorage.getItem("newProduct"));
    readProduct(productContainer);
} else {
    productContainer = [];
}

// git Total
function getTotal()
{
    if(inputPrice.value !=""){
        let result = (+inputPrice.value + +inputTaxes.value + +inputAds.value) - +inputDisc.value;
        ProdctTotal.innerHTML = result;
        ProdctTotal.style.backgroundColor = "#040";
    }
    else{
        ProdctTotal.innerHTML = " ";
        ProdctTotal.style.backgroundColor = "brown";
    }
}

createProduct.addEventListener("click" , function(){

    let products = {
        title:inputTitle.value,
        price:inputPrice.value,
        taxes:inputTaxes.value,
        ads:inputAds.value,
        desc:inputDisc.value,
        total:ProdctTotal.innerHTML,
        count:inputCount.value,
        categ:inputCate.value
    }
    if(mood === 'Create Product'){
        productContainer.push(products);
    }else{
        productContainer [temp] = products;
        mood = "Create Product";
        inputCount.style.display = "flex";
        createProduct.innerHTML = 'Create Product';
    }
    if(products.count > 1){
        for(let i = 0 ; i < products.count ; i++){
            productContainer.push(products);
        }
    } else{
        productContainer.push(products);
    }
    
    //console.log(products);
    readProduct(productContainer);
    localStorage.setItem("newProduct" , JSON.stringify(productContainer))
})

function readProduct(listOfProducts)
{
    let productList = ``;
    for(let i = 0 ; i < listOfProducts.length; i++){
        productList+= `
        <tr>
                <td>${i}</td>
                <td>${listOfProducts[i].title}</td>
                <td>${listOfProducts[i].price}</td>
                <td>${listOfProducts[i].taxes}</td>
                <td>${listOfProducts[i].ads}</td>
                <td>${listOfProducts[i].desc}</td>
                <td>${listOfProducts[i].total}</td>
                <td>${listOfProducts[i].categ}</td>
                <td class="btn-danger" onclick="updateProduct(${i})" id="updatePro">Update</td>
                <td class="btn-info" onclick="deleteProduct(${i})" id="deletePro">Delete</td>
            </tr> `;
    }
    tableRow.innerHTML = productList ;
}

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("newProduct" , JSON.stringify(productContainer));
    readProduct(productContainer);
}


deleteAll.addEventListener("click" , function(){
    productContainer = [];
    localStorage.setItem("newProduct" , JSON.stringify(productContainer));
    readProduct(productContainer);
})

function searchProducts(term)
{
    let searchProducts = [];
    for(let i = 0 ; i < productContainer.length ; i++)
    {
        if(productContainer[i].title.toLowerCase().includes(term.toLowerCase()) == true){
            searchProducts.push(productContainer[i])
        }
    }
    readProduct(searchProducts);
}

function updateProduct(i){
    inputTitle.value = productContainer[i].title;
    inputPrice.value = productContainer[i].price;
    inputTaxes.value = productContainer[i].taxes;
    inputAds.value = productContainer[i].ads;
    inputCate.value = productContainer[i].categ;
    inputDisc.value = productContainer[i].desc;
    getTotal();
    createProduct.innerHTML = "Update Product";
    inputCount.style.display = "none";
    mood = "Update Product";
    temp = i;
}