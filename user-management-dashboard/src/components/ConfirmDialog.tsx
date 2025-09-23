import React from 'react'

type Props = {
  open: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmDialog({ open, title = 'Confirm', message = 'Are you sure?', onConfirm, onClose }: Props) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="ghost" onClick={onClose}>✕</button>
        </header>
        <p style={{ marginTop: 0 }}>{message}</p>
        <div className="actions">
          <button className="ghost" onClick={onClose}>Cancel</button>
          <button className="danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
