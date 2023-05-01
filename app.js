
const express = require('express')
const exphbs = require('express-handlebars')
const RL = require('./models/RL')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



// 搜尋特定的餐廳
app.get('/search', (req, res)=>{
    //console.log('req.query', req.query)
    const keyword = req.query.keyword
    const restaurants = RL_data.results.filter(RL_data =>{
        return RL_data.name.toLowerCase().includes(keyword) ||
        RL_data.category.toLowerCase().includes(keyword) ||
        RL_data.name_en.toLowerCase().includes(keyword)
    })
   
    RL.find()
        .lean()
        .then(() => res.render('index', { RL_data: restaurants, keyword: keyword }))
        .catch(error => console.log(error))
})


// star and listen on the express server
// 開始監聽express server
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})
