import React from 'react'
import type { User } from '@/types/user'
import type { SortDir, SortKey } from '@/hooks/useUsers'

type Props = {
  rows: User[]
  sortKey: SortKey
  sortDir: SortDir
  onToggleSort: (key: SortKey) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

const headers: { key: SortKey; label: string; width?: number }[] = [
  { key: 'id', label: 'ID', width: 80 },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
]

export default function UserTable({ rows, sortKey, sortDir, onToggleSort, onEdit, onDelete }: Props) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h.key} style={{ width: h.width }}>
                <span className="th-sort" onClick={() => onToggleSort(h.key)}>
                  {h.label}
                  {sortKey === h.key ? (
                    <span className="badge">{sortDir === 'asc' ? '▲' : '▼'}</span>
                  ) : null}
                </span>
              </th>
            ))}
            <th style={{ width: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td>
                <span className="badge">{u.department}</span>
              </td>
              <td>
                <div className="row">
                  <button onClick={() => onEdit(u)} className="ghost">Edit</button>
                  <button onClick={() => onDelete(u)} className="danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
