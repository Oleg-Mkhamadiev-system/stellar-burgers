
const baseUrl = "https://norma.nomoreparties.space/api";

export const checkStatusResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error(`${res.status}`);
    }
};

export function getOrders (ids) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "ingredients": ids
        })
    }
};

export async function apiRequest(endpoint, options) {
  const res = await fetch(`${baseUrl}${endpoint}`, options);
  return checkStatusResponse(res);
}
