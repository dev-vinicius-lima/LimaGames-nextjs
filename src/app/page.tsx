import Container from '@/components/Container/page';
import { GameProps } from '@/utils/types/game';
import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRightSquare } from 'react-icons/bs';

async function getLimaGame() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 } })
    return res.json()

  } catch (error) {
    throw new Error("Failed to fetch data");

  }
}
export default async function Home() {
  const limaGame: GameProps = await getLimaGame();


  return (
    <main className="w-full">
      <Container>
        <h1 className='text-center font-bold text-xl mt-8 mb-5'>Separamos um jogo exclusivo para você!</h1>
        <Link href={`/game/${limaGame.id}`}>

          <section className='w-full bg-black rounded-lg'>
            <div className='w-full max-h-96 h-96 relative rounded-lg'>
              <div className='absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2'>
                <p className='font-bold text-xl text-white'>
                  {limaGame.title}
                  <BsArrowRightSquare />
                </p>
              </div>
              <Image
                src={limaGame.image_url}
                alt={limaGame.title}
                priority={true}
                quality={100}
                fill={true}
                sizes='(max-width:768px) 100vw, (max-width:1200px) 44vw' className='max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300 '
              />
            </div>

          </section>
        </Link>

      </Container>
    </main >
  );
}
