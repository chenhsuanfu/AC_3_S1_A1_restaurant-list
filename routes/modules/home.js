const express = require('express')
const router = express.Router()
const RL = require('../../models/RL')

// 瀏覽全部的餐廳
router.get('/', (req, res)=>{
    const userId = req.user._id  
    RL.find({ userId })
        .lean()
        .then( restaurants => res.render('index',{ restaurants }))
        .catch( error => console.error(error))
})

// 搜尋特定的餐廳
router.get('/search', (req, res) => {
    const keywords = req.query.keyword.trim().toLowerCase()
    RL.find()
        .lean()
        .then(restaurants => {
            const filterRLname = restaurants.filter(
                data => 
                    data.name.trim().toLowerCase().includes(keywords) ||
                    data.name_en.trim().toLowerCase().includes(keywords) ||
                    data.category.trim().toLowerCase().includes(keywords)
            )
            res.render('index', { restaurants: filterRLname, keywords})
        })
        .catch(error => console.log(error))
    
  })

module.exports = router