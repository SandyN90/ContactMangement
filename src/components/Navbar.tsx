import { BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const navElements = [
    {
      tabName: "Dashboard",
      path: '/dashboard'
    },
    {
      tabName: "Contacts",
      path: '/contact-list'
    },
  ]
  return (
    <div className="flex justify-between items-center ml-5">
      <div><BiUser className="h-6 w-6" /></div>
      <div className="flex items-center justify-around mr-5">
        <ul className="flex gap-8 p-4 justify-end mr-5">
          {navElements.map((element) =>
            <li className="text-blue-500" key={element.tabName}>
              <Link to={element.path}>{element.tabName}</Link>
            </li>
          )}
        </ul>
      </div>
    </div>

  );
}