const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Welcome Tasacion Lab PDF Generator API' })
})

module.exports = router
