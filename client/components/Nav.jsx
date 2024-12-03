'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "@/styles/globals.css"

const Nav = () => {

  const router = useRouter();

  const selectState = e => {
    router.push(`/${e.target.value}`);
  }

  return (
    <nav className='w-full h-12 bg-black flex-btw px-6'>
      <Link href="/">
        <img src="Lions_Logo.svg" alt="LIONS" />
      </Link>

      <select className='dropdown-menu w-44' name="state" id="state" onChange={selectState}>
        <option value="">Select State</option>
        <option value="NV">Nevada</option>
        <option value="LA">Louisiana</option>
      </select>
    </nav>
  )
}

export default Nav