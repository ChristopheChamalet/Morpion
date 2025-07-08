export default function Log({turns}) {

    const word = 'selected';

    return (
<>
        <ol id="log">
            {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player}, {word} {turn.square.row}, {turn.square.col}</li>)}
        </ol>



</>

    );
}