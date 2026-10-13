import './Controls.css'

/**
 * Controls — New Game and Reset Scores buttons.
 *
 * @param {function} onNewGame  - resets board, keeps scores
 * @param {function} onResetAll - resets board and scores
 */
export default function Controls({ onNewGame, onResetAll }) {
  return (
    <div className="controls">
      <button
        id="btn-new-game"
        className="controls__btn controls__btn--primary"
        onClick={onNewGame}
        aria-label="Start a new game"
      >
        ↺ New Game
      </button>
      <button
        id="btn-reset-scores"
        className="controls__btn controls__btn--secondary"
        onClick={onResetAll}
        aria-label="Reset all scores"
      >
        ✕ Reset Scores
      </button>
    </div>
  )
}
