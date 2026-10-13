import './StatusBanner.css'

/**
 * StatusBanner — live announcement of the current game state.
 *
 * @param {'X'|'O'|null} winner
 * @param {boolean}       isDraw
 * @param {'X'|'O'}       currentPlayer
 */
export default function StatusBanner({ winner, isDraw, currentPlayer }) {
  let modifier = ''
  let icon = ''
  let message = ''

  if (winner) {
    modifier = winner === 'X' ? 'status-banner--win-x' : 'status-banner--win-o'
    icon = '🏆'
    message = `Player ${winner} wins!`
  } else if (isDraw) {
    modifier = 'status-banner--draw'
    icon = '🤝'
    message = "It's a draw!"
  } else {
    modifier = currentPlayer === 'X' ? 'status-banner--turn-x' : 'status-banner--turn-o'
    icon = currentPlayer === 'X' ? '✕' : '○'
    message = `Player ${currentPlayer}'s turn`
  }

  return (
    <div className={`status-banner ${modifier}`} role="status" aria-live="polite">
      <em className="status-banner__icon">{icon}</em>
      <span>{message}</span>
    </div>
  )
}
