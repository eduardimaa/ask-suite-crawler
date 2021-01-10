const express = require('express')
const router = express.Router()

const { find } = require('../controllers/roomsController')

const { validateSchema, validateSchemaResult } = require('../services/validateService')

router.get('/rooms', [validateSchema('find'), validateSchemaResult, find])

module.exports = router