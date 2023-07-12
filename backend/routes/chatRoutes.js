const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addToGroupChat,
  removeFromGroupChat,
  deleteChat,
} = require('../controllers/chatControllers')

const router = express.Router()

router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroupChat)
router.route('/groupadd').put(protect, addToGroupChat)
router.route('/groupremove').put(protect, removeFromGroupChat)
router.route('/deletechat').delete(protect, deleteChat)

module.exports = router
