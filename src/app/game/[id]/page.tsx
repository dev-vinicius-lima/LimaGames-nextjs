import Container from '@/components/Container'
import { GameProps } from '@/utils/types/game'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import Label from './components/label'
import GameCard from '@/components/gameCard'
import { Metadata } from 'next'

type ParamsProps = {
  params: {
    id: string
  }
}

export const generateMetaData = async ({
  params,
}: ParamsProps): Promise<Metadata> => {
  try {
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 50 } },
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: 'Lima Games - Descubra jogos incriveis para se divertir',
        }
      })
    return {
      title: response.title,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    }
  } catch (error) {
    return {
      title: 'Lima Games - Descubra jogos incriveis para se divertir',
    }
  }
}

const getDataGameId = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 50 } },
    )
    return response.json()
  } catch (error) {
    return null
  }
}

const getGameSorted = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 50 } },
    )
    return response.json()
  } catch (error) {
    throw new Error('Failed to fetch Data!')
  }
}

const GameDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const dataGame: GameProps = await getDataGameId(id)
  const sortedGame: GameProps = await getGameSorted()

  if (!dataGame) {
    redirect('/')
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={dataGame.image_url}
          alt="Imagem detalhe do jogo"
          priority
          fill
          quality={100}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
          className="object-cover w-full h-80 sm:h-96 opacity-70"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{dataGame.title}</h1>
        <p>{dataGame.description}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {dataGame.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>
        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {dataGame.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento:</strong>
          {dataGame.release}
        </p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  )
}

export default GameDetail
