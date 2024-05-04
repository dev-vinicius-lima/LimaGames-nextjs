import Container from '@/components/Container'
import GameCard from '@/components/gameCard'
import Input from '@/components/input'
import { GameProps } from '@/utils/types/game'
import React from 'react'

async function getDataGames(title: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`,
      { next: { revalidate: 320 } },
    )
    return response.json()
  } catch (error) {
    return null
  }
}

const Search = async ({ params: { title } }: { params: { title: string } }) => {
  const games: GameProps[] = await getDataGames(title)

  return (
    <main className="w-full text-black">
      <Container>
        <Input />
        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja oque encontramos em nossa base:
        </h1>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games?.map((item) => <GameCard key={item.id} data={item} />)}
        </section>
        {!games && <p>Este jogo não foi encontrado.</p>}
      </Container>
    </main>
  )
}

export default Search
