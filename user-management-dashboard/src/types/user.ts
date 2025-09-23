export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
}

export type PlaceholderUser = {
  id: number
  name: string
  username?: string
  email: string
  phone?: string
  website?: string
  company?: { name: string }
  address?: unknown
}

export function mapFromPlaceholder(u: PlaceholderUser): User {
  const [firstName, ...rest] = (u.name || '').split(' ')
  const lastName = rest.join(' ').trim() || '—'
  return {
    id: u.id,
    firstName: firstName || '—',
    lastName,
    email: u.email,
    department: u.company?.name || 'General',
  }
}

export function mapToPlaceholder(u: Omit<User, 'id'> & { id?: number }): PlaceholderUser {
  return {
    id: u.id ?? 0,
    name: `${u.firstName} ${u.lastName}`.trim(),
    email: u.email,
    company: { name: u.department },
  }
}
