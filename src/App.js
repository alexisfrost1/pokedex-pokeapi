import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getPokemon, getAllPokemon } from './services/pokemon';
import './App.css';
import Form from './components/Form';
import Detail from './components/Detail/Detail';
import { BrowserRouter, Route, Link } from 'react-router-dom'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
 // const initialURL = 'https://pokeapi.co/api/v2/pokemon'
  const pokemonURL = `http://localhost:5000/api/pokemons`

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(pokemonURL)
      setLoading(false);
      const data = { response }
      setNextUrl(data.response.pokemons.next);
      setPrevUrl(data.response.pokemons.previous);
      await loadPokemon(data.response.pokemons.results);
        localStorage.setItem('listado-inicial-pokemon',JSON.stringify(data.response.pokemons));
    }
    fetchData();
  }, [])

  const reload = async () => {
    let response = await getAllPokemon(pokemonURL)
    const data = { response }
    setNextUrl(data.response.pokemons.next);
    setPrevUrl(data.response.pokemons.previous);
    await loadPokemon(data.response.pokemons.results);
  }

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  return (
    <BrowserRouter>
      <>
        <Route path="/" exact={true}>
          <>
            <Navbar />
            <div className="btn">
              <Link to="/">
                <button >Inicio</button>
              </Link>
              <Link to="/Detail">
                <button >Ver listado Detallado</button>
              </Link>
            </div>
            <h1 className="h1">Buscar Pokémon por nombre</h1>
            <Form
              key={pokemonData} pokemonData={pokemonData}
              key={setPokemonData} setPokemonData={setPokemonData}
            />
            <h1 className="h1_2">Ver listado de Pokémon</h1>
            <div>
              {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
                <>
                  <div className="btn">
                    <button onClick={reload}>Recargar Listado de pokémons</button>
                  </div>

                  <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                  </div>
                  <div className="grid-container" >
                    {pokemonData.map((pokemon, i) => {
                      return <Card
                        key={i}
                        pokemon={pokemon}
                      />
                    })}
                  </div>
                  <br></br>
                  <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                  </div>
                </>
              )}
            </div>
          </>
        </Route>
        <Route path="/Detail">
          <>
            <Navbar />
            <div className="btn">
              <Link to="/">
                <button >Inicio</button>
              </Link>
              <Link to="/Detail">
                <button >Ver listado Detallado</button>
              </Link>
            </div>
            <h1 className="h1">Buscar Pokémon por nombre</h1>
            <Form
              key={pokemonData} pokemonData={pokemonData}
              key={setPokemonData} setPokemonData={setPokemonData}
            />
            <h1 className="h1_2">Ver listado de Pokémon</h1>
            <div>
              {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
                <>
                  <div className="btn">
                    <button onClick={reload}>Recargar Listado de pokémons</button>
                  </div>
                  <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                  </div>
                  <div className="grid-container" >
                    {pokemonData.map((pokemon, a) => {
                      return <Detail
                        key={a} pokemon={pokemon}
                        key={pokemonData} pokemonData={pokemonData}
                        key={setPokemonData} setPokemonData={setPokemonData}
                      />
                    })}
                  </div>
                  <br></br>
                  <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                  </div>
                </>
              )}
            </div>
          </>
        </Route>

      </>
    </BrowserRouter>
  );
}

export default App;
