import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  HOME_PAGE_ROUTE_FC,
  SETTINGS_PAGE_ROUTE_FC,
  HOME_PAGE_ROUTE_CC,
  SETTINGS_PAGE_ROUTE_CC,
} from '@constants/routes';
import { Loader } from '@components/loader/LoaderCC';

const routes = [
  { path: HOME_PAGE_ROUTE_FC, page: lazy(() => import('@pages/home-page/HomePageFC')) },
  { path: HOME_PAGE_ROUTE_CC, page: lazy(() => import('@pages/home-page/HomePageCC')) },
  { path: SETTINGS_PAGE_ROUTE_FC, page: lazy(() => import('@pages/settings-page/SettingsPageFC')) },
  { path: SETTINGS_PAGE_ROUTE_CC, page: lazy(() => import('@pages/settings-page/SettingsPageCC')) },
]

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map(({ path, page: Page }) => {
          return (
            <Route exact key={path} path={path} element={<Page />} />
          )
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
