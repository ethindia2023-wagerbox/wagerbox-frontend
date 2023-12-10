import { RouteObject, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Explore from './pages/Explore';
import Media from './pages/Media';
import Tournaments from './pages/Tournaments';
import ViewGame from './pages/ViewGame';

let router: RouteObject[] = [
    {
        path: '/',
        id: 'landing',
        element: <Landing />
    },
    {
        path: '/explore/:user',
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
    {
        path: '/games/:id',
        id: 'view-game',
        element: <ViewGame />
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