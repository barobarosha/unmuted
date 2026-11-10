export default function ToastDock({ items }) {
  return (
    <div className="toastdock" role="status" aria-live="polite">
      {items.map((item) => (
        <div className="toastnote" key={item.id}>{item.text}</div>
      ))}
    </div>
  )
}
