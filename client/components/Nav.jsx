'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "@/styles/globals.css"

// import Darkmode from 'darkmode-js';
 
// new Darkmode().showWidget();
const Nav = ({option, setOption}) => {

  const router = useRouter();

  const selectState = e => {
    const selected = e.target.value;
    setOption(selected);
    router.push(`/${selected}`);
  }

  return (
    <nav className='w-full h-12 bg-black flex-btw px-6'>
      <ul className='flex items-center'>
        <li>
          <Link href="/">
            <img className='scale-75 -translate-x-10' src="Lions_Logo.svg" alt="LIONS" onClick={()=>setOption('default')} />
          </Link>
        </li>
        <li className='text-white text-xl px-2 hover:bg-gray-800 border-x-white border-s-2 -translate-x-12'>
          <Link href='/about'>
            <span>References</span>
          </Link>
        </li>
      </ul>

      <select className='dropdown-menu w-44' name="state" id="state" value={option} onChange={selectState}>
        <option value='default'>Select State</option>
        <option value="NV">Nevada</option>
        <option value="LA">Louisiana</option>
      </select>
    </nav>
  )
}

export default Nav