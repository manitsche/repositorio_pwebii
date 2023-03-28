const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
// Determina a url estática da API, que junto com a interpolação da string id, forma a url 
// que consulta os pokemon na API

const fetchPokemon = () => {
    
    const pokemonPromisses = []
    // Vetor que armazena os dados dos 151 primeiros pokemon, retirados da API

    for (let i = 1; i <= 151; i++) {
        pokemonPromisses.push(fetch(getPokemonUrl(i)).then(Response => Response.json()))
    }
    // "Captura" os dados dos 151 primeiros pokemon de dentro da API pela url, joga na última
    // posição do vetor, vai incrementando, e manda tudo para um json de resposta   

    Promise.all(pokemonPromisses)
    .then(pokemons => {
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
        // Para os pokemon que estão acumulados no json de resposta


            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            // Serão exibidos os nosmes de seus respectivos tipos em tela

            accumulator += `
            <li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"</img>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
            </li>
            `
            return accumulator
        }, '')    
        // Cria os cards padronizados, onde serão exibidos todos os pokemon, com suas devidas 
        // e respectivas imagens, ids, nomes e tipos 

        const ul = document.querySelector('[data-js="pokedex"]')
        // Joga todos os elementos de cards dos pokemon na ul, do aquivo HTML, com o nome 
        // pokemon

        console.log(ul)
        // Informa os dados guardados na ul no console

        ul.innerHTML = lisPokemons
        // Até que a lista de pokemon seja inserida na ul, e assim, seja exibida em tela
    })
}

fetchPokemon()
// Através da url da API, o método fetch() faz com que seja gerada uma promisse, que é a
// responsável por permitir o consumo dos dados da API, tornando esse projeto possível  