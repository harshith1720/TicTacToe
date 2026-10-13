import { useState, useCallback } from 'react'
import Scoreboard from './components/Scoreboard'
import StatusBanner from './components/StatusBanner'
import Board from './components/Board'
import MoveHistory from './components/MoveHistory'
import Controls from './components/Controls'
import { calculateWinner } from './utils/gameLogic'
import './styles/App.css'

const SYMBOLS = { X: 'X', O: 'O' }

export default function App() {
  // history: array of 9-square board snapshots
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentStep, setCurrentStep] = useState(0)
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  // ── Derived state ───────────────────────────────────────────────
  const currentSquares = history[currentStep]
  const xCount = currentSquares.filter((s) => s === SYMBOLS.X).length
  const oCount = currentSquares.filter((s) => s === SYMBOLS.O).length
  const currentPlayer = xCount <= oCount ? SYMBOLS.X : SYMBOLS.O
  const result = calculateWinner(currentSquares)
  const winner = result?.winner ?? null
  const winLine = result?.line ?? null
  const isDraw = !winner && currentSquares.every(Boolean)
  const gameOver = !!winner || isDraw

  // ── Handlers ────────────────────────────────────────────────────
  const handleCellClick = useCallback(
    (index) => {
      if (gameOver || currentSquares[index]) return

      const nextSquares = currentSquares.slice()
      nextSquares[index] = currentPlayer

      // Trim any future history if user jumped back in time
      const nextHistory = history.slice(0, currentStep + 1).concat([nextSquares])
      setHistory(nextHistory)
      setCurrentStep(nextHistory.length - 1)

      // Update scores immediately if this move ends the game
      const moveResult = calculateWinner(nextSquares)
      if (moveResult) {
        setScores((prev) => ({ ...prev, [moveResult.winner]: prev[moveResult.winner] + 1 }))
      } else if (nextSquares.every(Boolean)) {
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      }
    },
    [gameOver, currentSquares, currentPlayer, history, currentStep],
  )

  const jumpTo = useCallback((step) => setCurrentStep(step), [])

  const handleNewGame = useCallback(() => {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }, [])

  const handleResetAll = useCallback(() => {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
    setScores({ X: 0, O: 0, draws: 0 })
  }, [])

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Tic Tac Toe</h1>
        <p className="app__subtitle">Two Players · Classic Strategy</p>
      </header>

      <Scoreboard scores={scores} currentPlayer={currentPlayer} gameOver={gameOver} />

      <StatusBanner winner={winner} isDraw={isDraw} currentPlayer={currentPlayer} />

      <Board
        squares={currentSquares}
        onCellClick={handleCellClick}
        winningLine={winLine}
        gameOver={gameOver}
      />

      <MoveHistory history={history} currentStep={currentStep} onJumpTo={jumpTo} />

      <Controls onNewGame={handleNewGame} onResetAll={handleResetAll} />

      <footer className="app__footer">Built with React 18 + Vite</footer>
    </div>
  )
}
