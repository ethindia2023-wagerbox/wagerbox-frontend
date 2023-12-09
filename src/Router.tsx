import { RouteObject, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Explore from './pages/Explore';
import Media from './pages/Media';
import Tournaments from './pages/Tournaments';

let router: RouteObject[] = [
    {
        path: '/',
        id: 'landing',
        element: <Landing />
    },
    {
        path: '/explore',
        id: 'explore',
        element: <Explore />
    },
    {
        path: '/media',
        id: 'media',
        element: <Media />
    },
    {
        path: '/tournaments',
        id: 'tournaments',
        element: <Tournaments />
    },
];

router = router.map((obj: RouteObject) => {
    const id = obj.id || '';
    if (id && ['landing'].indexOf(id) === -1) {
        obj.element = <>
            <Navbar />
            {obj.element}
        </>;
    }
    return obj;
});

const Router = createBrowserRouter(router);

export default Router;