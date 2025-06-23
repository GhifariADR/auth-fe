import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface SubMenuItem {
    label : string,
    to : string
}

interface Props {
    title : string,
    subMenu : SubMenuItem[]
}

const DropdownSidebar:React.FC<Props> = ({title, subMenu}) => {
    const [open, setOpen] = useState<boolean>(false)

  return (
    <div>
        <li className='nav-item mb-2'>
            <button className='nav-link bg-transparent text-white' onClick={() => setOpen(!open)}>{title}</button>
            <div className='accordion-container'>
               {open && (
                <ul className='nav ps-3'>
                    {subMenu.map((item, idx) => (
                    <li key={idx} className='nav-item'>                                   
                        <Link className='nav-link text-white' to={item.to}>{item.label}</Link>
                    </li>
                    ))}
                </ul>
               )}
            </div>
        </li>
    </div>
  )
}

export default DropdownSidebar