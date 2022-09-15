import { Link } from "react-router-dom";
import '../css/dropdown.css'

export default function Dropdown( props ) {

    const {dropdownStatus} = props;

  return (
    <div className={dropdownStatus?'showDropdown':'hideDropdown'}>
        <ul className='navList'>
            <li>
                <Link className='dropdownLink mouseHover' to='/t-shirts'>T-Shirts</Link>
            </li>
            <li>
                <Link className='dropdownLink mouseHover' to='/jumpers'>Jumpers</Link>
            </li>
            <li >
                <Link className='dropdownLink mouseHover' to='/hoodies'>Hoodies</Link>
            </li>
        </ul>
    </div>
  )
}
