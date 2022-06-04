
//require packages used in the project
//載入express
const express = require('express')
const app = express()
const port = 3000

//require package used in the project
//設定express-handlebars樣版引擎
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
//透過app.engine定義要使用的樣板引擎
//透過app.set告訴express說要設定的view engine是handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//setting static files 
//設定express路由以提供靜態檔案
app.use(express.static('public'))

//routes setting
//設定路由
//res.render意指解析HTML樣板並繪製出瀏覽器的畫面，express會回傳HTML來呈現前端樣板
app.get('/', (req, res)=>{  
    res.render('index',{ restaurant: restaurantList.results })
})
// 因為params宣告為restaurants
app.get('/restaurants/:restaurant_id', (req, res) => {
    //console.log('req.parms.restaurant_id', req.params.restaurant_id)
    const restaurantOne = restaurantList.results.find(restaurant => 
        restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurantOne })
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

// star and listen on the express server
// 開始監聽express server
app.listen(port, ()=>{
    console.log(`Express is listening on localhost:${port}`)
})
