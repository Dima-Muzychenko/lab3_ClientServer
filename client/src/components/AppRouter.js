//описує логіку навігації по сторінкам
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {routes} from "../routes";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, component: Component }) =>
                (<Route key={path} path={path} element={<Component />} /> )
            )}
        </Routes>
    );
};

export default AppRouter;