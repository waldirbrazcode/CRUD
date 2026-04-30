const API_URL = 'http://127.0.0.1:8000/api/items/'

export async function getItems() {
    const req = await fetch(API_URL)
    const res = await req.json()
    return res
}

export async function createItem(item) {
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    });    
}

export async function deleteItem(id) {
    await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
    })
}

export async function updateItem(id, item) {
    await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item),
    })
}