const express = require('express')
const router = express.Router()
const RL = require('../../models/RL')

// 瀏覽全部的餐廳
router.get('/', (req, res)=>{  
    RL.find()
        .lean()
        .then( RL_data => res.render('index',{ RL_data }))
        .catch( error => console.error(error))
})


module.exports = router