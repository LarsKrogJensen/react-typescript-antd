export module util
{
    export function isNullOrEmpty(val: string): boolean
    {
        return val == null || val == undefined || val == ""
    }
}