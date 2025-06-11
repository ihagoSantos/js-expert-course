class Service {
    async makeRequest(url) {
        return (await fetch(url)).json()

    }

    async getPokemon(url) {
        const data = await this.makeRequest(url)
        return {
            id: data.id,
            name: data.name,
            abilities: data.abilities.map(({ ability }) => {
                return ability.name
            })
        }
    }
}

module.exports = Service