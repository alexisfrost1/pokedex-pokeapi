import React from 'react';
import typeColors from '../../helpers/typeColors'
import './style.css';
import axios from "axios";


function Detail({ pokemon, showDetails }) {

    //get Chain Evolutions
    const getEvo = async () => {
        const toArray = [];
        const id = pokemon.id
        const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`
        const res = await axios.get(urlSpecies)
        const data = { res }
        const urlEvo = data.res.data.evolution_chain.url
        const resEvo = await axios.get(urlEvo)
        const dataEvo = { resEvo }
        toArray.push(dataEvo.resEvo.data.chain)
        const chainEvo1 = dataEvo.resEvo.data.chain.species.name
        const chainEvo2 = dataEvo.resEvo.data.chain.evolves_to[0].species.name
        console.log('Forma inicial: ' + chainEvo1)
        console.log('Primera evolución: ' + chainEvo2)
        // switch of cases of Chain-Evolution
        //    switch(dataEvo){
        //        case 1:
        //            if(dataEvo.resEvo.data.chain.evolves_to[0].evolves_to[0] !== 'undefined')
        //            return 
        //           <div>
        //                 <p> {dataEvo.resEvo.data.chain.evolves_to[0].evolves_to[0].species.name},  
        //                    {dataEvo.resEvo.data.chain.evolves_to[0].species.name} 
        //                    {dataEvo.resEvo.data.chain.species.name}
        //                </p>
        //            </div>
        //            ;
        //       case 2:
        //            if(dataEvo.resEvo.data.chain.evolves_to[0] !== 'undefined')
        //            return 
        //            <div>
        //                <p> 
        //                    {dataEvo.resEvo.data.chain.evolves_to[0].species.name} 
        //                    {dataEvo.resEvo.data.chain.species.name}
        //                </p>
        //            </div>
        //            ;
        //        case 3:
        //           if (dataEvo.resEvo.data.chain !== 'undefined')
        //            return
        //            <div>
        //            <p> 
        //                {dataEvo.resEvo.data.chain.species.name}
        //            </p>
        //        </div>
        //            ;
        //    }
    }
    return (

        <div className="Card" onClick={getEvo}>
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                {pokemon.name}
            </div>
            <div className="Card__types">
                {
                    pokemon.types.map(type => {
                        return (
                            <div className="Card__type" style={{ backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data--weight ">
                    <p className="id">Número Pokedex: {pokemon.id}</p>
                </div>
                <div className="Card__data Card__data--weight ">
                    <p className="id">Base Experience: {pokemon.base_experience}</p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight: {Math.round(pokemon.weight / 4.3)} lbs </p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Height: {Math.round(pokemon.height * 3.9)} "</p>
                </div>
                <div className="Card__data">
                    <p className="hp">Hp: {pokemon.stats[0].base_stat} </p>
                </div>
                <div className="Card__data">
                    <p className="attack">Attack: {pokemon.stats[1].base_stat} </p>
                </div>
                <div className="Card__data ">
                    <p className="defence">Defence: {pokemon.stats[2].base_stat} </p>
                </div>
                <div className="Card__data">
                    <p className="specialAtk">Special-atack: {pokemon.stats[3].base_stat} </p>
                </div>
                <div className="Card__data">
                    <p className="specialDef">Special-defence: {pokemon.stats[4].base_stat} </p>
                </div>
                <div className="Card__data">
                    <p className="speed">Speed: {pokemon.stats[5].base_stat} </p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">Ability:
                        {
                            pokemon.abilities.map(ability => {
                                return (
                                    <li>
                                        {ability.ability.name}
                                    </li>
                                )
                            })
                        }
                    </p>
                </div>
               <hr className="hr"></hr>
                <div className="Card__data Card__data--moves">
                    <p className="moves">Moves:
                        {
                            pokemon.moves.map(move => {
                                return (
                                    <li>
                                        {move.move.name}
                                    </li>
                                )
                            })
                        }
                    </p>
                </div>
               
            </div>
        </div>
    );
}

export default Detail;
