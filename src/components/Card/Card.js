import React from 'react';
import typeColors from '../../helpers/typeColors'
import './style.css';

function Card({ pokemon }) {
    return (
        <div className="Card">
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
                <div className="Card__data Card__data--weight">
                    <p className="title">Weight: {Math.round(pokemon.weight / 4.3)} lbs </p>
                </div>
                <div className="Card__data Card__data--weight">
                    <p className="title">Height: {Math.round(pokemon.height * 3.9)} "</p>
                </div>
                <div className="Card__data Card__data--ability">
                    <p className="title">Ability:
                        {
                            pokemon.abilities.map(ability => {
                                return (
                                    <div>
                                        {ability.ability.name}
                                    </div>
                                )
                            })
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
