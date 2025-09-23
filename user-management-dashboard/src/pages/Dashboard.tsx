import React from 'react'
import SearchBar from '@/components/SearchBar'
import UserTable from '@/components/UserTable'
import FilterModal from '@/components/FilterModal'
import ConfirmDialog from '@/components/ConfirmDialog'
import UserFormModal from '@/components/UserFormModal'
import { useUsers } from '@/hooks/useUsers'
import type { User } from '@/types/user'

export default function Dashboard() {
  const { state, table, filters, actions } = useUsers()
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [formOpen, setFormOpen] = React.useState(false)
  const [editUser, setEditUser] = React.useState<User | null>(null)
  const [confirm, setConfirm] = React.useState<User | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  function openAdd() { setEditUser(null); setFormOpen(true) }
  function openEdit(u: User) { setEditUser(u); setFormOpen(true) }

  async function handleSubmit(values: Omit<User, 'id'>) {
    try {
      setSubmitting(true)
      if (editUser) await actions.editUser(editUser.id, values)
      else await actions.addUser(values)
      setFormOpen(false)
    } catch (e: any) {
      alert(e?.message || 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Users</h2>
        <div className="toolbar">
          <SearchBar value={filters.search} onChange={v => { filters.setSearch(v); table.setPage(1) }} />
          <button onClick={() => setFilterOpen(true)}>Filters</button>
          <div className="spacer" />
          <div className="row">
            <label className="label">Rows</label>
            <select value={table.pageSize} onChange={(e) => { table.setPageSize(Number(e.target.value)); table.setPage(1) }}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <button className="primary" onClick={openAdd}>Add User</button>
        </div>
      </div>

      {state.error && <div className="error">{state.error}</div>}

      <UserTable
        rows={table.rows}
        sortKey={table.sortKey}
        sortDir={table.sortDir}
        onToggleSort={table.toggleSort}
        onEdit={openEdit}
        onDelete={(u) => setConfirm(u)}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
        <div className="muted">{state.loading ? 'Loading…' : `${table.total} users`}</div>
        <div className="pagination">
          <button onClick={() => table.setPage(1)} disabled={table.page <= 1}>« First</button>
          <button onClick={() => table.setPage(table.page - 1)} disabled={table.page <= 1}>‹ Prev</button>
          <span className="badge">Page {table.page} / {table.pageCount}</span>
          <button onClick={() => table.setPage(table.page + 1)} disabled={table.page >= table.pageCount}>Next ›</button>
          <button onClick={() => table.setPage(table.pageCount)} disabled={table.page >= table.pageCount}>Last »</button>
        </div>
      </div>

      <FilterModal
        open={filterOpen}
        initial={filters.filters}
        onClose={() => setFilterOpen(false)}
        onClear={() => { filters.setFilters({}); setFilterOpen(false); table.setPage(1) }}
        onApply={(f) => { filters.setFilters(f); setFilterOpen(false); table.setPage(1) }}
      />

      <UserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        initial={editUser || undefined}
        submitting={submitting}
      />

      <ConfirmDialog
        open={!!confirm}
        title="Delete user"
        message={confirm ? `Delete ${confirm.firstName} ${confirm.lastName}? This cannot be undone.` : ''}
        onClose={() => setConfirm(null)}
        onConfirm={async () => {
          if (!confirm) return
          try {
            await actions.removeUser(confirm.id)
          } catch (e: any) {
            alert(e?.message || 'Failed to delete user')
          } finally {
            setConfirm(null)
          }
        }}
      />
    </div>
  )
}
