
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const RL = require('../RL')
const restaurant_list = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
    console.log('mongodb connected!')
    RL.create(restaurant_list)
    console.log('done')
})