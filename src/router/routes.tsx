import { createBrowserRouter } from "react-router-dom";
import App from './../App';
import Dashboard from '../components/Dashboard';
import ContactList from '../components/ContactList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/contact-list',
                element: <ContactList />
            }
        ]
    }
]);

export default router;