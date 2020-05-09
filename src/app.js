const path = require('path')
const express = require('express')
const yargs = require('yargs')
const hbs = require('hbs')
const getDetails = require('./utils/getDetails')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const hbsPath = path.join(__dirname , "../templates/partials")

app.set("view engine","hbs")
app.set("views" ,viewsPath )
hbs.registerPartials(hbsPath)

app.use(express.static(publicDirPath))


app.get('',(req,res) => {
    res.render('index')
})

app.get('/about',(req,res) => {
    res.render('about')
})

app.get('/search',(req,res) => {
    res.render('search')
})

app.get('/searchproduct' , (req,res) => {
    
    const requests = req.query
    
    getDetails(requests,(error,data) => {
    
        if(error) {
            res.send(
                {
                    error : error
                }
            )
        }
        res.send(data)
    })
})

app.get('*',(req,res) => {
    res.render('404')
})

yargs.parse()

app.listen(port,() => {
    console.log("server started at port 3000")
})