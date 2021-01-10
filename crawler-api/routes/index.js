const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const resources = [
        {
            method: "GET",
            links: {
                self: "/rooms"
            },
            attibutes: [
                {
                    name: 'checkIn',
                    type: 'date',
                    format: 'DD/MM/YYYY',
                    required: true,
                    in: 'query'
                },
                {
                    name: 'checkOut',
                    type: 'date',
                    format: 'DD/MM/YYYY',
                    required: true,
                    in: 'query'
                }
            ]
        }
    ]
    res.json({ resources })
})

module.exports = router