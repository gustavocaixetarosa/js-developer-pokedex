const modal = document.getElementById('pokemonModal');
const closeModalBtn = document.querySelector('.close');
const modalDetail = document.getElementById('modalDetail');


function openModal(pokemon) {
    // Define o valor máximo que um stat pode ter (255 é o valor máximo para stats na PokéAPI)
    const maxStatValue = 255;

    // Exibe o nome, número, foto, tipos e stats do Pokémon com barras
    modalDetail.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>#${pokemon.number}</p>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types.join(', ')}</p>
        
        <h3>Stats</h3>
        <ul>
            ${pokemon.stats.map(stat => `
                <li>
                    <strong>${stat.name}:</strong> ${stat.base_stat}
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${(stat.base_stat / maxStatValue) * 100}%;">
                            ${stat.base_stat}
                        </div>
                    </div>
                </li>
            `).join('')}
        </ul>
    `;
    modal.style.display = 'flex';
}

closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => {
            return `
                <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>`;
        }).join('');
        
        pokemonList.innerHTML += newHtml;

        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach(item => {
            item.addEventListener('click', function() {
                const pokemonId = item.getAttribute('data-pokemon-id');
                const selectedPokemon = pokemons.find(p => p.number == pokemonId);
                openModal(selectedPokemon);
            });
        });
    });
}