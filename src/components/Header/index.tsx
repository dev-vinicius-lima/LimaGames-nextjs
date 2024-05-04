import logoImg from '../../../public/logoteste.png'
import Image from 'next/image'
import Link from 'next/link'
import { LiaGamepadSolid } from 'react-icons/lia'

const Header = () => {
  return (
    <header className="w-full bg-slate-100 text-black px-2 max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
      <nav className="flex justify-between items-center w-full gap-4">
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Link href={'/'}>
              <Image
                src={logoImg}
                alt="limagames"
                quality={100}
                priority={true}
                height={140}
                className="w-full"
              />
            </Link>
          </li>
          <li>
            <Link href={'/'}>Games</Link>
          </li>
          <li>
            <Link href={'/profile'}>Perfil</Link>
          </li>
        </ul>
        <div className="hidden sm:flex justify-center items-center">
          <Link href={'/profile'}>
            <LiaGamepadSolid size={34} color="#475569" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
