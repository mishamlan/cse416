'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "@/styles/globals.css"

const Nav = ({option, setOption}) => {

  const router = useRouter();

  const selectState = e => {
    const selected = e.target.value;
    setOption(selected);
    router.push(`/${selected}`);
  }

  return (
    <nav className='w-full h-12 bg-black flex-btw px-6'>
      <Link href="/">
        <img src="Lions_Logo.svg" alt="LIONS" onClick={()=>setOption('default')} />
      </Link>

      <select className='dropdown-menu w-44' name="state" id="state" value={option} onChange={selectState}>
        <option value='default'>Select State</option>
        <option value="NV">Nevada</option>
        <option value="LA">Louisiana</option>
      </select>
    </nav>
  )
}

export default Nav