export default function DayCell({ date, value, onToggle }) {
  const bg = value === true ? '#22c55e' : value === false ? '#ef4444' : '#6b7280'
  return (
    <button
      onClick={() => onToggle(date)}
      title={new Date(date).toDateString()}
      style={{
        width: 28,
        height: 28,
        borderRadius: 4,
        border: 'none',
        background: bg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {new Date(date).getDate()}
    </button>
  )
}


