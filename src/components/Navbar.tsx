import { useState } from 'react';
import { HiPhotograph } from 'react-icons/hi';
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateNavbar } from '../store/contactStore';

export default function Navbar() {
  const [navElements, setNavElements] = useState([
    {
      tabName: "Dashboard",
      path: '/dashboard',
      active: false,
    },
    {
      tabName: "Contacts",
      path: '/contact-list',
      active: false
    },
  ])
const dispatch = useAppDispatch();
const newData = useAppSelector(state=> state.contact.navBar);

  const handler = (index: number) => {

    const data = navElements.map((el, i) => ({ ...el, active: (index === i) }));
    setNavElements(data);
    const payload = {
      payload: data,
      type: ""
    }
    dispatch(updateNavbar(payload));
  }

  return (
    <div className="flex justify-between items-center pl-5 bg-gray-100 w-full z-10 fixed top-0 right-0">
      <div><HiPhotograph className="h-6 w-6" /></div>
      <div className="flex items-center justify-around mr-5">
        <ul className="flex gap-8 justify-end mr-5">
          {newData.map((element, index) =>
            <li className="text-blue-500" key={element.tabName}>
              <Link to={element.path} onClick={() => handler(index)}><p className={`text-gray-900 hover:text-gray-700 p-5 border-b-2 ${element.active ? 'border-gray-500' : 'border-gray-100'} hover:border-gray-500`}>{element.tabName}</p></Link>
            </li>
          )}
        </ul>
      </div>
    </div>

  );
}
