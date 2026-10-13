import './Cell.css'

/**
 * Cell — a single square on the board.
 *
 * @param {string|null} value       - 'X', 'O', or null
 * @param {function}    onClick     - click handler
 * @param {boolean}     isWinning   - whether this cell is part of the winning line
 * @param {boolean}     isDisabled  - prevents clicking (already filled or game over)
 */
export default function Cell({ value, onClick, isWinning, isDisabled }) {
  const classes = [
    'cell',
    value === 'X' ? 'cell--x' : '',
    value === 'O' ? 'cell--o' : '',
    !value        ? 'cell--empty' : '',
    isWinning     ? 'cell--winning' : '',
    isDisabled    ? 'cell--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      onClick={onClick}
      aria-label={value ? `Cell marked ${value}` : 'Empty cell'}
      disabled={isDisabled}
    >
      {value && <span className="cell__symbol">{value}</span>}
    </button>
  )
}
