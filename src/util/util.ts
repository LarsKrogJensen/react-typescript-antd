export module util
{
    export function isNullOrEmpty(val: string): boolean
    {
        return val == null || val == undefined || val == ""
    }

    export function strCompare(a: string, b: string): number
    {
        if (a > b)
            return 1
        if (a < b)
            return -1

        return 0
    }

    export  function numCompare(a: number, b: number): number
    {
        return a-b
    }
}