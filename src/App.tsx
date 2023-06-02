import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
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

  const { pathname } = useLocation();
  const [path, setPath] = useState('/');

  useEffect(() => {
     setPath(pathname);
  }, [pathname]);

  return (
    <>

      <Routes location={path}>
        <Route path={path} />
      </Routes>
      <div>
        <div className="">
          <div className="flex">
            <Navbar />
            <aside className='fixed z-20 hidden md:block'>
              <ul className="h-screen bg-gray-500 absolute top-0 left-0 pt-10">
                {navElements.map((element) =>
                  <li className="text-white py-6" key={element.tabName}>
                    <Link to={element.path}><p className='p-2 hover:bg-gray-200 hover:text-black rounded-lg'>{element.tabName}</p></Link>
                  </li>
                )}
              </ul>
            </aside>
            <main className='md:ml-24 mt-20 w-full overflow-hidden'>
              {path === '/' ? <Dashboard /> : <Outlet />}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
