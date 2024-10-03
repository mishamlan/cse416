'use client'

import '@/styles/Nav.css'

const Nav = ({setMenu, setStateSelect}) => {

  const handleClick = e => {
    setMenu(prev => !prev);
  };

  return (
    <nav>
      <button className="menu-btn" onClick={handleClick}>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
          <div className="menu-icon"></div>
      </button>

      <div className="select">
        <span>State </span>
        <select name="state" id="state" onChange={e => {setStateSelect(e.target.value);}}>
          <option value="N/A">Select...</option>
          <option value="NV">Nevada</option>
          <option value="LA">Louisiana</option>
        </select>
      </div>
    </nav>
  )
}

export default Nav