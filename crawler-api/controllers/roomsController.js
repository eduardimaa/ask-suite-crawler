const scraperService = require('../services/scrapingService')
const dateUtil = require('../utils/dateUtil')

const find = async (req, res) => {
    try {

        const { checkIn, checkOut } = req.query

        if(!dateUtil.isValidPeriod(checkIn, checkOut)) return  res.status(400).json({message: `Invalid period: ${checkIn} - ${checkOut}`})

        const result = await scraperService.scraping(checkIn, checkOut)

        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.toString()})
    }
}

module.exports = {
    find
}






