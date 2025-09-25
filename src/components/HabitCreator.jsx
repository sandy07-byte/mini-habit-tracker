import { useState } from 'react'

const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night']

export default function HabitCreator({ onAdd, renderTrigger }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('Evening')

  function reset() {
    setTitle('')
    setTimeOfDay('Evening')
  }

  function handleSave() {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, timeOfDay })
    reset()
    setIsOpen(false)
  }

  const open = () => setIsOpen(true)

  return (
    <div style={{ marginBottom: 16 }}>
      {renderTrigger ? (
        renderTrigger({ open })
      ) : (
        <button onClick={open}>+ Add Habit</button>
      )}

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            color: '#111',
            padding: 20,
            borderRadius: 10,
            minWidth: 320,
            maxWidth: '90%',
            boxSizing: 'border-box',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}>
            <h3 style={{ marginTop: 0,color:'blueviolet', marginBottom: 12 }}>Add Habit</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Habit name"
                style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
              />
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                style={{ padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
              >
                {TIME_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
                <button onClick={() => { reset(); setIsOpen(false) }}>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
