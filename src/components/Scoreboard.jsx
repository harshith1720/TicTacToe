import './Scoreboard.css'

/**
 * Scoreboard — displays X wins, O wins, and draws.
 * Highlights the active player's card.
 *
 * @param {{ X: number, O: number, draws: number }} scores
 * @param {'X'|'O'} currentPlayer
 * @param {boolean}  gameOver
 */
export default function Scoreboard({ scores, currentPlayer, gameOver }) {
  const activeX = !gameOver && currentPlayer === 'X'
  const activeO = !gameOver && currentPlayer === 'O'

  return (
    <div className="scoreboard" role="region" aria-label="Scoreboard">
      {/* Player X */}
      <div className={`scoreboard__card scoreboard__card--x ${activeX ? 'scoreboard__card--active-x' : ''}`}>
        <span className="scoreboard__symbol">X</span>
        <span className="scoreboard__label">Player X</span>
        <span className="scoreboard__value">{scores.X}</span>
      </div>

      {/* Draws */}
      <div className="scoreboard__divider">
        <span className="scoreboard__draws-label">Draws</span>
        <span className="scoreboard__draws-value">{scores.draws}</span>
      </div>

      {/* Player O */}
      <div className={`scoreboard__card scoreboard__card--o ${activeO ? 'scoreboard__card--active-o' : ''}`}>
        <span className="scoreboard__symbol">O</span>
        <span className="scoreboard__label">Player O</span>
        <span className="scoreboard__value">{scores.O}</span>
      </div>
    </div>
  )
}
