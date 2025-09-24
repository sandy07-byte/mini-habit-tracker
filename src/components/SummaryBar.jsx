function getDateKey(date) {
  const d = new Date(date)
  d.setHours(0,0,0,0)
  return d.toISOString().slice(0,10)
}

export default function SummaryBar({ habit }) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    d.setHours(0,0,0,0)
    return d
  })
  const stats = days.reduce(
    (acc, d) => {
      const key = getDateKey(d)
      const val = habit.entries?.[key]
      if (val === true) acc.done += 1
      if (val === false) acc.notDone += 1
      if (val == null) acc.empty += 1
      return acc
    },
    { done: 0, notDone: 0, empty: 0 }
  )
  const completed = stats.done
  const total = 7
  const pct = Math.round((completed / total) * 100)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ fontWeight: 600 }}>{completed}/7 days complete ({pct}%)</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Legend color="#22c55e" label={`${stats.done} done`} />
        <Legend color="#ef4444" label={`${stats.notDone} not`} />
        <Legend color="#6b7280" label={`${stats.empty} empty`} />
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, opacity: 0.9 }}>
      <span style={{ width: 12, height: 12, background: color, borderRadius: 3, display: 'inline-block' }} />
      <span>{label}</span>
    </div>
  )
}


