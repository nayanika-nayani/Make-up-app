const product_type = document.querySelector('#product_type')
const product_category = document.querySelector('#product_category')
const product_tags = document.querySelector('#product_tags')
const brand = document.querySelector('#brand')
const price_greater_than = document.querySelector('#price_greater_than')
const price_less_than = document.querySelector('#price_less_than')
const rating_greater_than = document.querySelector('#rating_greater_than')
const rating_less_than = document.querySelector('#rating_less_than') 
const searchForm = document.querySelector('form')   
const result = document.querySelector('#result')

searchForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const check = (selection) => {
        if(selection.value) {
            return true
        }
    }

    let a = ""
    if(check(product_type)) {
        a += product_type.name + "=" + product_type.value + "&"
    }

    if(check(product_tags)) {
        a += product_tags.name + "=" + product_tags.value + "&"
    }

    if(check(product_category)) {
        a += product_category.name + "=" + product_category.value + "&"
    }

    if(check(brand)) {
        a += brand.name + "=" + brand.value + "&"
    }

    if(check(price_greater_than)) {
        a += price_greater_than.name + "=" + price_greater_than.value + "&"
    }

    if(check(price_less_than)) {
        a += price_less_than.name + "=" + price_less_than.value + "&"
    }

    if(check(rating_greater_than)) {
        a += rating_greater_than.name + "=" + rating_greater_than.value + "&"
    }

    if(check(rating_less_than)) {
        a += rating_less_than.name + "=" + rating_less_than.value + "&"
    }

    a = a.substring(0,a.length-1)

    result.textContent = "Loading..."    

    fetch("http://localhost:3000/searchproduct?" + a).then((response) => {
        response.json().then((data) => {
            if(data.error) {
               result.textContent = data.error
            }
            else {
                const size = data.length
                let abc = "<table>"
                for(var b = 0;b < size;b++) {
                    abc += "<tr><td>"
                    abc += "<img id='res-image'src='" +data[b].image + "'></td>"
                    let keys = Object.keys(data[b])
                    let values = Object.values(data[b])
                    abc += "<td id='result-table-data'>"
                    for(var c = 0 ; c < keys.length-1 ; c++) {
                        abc += "<strong>" + keys[c] + "</strong>" + ":" + values[c] + "<br>"
                    }
                }
                result.innerHTML =abc + "</table>"
            }
        })
    })
})