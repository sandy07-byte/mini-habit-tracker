import HabitCard from './HabitCard.jsx'

function getDateKey(date) {
  const d = new Date(date)
  d.setHours(0,0,0,0)
  return d.toISOString().slice(0,10)
}

function computeLast7(habit) {
  const today = new Date()
  let done = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    d.setHours(0,0,0,0)
    const key = getDateKey(d)
    if (habit.entries?.[key] === true) done++
  }
  return `${done}/7 days`
}

export default function HabitList({ habits, onQuickToggle, isTodayDone, onSelect, onDelete }) {
  if (!habits.length) {
    return <div style={{ color: '#888', padding: '8px 0' }}>No habits yet. Add your first one above.</div>
  }
  return (
    <div className="grid grid-full">
      {habits.map(habit => (
        <HabitCard
          key={habit.id}
          habit={habit}
          isTodayDone={isTodayDone(habit.id)}
          progressText={computeLast7(habit)}
          onQuickToggle={() => onQuickToggle(habit.id)}
          onSelect={() => onSelect(habit.id)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </div>
  )
}


