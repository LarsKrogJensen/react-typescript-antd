// import {fetch} from 'whatwg-fetch'

export module api
{
    export interface SearchItem
    {
        id?: string;
        name?: string;
        longName?: string;
    }

    export interface AccessToken
    {
        access_token?: string;
        error?: string;
        error_description?: string;
    }

    // const baseUrL: string = "https://larskj-gql.herokuapp.com";
    const baseUrL: string = "http://localhost:8080";

    export async function fetchAccessToken(usr: string, pwd: string): Promise<AccessToken>
    {
        let init: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                                     client_id: usr,
                                     client_secret: pwd
                                 }),
            credentials: 'include',
        };
        let response: Response = await fetch(baseUrL + "/authenticate", init)
        return await response.json()
    }

    export async function search(token: string, searchQuery: string): Promise<SearchItem[]>
    {
        console.log("searching by: " + searchQuery)
        let query = JSON.stringify({
                                       query: "{ listingSearch(searchQuery: \"" + searchQuery + "\") {id name longName}} }"
                                   });
        console.log("Query: " + query);
        let init: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: query,
            credentials: 'include',
        };
        let response: Response = await fetch(baseUrL + "/graphql", init)
        let jsonObj = await response.json();
        return jsonObj.data.listingSearch;
    }
}