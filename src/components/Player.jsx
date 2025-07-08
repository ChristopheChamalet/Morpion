import { useState } from "react";


export default function Player({initialName, symbol , isActive , onChangeName}) {

    const [isEditing , setIsEditing] = useState(false);
    const [playerName , setPlayerName] = useState(initialName);

    function handleEditing() {
        setIsEditing((editing)=> !editing);
        if(isEditing) {
            onChangeName(symbol , playerName);
        }
        
    }

    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

let pname = <span className="player-name">{playerName}</span>;
let btnValue = 'Edit';

if(isEditing) {
    pname = <input type="text" required value={playerName} onChange={handleChange}/>
    btnValue="Save";
}


    return (
         <li className={isActive ? 'active' : undefined}>
          <span className="player">
            {pname}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditing}>{btnValue}</button>
        </li>

    );

}