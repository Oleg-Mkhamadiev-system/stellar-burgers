//import { data } from "../utils/data";

const baseUrl = "https://norma.nomoreparties.space/api";

async function makeRequest (path, params={}) {
    const url = `${baseUrl}${path}`,
    options = {
        method: "GET",
        headers: {
            ...params.headers
        },
        body: params.body
    };

    const res = await fetch(url, options);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`${res.status}`);
    }
};

function getIngredients () {
    return makeRequest("/ingredients");
};

export { getIngredients };
