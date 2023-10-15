//import { data } from "../utils/data";

const baseUrl = "https://norma.nomoreparties.space/api";

async function api (path, params={}) {
    const url = `${baseUrl}${path}`,
    options = {
        method: params?.method || "GET",
        headers: {
            ...params?.headers
        },
        body: params?.body
    };

    const res = await fetch(url, options);
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`${res.status}`);
    }
};

function getIngredients () {
    return api("/ingredients");
};

export { getIngredients };
