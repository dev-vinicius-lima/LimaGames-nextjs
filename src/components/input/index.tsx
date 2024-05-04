'use client'

import { FormEvent, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const Input = () => {
  const [input, setInput] = useState('')
  const { push } = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    input === ''
      ? alert('por favor, preencha o campo de busca!')
      : push(`/game/search/${input}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
    >
      <input
        type="text"
        placeholder="Procurando algum jogo?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white rounded-lg outline-none w-11/12 px-3"
      />
      <button type="submit">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  )
}

export default Input
