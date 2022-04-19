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

const toTable = (value = "") =>
    value.split("\n")
    |> (^).filter(v => v.indexOf("=") > -1)
    |> (^).map(v => v.split("="))
    |> (^).reduce((curr, [key, value]) => [...curr, [key, value]], [])

const filterKey = (by) => (dict) => dict.filter(([key]) => key.indexOf(by.toUpperCase()) !== -1)
const upperKey = (dict) => dict.map(([key, value]) => [key.toUpperCase(), value])
const filterUpperKey = (by) => (table) =>
    upperKey(table)
    |> filterKey(by)(^)

const sort = (dict) =>
    dict
        .sort(([a], [b]) => a.localeCompare(b))

const sumValues = (dict) =>
    dict.reduce((curr, [_, next]) => {
        return curr + Number.parseInt(next)
    }, 0)

const format = (value) => {
    if (value < 25) { return `Started... at ${value}%` }
    else if (value < 75) { return `Running... at ${value}%` }
    else if (value < 100) { return `Almost done... at ${value}%` }
    else { return `Done` }
}

const sumValuesFromElementsWithKeyEle = (v) =>
    v
    |> toTable(^)
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