const express = require('express')
const router = express.Router()
const RL = require('../../models/RL')

// 新增餐廳
router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    RL.create( req.body )
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 瀏覽特定頁面
router.get('/:id', (req, res) => {
    const id = req.params.id
    return RL.findById(id)
        .lean()
        .then((RL_data) => res.render('show', {RL_data}))
        .catch(error => console.log(error))
})

// 編輯頁面
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return RL.findById(id)
        .lean()
        .then((RL_data) => res.render('edit', {RL_data}))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    RL.findByIdAndUpdate(id, req.body)
        .then(()=> res.redirect(`/RL_data/${id}`))
        .catch(error => console.log(error))
})

// 刪除特定頁面
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return RL.findByIdAndDelete(id)
        .then(()=> res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router