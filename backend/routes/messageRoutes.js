const express = require('express')
const router = require('./chatRoutes')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

// router.route("/").post(protect, sendMessage)
// router.route("/:chatId").get(protect, allMessages)

module.exports = router
