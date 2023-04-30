
const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose') // 載入 mongoose
const RL = require('./models/RL')

const bodyParser = require('body-parser')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
const db = mongoose.connection // 取得資料庫連線狀態
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 瀏覽全部的餐廳
app.get('/', (req, res)=>{  
    RL.find()
        .lean()
        .then( RL_data => res.render('index',{ RL_data }))
        .catch( error => console.error(error))
})


app.get('/search', (req, res)=>{
    //console.log('req.query', req.query)
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant =>{
        return restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword) ||
        restaurant.name_en.toLowerCase().includes(keyword)
    })
   
    res.render('index', { restaurant: restaurants, keyword: keyword })
    
})

// 新增餐廳
app.get('/RL_data/new', (req, res) => {
    return res.render('new')
})

app.post('/RL_data', (req, res) => {
    RL.create( req.body )
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 瀏覽特定頁面
app.get('/RL_data/:id', (req, res) => {
    const id = req.params.id
    return RL.findById(id)
        .lean()
        .then((RL_data) => res.render('show', {RL_data}))
        .catch(error => console.log(error))
})

// 編輯頁面
app.get('/RL_data/:id/edit', (req, res) => {
    const id = req.params.id
    return RL.findById(id)
        .lean()
        .then((RL_data) => res.render('edit', {RL_data}))
        .catch(error => console.log(error))
})

app.post('/RL_data/:id/edit', (req, res) => {
    const id = req.params.id
    RL.findByIdAndUpdate(id, req.body)
        .then(()=> res.redirect(`/RL_data/${id}`))
        .catch(error => console.log(error))
})

// star and listen on the express server
// 開始監聽express server
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})
