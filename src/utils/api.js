
const baseUrl = "https://norma.nomoreparties.space/api";

/* async function makeRequest (path, params={}) {
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
 */

export const checkStatusResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`${res.status}`);
    }
};

export function getIngredients (params={}) {
    return fetch(`${baseUrl}/ingredients`,
    options = {
        method: "GET",
        headers: {
            ...params.headers
        },
        body: params.body
    }).then((res) => checkStatusResponse(res))
};

export function getOrders (id) {
    return fetch(`${baseUrl}/orders`,
    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "ingredients": id
        })
    }).then((res) => checkStatusResponse(res))
};

export { getIngredients };
