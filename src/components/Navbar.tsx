import { FC } from 'react'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return     <nav className="min-w-screen py-3 flex justify-center items-center bg-gray-300">
  <h1 className="text-6xl text-red-500 font-neucha">dOIt</h1>
  </nav>
}

export default Navbar