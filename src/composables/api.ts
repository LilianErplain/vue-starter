export async function getOneUser (id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return await res.json()
}
