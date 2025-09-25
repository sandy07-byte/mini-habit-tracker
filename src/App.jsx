import { useEffect, useMemo, useState } from 'react'
import './App.css'
import HabitCreator from './components/HabitCreator.jsx'
import HabitList from './components/HabitList.jsx'
import WeekStrip from './components/WeekStrip.jsx'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function App() {
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem('minihabit:habits')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [selectedHabitId, setSelectedHabitId] = useState(null)

  useEffect(() => {
    localStorage.setItem('minihabit:habits', JSON.stringify(habits))
  }, [habits])

  const selectedHabit = useMemo(
    () => habits.find(h => h.id === selectedHabitId) || null,
    [habits, selectedHabitId]
  )

  function addHabit({ title, timeOfDay }) {
    const newHabit = { id: generateId(), title, timeOfDay, entries: {} }
    setHabits(prev => [newHabit, ...prev])
  }

  function deleteHabit(id) {
    setHabits(prev => prev.filter(h => h.id !== id))
    if (selectedHabitId === id) setSelectedHabitId(null)
  }

  function renameHabit(id, newTitle) {
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, title: newTitle } : h)))
  }

  function toggleHabitOnDate(id, date) {
    const key = typeof date === 'string' ? date : getDateKey(date)
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h
        const current = h.entries?.[key]
        const nextEntries = { ...(h.entries || {}) }
        if (current === true) {
          nextEntries[key] = false
        } else if (current === false) {
          delete nextEntries[key]
        } else {
          nextEntries[key] = true
        }
        return { ...h, entries: nextEntries }
      })
    )
  }

  function setHabitStatusOnDate(id, date, value) {
    const key = typeof date === 'string' ? date : getDateKey(date)
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== id) return habit
        const nextEntries = { ...(habit.entries || {}) }
        if (value === true) nextEntries[key] = true
        else if (value === false) nextEntries[key] = false
        else delete nextEntries[key]
        return { ...habit, entries: nextEntries }
      })
    )
  }

  function isDone(habit, date) {
    const key = typeof date === 'string' ? date : getDateKey(date)
    return Boolean(habit.entries?.[key])
  }

  const todayKey = getDateKey(new Date())

  const TIME_SECTIONS = ['Morning', 'Afternoon', 'Evening', 'Night']

  if (!selectedHabit) {
    return (
      <div className="min-h-screen">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 w-full bg-[#1e1e2f] shadow-md">
          <div className="w-4/5 mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Mini Habit Tracker</h1>

            {/* Add Habit button on right */}
            <HabitCreator
              onAdd={addHabit}
              renderTrigger={({ open }) => (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={open}
                >
                  + Add Habit
                </button>
              )}
            />
          </div>
        </nav>

        {/* Main content */}
        <main className="w-4/5 mx-auto px-4 py-4">
          {TIME_SECTIONS.map(section => {
            const items = habits.filter(h => h.timeOfDay === section)
            if (!items.length) return null
            return (
              <div key={section} className="mb-4">
                <h3 className="mb-2 text-lg font-medium">{section}</h3>
                <HabitList
                  habits={items}
                  onQuickToggle={(id) => toggleHabitOnDate(id, todayKey)}
                  isTodayDone={(id) => Boolean(habits.find(h => h.id === id)?.entries?.[todayKey])}
                  onSelect={setSelectedHabitId}
                  onDelete={deleteHabit}
                />
              </div>
            )
          })}
        </main>
      </div>
    )
  }

  return (
    <div className="w-4/5 mx-auto p-4 flex flex-col gap-3">
      <h2 className="mt-2 mb-3 text-center text-xl font-semibold">{selectedHabit.title}</h2>
      <section style={{ marginTop: 16 }}>
        <h3 style={{ margin: '0 0 8px' }}>This Week (Sun - Sat)</h3>
        <WeekStrip
          habit={selectedHabit}
          onSet={(date, value) => setHabitStatusOnDate(selectedHabit.id, date, value)}
        />
      </section>
      <div className="flex justify-center mt-4">
        <button onClick={() => setSelectedHabitId(null)}>Back to Detail View</button>
      </div>
    </div>
  )
}

export default App
