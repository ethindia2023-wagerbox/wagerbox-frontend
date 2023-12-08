import { RouteObject, createBrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Explore from './pages/Explore';

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