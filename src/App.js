import { useEffect, useState } from 'react';
import { fetchAllPokemon, fetchPokemonDetailsByName, fetchEvolutionChainById, fetchPokemonSpeciesByName } from './api';

const STATUS = {
	idle: 'idle',
	loading: 'loading',
	success: 'success',
	error: 'error',
};

function App() {
	const [pokemonIndex, setPokemonIndex] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [pokemonDetails, setPokemonDetails] = useState(null);
	const [status, setStatus] = useState(STATUS.idle);
	const [errorMessage, setErrorMessage] = useState(null);
	const showPokemonDetails = status === STATUS.success && pokemon.length > 0 && pokemonDetails;
	const showNoResults = status !== STATUS.error && pokemon.length === 0;

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const { results: pokemonList } = await fetchAllPokemon();
				setPokemon(pokemonList);
				setPokemonIndex(pokemonList);
			} catch (error) {
				setStatus(STATUS.error);
				setErrorMessage('An error occurred while fetching Pokemon. Try refreshing the page.');
			}
		};
		fetchPokemon();
	}, []);

	const onSearchValueChange = (event) => {
		const value = event.target.value.toLowerCase();
		setSearchValue(event.target.value);
		setPokemon(pokemonIndex.filter((monster) => monster.name.toLowerCase().includes(value)));
	};

	const onGetDetails = (monsterName) => async () => {
		try {
			setStatus(STATUS.error);
			setStatus(STATUS.loading);
			const [pokemonDetails, pokemonSpecies] = await Promise.all([
				fetchPokemonDetailsByName(monsterName),
				fetchPokemonSpeciesByName(monsterName),
			]);

			const monsterId = pokemonSpecies.evolution_chain?.url
				.replace('https://pokeapi.co/api/v2/evolution-chain/', '')
				.replace('/', '');

			const evolutionChain = await fetchEvolutionChainById(monsterId);

			setPokemonDetails({
				...pokemonDetails,
				evolutionNames: getEvolutionNames(evolutionChain.chain),
			});
			setStatus(STATUS.success);
		} catch (error) {
			setStatus(STATUS.error);
			setErrorMessage('An error occurred while fetching Pokemon details. Try refreshing the page.');
		}
	};

	const getEvolutionNames = (chain, evolutionNames = []) => {
		evolutionNames.push(chain.species.name);
		if (chain.evolves_to.length === 0) {
			return evolutionNames;
		}
		return getEvolutionNames(chain.evolves_to[0], evolutionNames);
	};

	return (
		<div className={'pokedex__container'}>
			{status === STATUS.loading && <p className={'pokedex__loading'}>Loading...</p>}
			<div className={'pokedex__search-input'}>
				<input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'} />
			</div>
			{status === STATUS.error && (
				<div className={'pokedex__errors'}>
					<p className={'pokedex__errors-small-margin'}>{errorMessage ?? 'Something went wrong. Please try again.'}</p>
				</div>
			)}
			<div className={'pokedex__content'}>
				{pokemon.length > 0 && (
					<div className={'pokedex__search-results pokedex__content--rounded-corners pokedex__content--red-border'}>
						{pokemon.map((monster) => {
							return (
								<div className={'pokedex__list-item'} key={monster.name}>
									<div>{monster.name}</div>
									<button onClick={onGetDetails(monster.name)}>Get Details</button>
								</div>
							);
						})}
					</div>
				)}

				{showNoResults && <p>No Results Found</p>}

				{showPokemonDetails && (
					<div className={'pokedex__details'}>
						<div className={'pokedex__details-card pokedex__content--rounded-corners pokedex__content--black-border'}>
							<p className={'pokedex__details-card--bold'}>{pokemonDetails.name}</p>
							<div className={'pokedex__characteristics'}>
								<div className={'pokedex__types'}>
									<p className={'pokedex__details-card--bold'}>Types</p>
									<ul>
										{pokemonDetails.types?.map((typeItem) => (
											<li key={typeItem.slot}>{typeItem.type.name}</li>
										))}
									</ul>
								</div>
								<div className={'pokedex__moves'}>
									<p className={'pokedex__details-card--bold'}>Moves</p>
									<ul>
										{pokemonDetails.moves?.slice(0, 4).map((moveItem) => (
											<li key={moveItem.move.name}>{moveItem.move.name}</li>
										))}
									</ul>
								</div>
							</div>
							<div className={'pokedex__evolutions'}>
								<p className={'pokedex__details-card--bold'}>Evolutions</p>
								<ul className={'pokedex__evolutions--inline'}>
									{pokemonDetails.evolutionNames?.slice(0, 4).map((name) => (
										<li key={name}>{name}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
