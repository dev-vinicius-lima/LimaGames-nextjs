'use client'

import React, { useState } from 'react'
import { FiEdit, FiX } from 'react-icons/fi'

const FavoriteCard = () => {
  const [input, setInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [gameName, setGameName] = useState('')

  const handleButtonToggleInput = () => {
    setShowInput(!showInput)
    if (input !== '') {
      setGameName(input)
    }
    setInput('')
  }
  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg outline-none px-3 py-2"
            autoFocus={true}
          />
          <button onClick={handleButtonToggleInput}>
            <FiX size={24} color="#fff" />
          </button>
        </div>
      ) : (
        <button
          className="self-start hover:scale-110 duration-200"
          onClick={handleButtonToggleInput}
        >
          <FiEdit size={24} color="white" />
        </button>
      )}
      {gameName && (
        <div className="flex items-center justify-center gap-3 text-white">
          <span>Jogo favorito:</span>
          <p className="font-bold">{gameName}</p>
        </div>
      )}
      {!gameName && <p className="text-bold">Adicionar jogo</p>}
    </div>
  )
}

export default FavoriteCard
