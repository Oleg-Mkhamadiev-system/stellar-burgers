//import { data } from "../utils/data";

const baseUrl = "https://norma.nomoreparties.space/api";

async function api (path) {
    const url = `${baseUrl}${path}`,
    options = {
        method: "GET",
        headers: {
            ...headers
        },
        body: JSON.stringify({
            data: data
        })
    };

    const res = await fetch(url, options);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`${res.status}`);
    }
};

export function getInitialIngredients () {
    return api("/ingredients");
}