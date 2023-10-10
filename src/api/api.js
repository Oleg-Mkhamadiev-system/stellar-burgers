
const baseUrl = "https://norma.nomoreparties.space/api";

async function api (url, path) {
    const url = `${baseUrl}${path}`,
    options = {
        method: "GET",
        headers: {
            ...headers
        },
        body: body
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