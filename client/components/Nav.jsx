'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '@/styles/Nav.css'

const Nav = () => {

  const router = useRouter();

  const selectState = e => {
    router.push(`/${e.target.value}`);
  }

  return (
    <nav>
      <div className='nav-tab-container'>
        <Link href="/">
          <div className='nav-tab'>Home</div>
        </Link>

        <Link href="/about">
          <div className='nav-tab'>About</div>
        </Link>
      </div>

      <div className="select">
        <span>State </span>
        <select name="state" id="state" onChange={selectState}>
          <option value="">Select...</option>
          <option value="NV">Nevada</option>
          <option value="LA">Louisiana</option>
        </select>
      </div>
    </nav>
  )
}

export default Nav