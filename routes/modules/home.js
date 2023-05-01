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

// 搜尋特定的餐廳
router.get('/search', (req, res) => {
    const keywords = req.query.keyword.trim().toLowerCase()
    RL.find()
        .lean()
        .then(RL_data => {
            const filterRLname = RL_data.filter(
                data => 
                    data.name.trim().toLowerCase().includes(keywords) ||
                    data.name_en.trim().toLowerCase().includes(keywords) ||
                    data.category.trim().toLowerCase().includes(keywords)
            )
            res.render('index', { RL_data: filterRLname, keywords})
        })
        .catch(error => console.log(error))
    
  })

module.exports = router