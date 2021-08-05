import React, { useState } from "react";
import axios from "axios";
import './style.css';

const Form = ({ pokemonData, setPokemonData }) => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const toArray = [];
    const url = `http://localhost:5000/api/pokemons/${pokemon}`
    const res = await axios.get(url)
    const data = { res }
    toArray.push(data.res.data.pokemon)
    setPokemonType(data.res.data.pokemon.types[0].type.name);
    setPokemonData(toArray);
    console.log(data.res.data.pokemon)

  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            onChange={handleChange}
            placeholder="Enter pokemon name"
          />
        </label>
      </form>
    </div>
  );
}

export default Form;