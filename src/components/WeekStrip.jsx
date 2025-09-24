function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0,0,0,0)
  return d
}

function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function getDateKey(date) {
  return startOfDay(date).toISOString().slice(0,10)
}

export default function WeekStrip({ habit, onSet }) {
  const today = startOfDay(new Date())
  const sunday = addDays(today, -today.getDay())
  const days = Array.from({ length: 7 }, (_, i) => addDays(sunday, i))

  return (
    <div className="week-scroll">
      {days.map((d) => {
        const key = getDateKey(d)
        const value = habit.entries?.[key]
        const common = { width: 36, height: 36, borderRadius: '50%', border: '1px solid #333', background: '#2b2b3d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }
        const active = (cond, color) => cond ? { boxShadow: `0 0 0 3px ${color || '#888'}` } : null
        return (
          <div key={key} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, minWidth: 140, padding: 16 }}>
            <div className="title" style={{ fontSize: 15 }}>{d.toLocaleDateString(undefined, { weekday: 'short' })}</div>
            <div className="muted" style={{ fontSize: 13 }}>{d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
            <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
              <button style={{ ...common, background: '#1f2e23', borderColor: '#1f2e23', ...active(value === true, 'rgba(34,197,94,0.6)') }} onClick={() => onSet(key, true)}>✅</button>
              <button style={{ ...common, background: '#2a1f1f', borderColor: '#2a1f1f', ...active(value === false, 'rgba(239,68,68,0.6)') }} onClick={() => onSet(key, false)}>❌</button>
              <button style={{ ...common, background: '#2b2b3d', borderColor: '#2b2b3d', ...active(value == null, 'rgba(107,114,128,0.6)') }} onClick={() => onSet(key, null)}>➖</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}


