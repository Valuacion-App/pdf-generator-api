const { Router } = require('express')
const router = Router()

router.get('/pdf', (req, res) => {
  res.json({ message: 'Welcome to PDF Generator' })
})

module.exports = router
