const request = require("request")

const getDetails = (requests,callback) =>
{
    const keys = Object.keys(requests)
    const values = Object.values(requests)
    let a = ""
    for(var i = 0;i < keys.length;i++)
    {
        a += keys[i] + "=" + values[i] + "&"
    }
    a = a.substring(0,a.length-1)

    const url = "http://makeup-api.herokuapp.com/api/v1/products.json?"+a

    let result_arr = []

    request({url , json : true} ,(error,response) => {

        if(!error) {

            if(response.body.length === 0) {
                return callback("Unable to find the product..Please search again with other search strings")
            }
            else {
                const product_list = response.body

                product_list.forEach((product) => {
                    const pro = {
                        brand : product.brand,
                        name : product.name,
                        price : product.price,
                        productlink : product.link,
                        description : product.description,
                        rating : product.rating,
                        image : product.image_link
                    }
                    result_arr.push(pro)
                })
                callback(undefined,result_arr) 
            }
    }
    else {
        callback("Unable to connect to the network",undefined)
    }
        })
}

module.exports = getDetails