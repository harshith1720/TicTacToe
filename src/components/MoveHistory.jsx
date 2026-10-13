import { useState } from 'react'
import './MoveHistory.css'

/**
 * MoveHistory — collapsible time-travel panel.
 * Renders one button per historical board state.
 *
 * @param {Array}    history      - array of 9-square snapshots
 * @param {number}   currentStep  - index of the current snapshot
 * @param {function} onJumpTo     - called with the target step index
 */
export default function MoveHistory({ history, currentStep, onJumpTo }) {
  const [collapsed, setCollapsed] = useState(false)

  // Only show the panel once at least one move has been made
  if (history.length <= 1) return null

  return (
    <aside className="move-history" aria-label="Move history">
      <div className="move-history__header">
        <h3 className="move-history__title">Move History</h3>
        <button
          className="move-history__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
        >
          {collapsed ? 'Show ▾' : 'Hide ▴'}
        </button>
      </div>

      {!collapsed && (
        <div className="move-history__list" role="list">
          {history.map((_, step) => (
            <button
              key={step}
              role="listitem"
              className={`move-history__btn ${step === currentStep ? 'move-history__btn--current' : ''}`}
              onClick={() => onJumpTo(step)}
              aria-label={step === 0 ? 'Go to game start' : `Go to move ${step}`}
            >
              {step === 0 ? 'Start' : `Move #${step}`}
            </button>
          ))}
        </div>
      )}
    </aside>
  )
}
