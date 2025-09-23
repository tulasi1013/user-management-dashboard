import { useEffect, useMemo, useState } from 'react'
import type { User } from '@/types/user'
import { createUser, deleteUser, fetchUsers, updateUser } from '@/services/api'

export type SortKey = keyof Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'department'>
export type SortDir = 'asc' | 'desc'

export type Filters = Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'department'>>

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>({})
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    let mounted = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchUsers()
        if (mounted) setUsers(data)
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  function applyFilters(list: User[]) {
    const term = search.trim().toLowerCase()
    return list.filter(u => {
      const matchesSearch = !term || [u.firstName, u.lastName, u.email, u.department].some(v => v.toLowerCase().includes(term))
      const byFirst = !filters.firstName || u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
      const byLast = !filters.lastName || u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
      const byEmail = !filters.email || u.email.toLowerCase().includes(filters.email.toLowerCase())
      const byDept = !filters.department || u.department.toLowerCase().includes(filters.department.toLowerCase())
      return matchesSearch && byFirst && byLast && byEmail && byDept
    })
  }

  const processed = useMemo(() => {
    const filtered = applyFilters(users)
    const sorted = [...filtered].sort((a: User, b: User) => {
      const av = a[sortKey] as string | number
      const bv = b[sortKey] as string | number
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av
      const as = String(av).toLowerCase()
      const bs = String(bv).toLowerCase()
      return sortDir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
    return sorted
  }, [users, search, filters, sortKey, sortDir])

  const total = processed.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return processed.slice(start, start + pageSize)
  }, [processed, currentPage, pageSize])

  async function addUser(data: Omit<User, 'id'>) {
    const optimisticId = Math.max(0, ...users.map(u => u.id)) + 1
    const optimistic: User = { id: optimisticId, ...data }
    setUsers((prev: User[]) => [optimistic, ...prev])
    try {
      const saved = await createUser(data)
      setUsers((prev: User[]) => prev.map((u: User) => (u.id === optimisticId ? saved : u)))
    } catch (e: any) {
      setUsers((prev: User[]) => prev.filter((u: User) => u.id !== optimisticId))
      throw e
    }
  }

  async function editUser(id: number, data: Omit<User, 'id'>) {
    const prev = users
    setUsers((prev: User[]) => prev.map((u: User) => (u.id === id ? { ...u, ...data } : u)))
    try {
      const saved = await updateUser(id, data)
      setUsers((prev: User[]) => prev.map((u: User) => (u.id === id ? saved : u)))
    } catch (e: any) {
      setUsers(prev)
      throw e
    }
  }

  async function removeUser(id: number) {
    const prev = users
    setUsers((prev: User[]) => prev.filter((u: User) => u.id !== id))
    try {
      await deleteUser(id)
    } catch (e: any) {
      setUsers(prev)
      throw e
    }
  }

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir((d: SortDir) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return {
    state: { users, loading, error },
    table: {
      rows: paged,
      total,
      page: currentPage,
      pageCount,
      pageSize,
      setPage,
      setPageSize,
      sortKey,
      sortDir,
      toggleSort,
    },
    filters: { search, setSearch, filters, setFilters },
    actions: { addUser, editUser, removeUser },
  }
}
