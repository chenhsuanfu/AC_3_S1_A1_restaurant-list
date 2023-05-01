
const express = require('express')
const session = require('express-session')
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
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)



// star and listen on the express server
// 開始監聽express server
app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`)
})
