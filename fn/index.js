let err_vars = `
ele_1=3
ele_4=4
discarded:incorrect
ele_3=1
foo=4
ele_6=error
ele_7=12
bar=3
ele_2=12
`

let success_vars = `
ele_1=3
ele_4=4
discarded:incorrect
ele_3=1
foo=4
ele_6=12
ele_7=12
bar=3
ele_2=12
`

let test_data = `
ELEMENT01=3
ELEMENT04=4
discarded:incorrect
ELEMENT03=1
foo=4
element06=12
ELEMENT07=12
bar=3
ELEMENT02=12
`

const readLines = (v) => v.split("\n")

const tokenize = (v) =>
    v
    |> ^.filter(v => v.indexOf("=") > -1)
    |> ^.map(v => v.split("="))

const sequence = (v) => v.reduce((curr, [key, value]) => [...curr, [key, value]], [])

const toTable = (value = "") =>
    value.split("\n")
    |> (^).filter(v => v.indexOf("=") > -1)
    |> (^).map(v => v.split("="))
    |> (^).reduce((curr, [key, value]) => [...curr, [key, value]], [])

const filterKey = (by) => (dict) => dict.filter(([key]) => key.indexOf(by.toUpperCase()) !== -1)

const keyContains = ((by, [key]) => key.indexOf(by.toUpperCase()) !== -1)
const keyToUpper = (([key, value]) => [key.toUpperCase(), value])

const filterOnUpperKey = (filter) => (table) =>
    keyToUpper(table)
    |> keyContains(filter, ^)

const filterUpperKey = (by) => (table) =>
    upperKey(table)
    |> filterKey(by)(^)

const sort = ([a], [b]) => a.localeCompare(b)

const sumValues = (curr, [_, next]) => 
    curr + Number.parseInt(next)

const format = (value) => {
    if (value < 25) { return `[${value}%] Started... ` }
    else if (value < 75) { return `[${value}%] Running... ` }
    else if (value < 100) { return `[${value}%] Almost done... ` }
    else { return `Done` }
}

test_data
    |> readLines(^)
    |> tokenize(^)
    |> ^.filter(e => e |> keyToUpper(^) |> keyContains("ELEMENT", ^))
    |> ^.sort(sort)
    |> ^.reduce(sumValues, 0)
    |> format(^)
    |> console.log(^)

/*
const sumValuesFromElementsWithKeyEle = (v) =>
    v
    |> readLines(^)
    |> tokenize(^)
    |> filterUpperKey("ele")(^)
    |> sort(^)
    |> sumValues(^)
    |> format(^)

console.log("Trying to compute err_vars:")
err_vars
    |> sumValuesFromElementsWithKeyEle(^)
    |> console.log(^)

console.log("Trying to compute success_vars:")
success_vars
    |> sumValuesFromElementsWithKeyEle(^)
    |> console.log(^)
    */