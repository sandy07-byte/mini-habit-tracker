export default function HabitCard({ habit, isTodayDone, progressText, onQuickToggle, onSelect, onDelete }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onQuickToggle}
          title="Toggle today"
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: isTodayDone ? 'var(--success)' : 'var(--danger)',
            color: 'white',
            border: 'none'
          }}
        >
          {isTodayDone ? '✅' : '❌'}
        </button>
        <div>
          <div className="title">{habit.title} <span style={{ opacity: 0.7, fontWeight: 400 }}>· {habit.timeOfDay}</span></div>
          <div className="muted">{progressText}</div>
        </div>
      </div>
      <div className="row">
        <button onClick={onSelect} className="btn-primary">Week View</button>
        <button onClick={onDelete} className="btn-danger">Delete</button>
      </div>
    </div>
  )
}


