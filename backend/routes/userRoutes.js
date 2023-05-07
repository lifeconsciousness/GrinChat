const express = require('express')
const { registerUser, loginUser, allUsers } = require('../controllers/userControllers')

const router = express.Router()

router.route('/').post(registerUser).get(allUsers)
router.post('/login', loginUser)

module.exports = router
