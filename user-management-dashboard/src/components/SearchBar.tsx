import React from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search name, email or department..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minWidth: 260 }}
    />
  )
}
