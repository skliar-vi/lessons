/*
1. Give integer number, return if leap year true and if not - false
2. If give wrong number throw error with specific message

2008 - true
2003 - false
1900 - false
2000 - true

41 - error 'Year must be 42 and more'
2008.4 - error 'Year must be integer'
false - error 'Year must be integer'
() - error 'Year must be exists'
'2008' - error 'Year must be integer' 
true - error 'Year must be integer'
null - error 'Year must be integer'
()=>{} error 'Year must be integer'
{} - error 'Year must be integer'
[] - error 'Year must be integer'
*/

const isLeapYear = require('./isLeapYear')

describe("test isLeapYear function", () => {
    test("2008 - true", () => {
        const result = isLeapYear(2008);
        expect(result).toBe(true);
        /*
        const expect = result => {
            return {
                result,
                toBe(value) => {
                    return this.result === value;
                }
            }
        }
        */
    })
    it('2003 - false', () => {
        expect(isLeapYear(2003)).toBe(false)
    })
    it('1900 - false', () => {
        expect(isLeapYear(1900)).toBe(false)
    })
    it('2000 - true', () => {
        expect(isLeapYear(2000)).toBe(true)
    })

    test("41 - error 'Year must be 42 and more'", () => {
        expect(() => isLeapYear(41)).toThrow('Year must be 42 and more');
    })

    test("2008.4 - error 'Year must be integer'", () => {
        expect(() => isLeapYear(2008.4)).toThrow('Year must be integer');
    })

    test("false - error 'Year must be integer'", () => {
        expect(() => isLeapYear(false)).toThrow('Year must be integer')
    })

    test("() - error 'Year must be exists'", () => {
        expect(() => isLeapYear()).toThrow('Year must be exists')
    })

    test("'2008' - error 'Year must be integer'", () => {
        expect(() => isLeapYear('2008')).toThrow('Year must be integer')
    })

    test("true - error 'Year must be integer'", () => {
        expect(() => isLeapYear(true)).toThrow('Year must be integer')
    })

    test("null - error 'Year must be integer'", () => {
        expect(() => isLeapYear(null)).toThrow('Year must be integer')
    })

    test("()=>{} error 'Year must be integer'", () => {
        expect(() => isLeapYear(() => { })).toThrow('Year must be integer')
    })

    test("{} - error 'Year must be integer'", () => {
        expect(() => isLeapYear({})).toThrow('Year must be integer')
    })

    test("[] - error 'Year must be integer'", () => {
        expect(() => isLeapYear([])).toThrow('Year must be integer')
    })
})