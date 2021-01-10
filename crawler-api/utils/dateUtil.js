
const now = () => {
    let now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    return now
}

/**
 * @param {string} startDate Data no formato DD/MM/YYYY.
 * @param {string} endDate Data no formato DD/MM/YYYY.
 * @returns {boolean}
*/
const isValidPeriod = (startDate, endDate) => {

    const getObjectDate = dateToParse => {
        dateToParse = dateToParse.split('/')
        const year = dateToParse[2]
        const month = (dateToParse[1] - 1)
        const day = dateToParse[0]
        return new Date(year, month, day, 0, 0, 0, 0)
    }

    startDate = getObjectDate(startDate)
    endDate = getObjectDate(endDate)

    if (startDate.getTime() < now().getTime()) return false

    return startDate.getTime() < endDate.getTime()
}

module.exports = {
    isValidPeriod,
    now
}
