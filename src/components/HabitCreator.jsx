import { useState } from 'react'

const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Night']

export default function HabitCreator({ onAdd }) {
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

  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => setIsOpen(true)}>+ Add Habits</button>

      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div style={{ background: 'white', color: '#111', padding: 16, borderRadius: 8, minWidth: 320 }}>
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Add Habit</h3>
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


