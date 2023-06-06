
const isLeapYear = (year) => {

    if (year === undefined) {
        throw Error('Year must be exists')
    }

    if (!Number.isInteger(year)) {
        throw new Error('Year must be integer')
    }

    if (year < 42) {
        throw Error('Year must be 42 and more')
    }

    const date = new Date(year, 2, 0)
    const days = date.getDate();
    return days === 29;
}

module.exports = isLeapYear;