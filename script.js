let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discounts')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category') 
let submit = document.getElementById('create')
let body = document.getElementById('body')
let updateDelete = document.getElementById('delete')
let tmp;
let serc = document.getElementById('serc')
let titleS = document.getElementById('titleS')
let titleC = document.getElementById('titleC')



// get total
function getTotal(){
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = 'Total:' + result;
        total.style.background = '#040'
    }else{
        total.innerHTML = 'Total:'
        total.style.background = 'crimson'
    }
}

price.addEventListener('keyup', getTotal)
taxes.addEventListener('keyup', getTotal)
ads.addEventListener('keyup', getTotal)
discount.addEventListener('keyup', getTotal)



// create product

let dataPro = [];
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
submit.addEventListener('click', ()=>{
    if(total.value != '' && title.value != '' && category.value != ''){
        let newProduct ={
            title: title.value.toLowerCase(),
            category: category.value.toLowerCase(),
            price:price.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            taxes:taxes.value
        }
        if(submit.innerHTML == 'Create'){
            if(newProduct.count > 1){
                for (let i = 0; i < newProduct.count; i++) {
                    dataPro.push(newProduct)
                }
            }else{
                dataPro.push(newProduct)
            }
            let datas = dataPro.length 
            updateDelete.innerHTML= 'Delete All ' + (datas)
            localStorage.setItem('product' , JSON.stringify(dataPro))
         clear()
         showData()
        }else if(submit.innerHTML != 'create'){
            dataPro[tmp] = newProduct
            count.style.display = 'block'
            submit.innerHTML = 'Create'

        }
    }
    clear()
    showData()
})


//clear data

function clear(){
    title.value = ""
    category.value = ""
    price.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = 'Total:'
    total.style.background = 'crimson'
    count.value =""
    taxes.value = ""
}



// show data 

    function showData(){

        let container = ""

        for (let i = 0 ; i< dataPro.length ; i++){
            container += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updates(${i})" id="update">update</button></td>
            <td><button onclick ="deletedata(${i})" id="deletes">delete</button></td>
            <tr>
            `
        }
        document.getElementById('body').innerHTML = container
    }
    showData()


    // delete data


    function deletedata(i){
        dataPro.splice(i,1)
        localStorage.product = JSON.stringify(dataPro)
        let datas = dataPro.length 
        updateDelete.innerHTML= 'Delete All ' + datas
        showData()
    }

 // delete all

 
    function deleteAll(){
        localStorage.clear()
        dataPro.splice(0)
        let datas = dataPro.length 
        updateDelete.innerHTML= 'Delete All'
        showData()
    }
    updateDelete.addEventListener('click', deleteAll)

    // update 

    function updates(i){
        title.value = dataPro[i].title
        category.value = dataPro[i].category
        price.value = dataPro[i].price
        discount.value = dataPro[i].discount
        taxes.value = dataPro[i].taxes
        ads.value = dataPro[i].ads
        getTotal()
        count.style.display = 'none'
        submit.innerHTML = 'update'
        tmp = i
        scroll({
            top:0,
            behavior:"smooth"            
        })
    }


    // search 

    

    function searchData(){
        let data = document.getElementById('serc').value 
        let container = ''
        for (let i = 0; i < dataPro.length; i++) {
           
           if(dataPro[i].title.includes(data.toLowerCase())){
            container += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updates(${i})" id="update">update</button></td>
            <td><button onclick ="deletedata(${i})" id="deletes">delete</button></td>
            <tr>
            `
           }else if(dataPro[i].category.includes(data.toLowerCase())){
            container += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updates(${i})" id="update">update</button></td>
            <td><button onclick ="deletedata(${i})" id="deletes">delete</button></td>
            <tr>`
           }
        }
        document.getElementById('body').innerHTML = container
    }
    serc.addEventListener('keyup',searchData )

    function searchBtnsT(){
        serc.focus()
        serc.setAttribute('placeholder', 'search by title')
    }

    function searchBtnsC(){
        serc.focus()
        serc.setAttribute('placeholder', 'search by Category')
    }

    titleS.addEventListener('click' , searchBtnsT)
    titleC.addEventListener('click' , searchBtnsC)