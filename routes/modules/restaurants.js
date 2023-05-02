const express = require('express')
const router = express.Router()
const RL = require('../../models/RL')

// 新增餐廳
router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
    return RL.create( {name, name_en, category, image, location, phone, google_map, rating, description, userId} )
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 瀏覽特定頁面
router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return RL.findById({ _id, userId })
        .lean()
        .then((restaurants) => res.render('show', {restaurants}))
        .catch(error => console.log(error))
})

// 編輯頁面
router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return RL.findById({ _id, userId })
        .lean()
        .then((restaurants) => res.render('edit', {restaurants}))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    
    RL.findByIdAndUpdate({_id, userId}, req.body)
        .then(()=> res.redirect(`/restaurants/${_id}`))
        .catch(error => console.log(error))
})

// 刪除特定頁面
router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    return RL.findByIdAndDelete({ _id, userId })
        .then(()=> res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router