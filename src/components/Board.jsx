import Cell from './Cell'
import './Board.css'

/**
 * Board — renders a 3×3 grid of Cell components.
 *
 * @param {Array}    squares     - 9-element array of 'X' | 'O' | null
 * @param {function} onCellClick - called with the index when a cell is clicked
 * @param {Array}    winningLine - array of 3 winning indices, or null
 * @param {boolean}  gameOver    - disables all empty cells when true
 */
export default function Board({ squares, onCellClick, winningLine, gameOver }) {
  return (
    <section className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinning={winningLine ? winningLine.includes(index) : false}
          isDisabled={!!value || gameOver}
        />
      ))}
    </section>
  )
}
