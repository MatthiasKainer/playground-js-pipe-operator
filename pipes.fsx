open System

let err_vars = "
ELEMENT01=3
ELEMENT04=4
discarded:incorrect
ELEMENT03=1
foo=4
ELEMENT06=error
ELEMENT07=12
bar=3
ELEMENT02=12
"
let success_vars = "
ELEMENT01=3
ELEMENT04=4
discarded:incorrect
ELEMENT03=1
foo=4
element06=not an integer
ELEMENT07=12
bar=3
ELEMENT02=12
"
    
let (>>=) m f = Option.bind f m
let (>>>=) (m, n) f = 
    Option.bind (fun v -> Option.bind (f v) m) n

let each(e) = e

let split(split: char)(element: string) =
    if (element.Contains(split))
        then Some (element.Split[|split|])
        else None

let readLines(v: string) = v.Split[|'\n'|]

let tokenize_e(line: string) =
    line
    |> split '='
    
let tokenize(line: string) =
    line
    |> split '='
    >>= fun line -> Some(line[0], line[1])

let keyContains(by: string) ((key,_): string * string) =
    key.Contains(by.ToUpper())

let keyToUpper((key, value): string * string) =
    (key.ToUpper(), value)

let toInt(value: string) =
    match Int32.TryParse value with
    | true, int -> Some int
    | _ -> None

let add (a: int) (b: int) =
    Some(a + b)

let sum(state: int option) (value: int option) =
    (value, state) >>>= add

let (|LessThan|_|) comp value = if value < comp then Some() else None

let format(a: int) =
    Some(
        match a with
        | LessThan 25 -> sprintf "[%d%%] Started..." a
        | LessThan 75 -> sprintf "[%d%%] Running..." a
        | LessThan 100 -> sprintf "[%d%%] Almost done..." a
        | _ -> "Done"
    )

let printValue(value: string) =
    Some(value |> printfn "%s")

let values ((_, value): string * string) =
    value

let sumValuesFromElementsWithKeyEle(v: string) =
    v
    |> readLines
    |> Seq.map tokenize
    |> Seq.choose each
    |> Seq.filter (keyToUpper >> keyContains "ELEMENT")
    |> Seq.sort 
    |> Seq.map (values >> toInt)
    |> Seq.fold sum (Some 0)
    >>= format

success_vars
    |> readLines
    |> Seq.map tokenize
    |> Seq.choose each
    |> Seq.filter (keyToUpper >> keyContains "ELEMENT")
    |> Seq.sort 
    |> Seq.map (values >> toInt)
    |> Seq.fold sum (Some 0)
    >>= format
    >>= printValue


printfn "Trying to compute err_vars:"
err_vars 
    |> sumValuesFromElementsWithKeyEle
    >>= printValue

printfn "Trying to compute success_vars:"
success_vars 
    |> sumValuesFromElementsWithKeyEle
    >>= printValue


(* let toString(table: seq<string * string>) =
    table
    |> Seq.fold(fun state (key, value) -> (formatKey (key, value)) |> (+) state ) ""

let printString: seq<string * string> -> unit = 
    toString >> printfn "Filtered:\n%s"
 *)
// envVars |> toTable |> toString |> printfn "Unfiltered:\n%s"

// envVars |> toTable |> upperKey |> filterKey "GIT" |> toString |> printfn "Filtered:\n%s"

// envVars |> toTable |> filterUpperKey "GIT" |> toString |> printfn "Filtered:\n%s"
// printString <| (envVars |> toTable |> filterUpperKey "GIT")
