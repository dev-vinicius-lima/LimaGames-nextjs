import Link from 'next/link'
import Image from 'next/image'
import { BiRightArrowCircle } from 'react-icons/bi'
import { GameProps } from '@/utils/types/game'

type GameCardProps = {
  data: GameProps
}

const GameCard = ({ data }: GameCardProps) => {
  const { id, image_url, title } = data

  return (
    <Link href={`game/${id}`}>
      <section className="w-full bg-slate-200 p-4 mb-5">
        <div className="relative w-full h-56 hover:scale-110 duration-300">
          <Image
            src={image_url}
            alt={title}
            fill={true}
            quality={100}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center mt-4 justify-between">
          {/* truncate => utilizado para deixar o nome do jogo que tiver mais uma linha com ... */}
          <p className="text-sm font-bold px-2 text-black truncate">{title}</p>
          <BiRightArrowCircle size={24} color="#000" />
        </div>
      </section>
    </Link>
  )
}

export default GameCard
