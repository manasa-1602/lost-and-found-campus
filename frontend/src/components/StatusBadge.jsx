function StatusBadge({ status }) {
  const styles = {
    Lost: 'bg-red-50 text-red-600',
    Found: 'bg-green-50 text-green-600',
    Returned: 'bg-gray-100 text-gray-600',
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge