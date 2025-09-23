import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@/types/user'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email'),
  department: z.string().min(1, 'Department is required').max(100),
})

type FormValues = z.infer<typeof schema>

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: FormValues) => Promise<void> | void
  initial?: User | null
  submitting?: boolean
}

export default function UserFormModal({ open, onClose, onSubmit, initial, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: initial || { firstName: '', lastName: '', email: '', department: '' } })

  React.useEffect(() => {
    reset(initial || { firstName: '', lastName: '', email: '', department: '' })
  }, [initial, reset])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 style={{ margin: 0 }}>{initial ? 'Edit User' : 'Add User'}</h3>
          <button className="ghost" onClick={onClose}>✕</button>
        </header>
        <form onSubmit={handleSubmit(async (values) => { await onSubmit(values) })}>
          <div className="form-grid">
            <div className="field">
              <label className="label">First Name</label>
              <input type="text" {...register('firstName')} />
              {errors.firstName && <span className="error">{errors.firstName.message}</span>}
            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <input type="text" {...register('lastName')} />
              {errors.lastName && <span className="error">{errors.lastName.message}</span>}
            </div>
            <div className="field full">
              <label className="label">Email</label>
              <input type="email" {...register('email')} />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="field full">
              <label className="label">Department</label>
              <input type="text" {...register('department')} />
              {errors.department && <span className="error">{errors.department.message}</span>}
            </div>
          </div>
          <div className="actions">
            <button type="button" className="ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary" disabled={!!submitting}>{initial ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
