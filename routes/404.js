const express = require('express')

const router = express.Router()

// error router
router.get('*', (req, res) => {
  res.render('partials/404.ejs')
})

module.exports = router
