async function* fetchPokemons(top = 10) {
    let id = 1
    while (id <= top) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()

        if (!data) break

        yield data
        id++
    }
    return
}

; (async () => {
    for await (let pokemon of fetchPokemons(100)) {
        const { id, name } = pokemon
        console.log(id, name)
    }
})()