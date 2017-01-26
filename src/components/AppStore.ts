import {api} from "../util/api";
import AccessToken = api.AccessToken;


export class AppStore
{
    private _token?: AccessToken;

    get token(): AccessToken
    {
        return this._token;
    }

    set token(newToken: AccessToken)
    {
        this._token = newToken
    }
}