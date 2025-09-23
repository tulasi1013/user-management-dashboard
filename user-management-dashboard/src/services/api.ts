import axios from 'axios'
import type { PlaceholderUser, User } from '@/types/user'
import { mapFromPlaceholder, mapToPlaceholder } from '@/types/user'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 12000,
})

export async function fetchUsers(): Promise<User[]> {
  const res = await api.get<PlaceholderUser[]>('/users')
  return res.data.map(mapFromPlaceholder)
}

export async function createUser(payload: Omit<User, 'id'>): Promise<User> {
  const res = await api.post<PlaceholderUser>('/users', mapToPlaceholder(payload))
  // JSONPlaceholder returns an id: 101, simulate echo
  const id = (res.data?.id as number) || Math.floor(Math.random() * 10000) + 100
  return { ...payload, id }
}

export async function updateUser(id: number, payload: Omit<User, 'id'>): Promise<User> {
  await api.put<PlaceholderUser>(`/users/${id}`, mapToPlaceholder({ ...payload, id }))
  return { ...payload, id }
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}
