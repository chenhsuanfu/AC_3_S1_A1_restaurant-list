const mongoose = require('mongoose')
const RL = require('../RL')
const restaurant_list = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
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
    RL.create(restaurant_list)
    console.log('done')
})