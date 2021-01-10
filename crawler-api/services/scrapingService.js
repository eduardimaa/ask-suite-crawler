const puppeteer = require('puppeteer')

const _prepareUrl = async (checkIn, checkout, code, groupCode, loyalityCard, nRooms, ad, ch, ag) => {
    let defaultUrl = 'https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=c9b69336-3fbe-43ae-9ec8-338bb64606c0#/&diff=false&'
    //checkIn and checkOut is required
    defaultUrl = `${defaultUrl}CheckIn=${checkIn}&CheckOut=${checkout}`

    code = code ? `&Code=${code}` : '&Code='
    groupCode = groupCode ? `&group_code=${code}` : '&group_code='
    loyalityCard = loyalityCard ? `&loyality_card=${loyalityCard}` : '&loyality_card='
    nRooms = nRooms ? `&NRooms=${nRooms}` : '&NRooms='
    ad = ad ? `&ad=${ad}` : '&ad='
    ch = ch ? `&ch=${ch}` : '&ch=0'
    ag = ag ? `&ag=${ag}` : '&ag=-'

    return `${defaultUrl}${code}${groupCode}${loyalityCard}${nRooms}${ad}${ch}${ag}`
}

const scraping = async (checkIn, checkOut) => {
    checkIn =  checkIn.split('/').join('')
    checkOut =  checkOut.split('/').join('')
   
    //defautl values: nRooms:1 , ad:1, ch:0
    const url = await _prepareUrl(checkIn, checkOut, null, null, null, 1, 1, 0, null)
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })

    let result = await page.evaluate(() => {
        const selectorRowsTable = '#show_3 > table > tbody > tr.roomName'
        let result = []
        let rows = document.querySelectorAll(selectorRowsTable)

        if (!rows) return result

        rows = Array.from(document.querySelectorAll(selectorRowsTable))

        return rows.map(row => {

            const getInnerHtmlValue = (selector, row) => {
                const element = row.querySelector(selector)
                return element ? element.innerHTML : null
            }

            const getImages = row => {
                let images = row.querySelectorAll('div.roomSlider > div.slide')
                if (!images) return []
                images = Array.from(row.querySelectorAll('div.roomSlider > div.slide'))
                return images.map(image => {
                    const imageUrl = `https://myreservations.omnibees.com`
                    const imageSrc = image.querySelector('a > img').getAttribute('src')
                    return `${imageUrl}${imageSrc}`
                })
            }

            const name = getInnerHtmlValue('td > div.roomExcerpt > div.excerpt > h5 > a', row)
            const description = getInnerHtmlValue('td > div.roomExcerpt > div.excerpt > p > a', row)
            const price = getInnerHtmlValue('td > div.roomExcerpt > div.sincePrice.bestPriceBackgroundColor.bestPriceTextColor > div.sincePriceContent > h6', row)
            const images = getImages(row)

            return { name, description, price, images }
        })

    })

    await browser.close()

    return result
}

module.exports = {
    scraping
}
