import React, { useEffect, useState } from 'react'
import type { Filters } from '@/hooks/useUsers'

type Props = {
  open: boolean
  initial: Filters
  onClose: () => void
  onApply: (f: Filters) => void
  onClear: () => void
}

export default function FilterModal({ open, initial, onClose, onApply, onClear }: Props) {
  const [local, setLocal] = useState<Filters>(initial)
  useEffect(() => setLocal(initial), [initial])
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 style={{ margin: 0 }}>Filters</h3>
          <button className="ghost" onClick={onClose}>✕</button>
        </header>
        <div className="form-grid">
          <div className="field">
            <label className="label">First Name</label>
            <input type="text" value={local.firstName || ''} onChange={e => setLocal({ ...local, firstName: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <input type="text" value={local.lastName || ''} onChange={e => setLocal({ ...local, lastName: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Email</label>
            <input type="text" value={local.email || ''} onChange={e => setLocal({ ...local, email: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Department</label>
            <input type="text" value={local.department || ''} onChange={e => setLocal({ ...local, department: e.target.value })} />
          </div>
        </div>
        <div className="actions">
          <button className="ghost" onClick={onClear}>Clear</button>
          <span className="spacer" />
          <button onClick={() => onApply(local)} className="primary">Apply</button>
        </div>
      </div>
    </div>
  )
}
