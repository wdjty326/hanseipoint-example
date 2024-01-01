import ContextRouter from './contextRouter';
import { useState, useMemo, useCallback } from 'react';

import MainPage from './routes/mainPage';
import JoinPage from './routes/joinPage';
import LoginPage from './routes/loginPage';
import ProductHistoryPage from './routes/productHistoryPage';
import ProductListPage from './routes/productListPage';
import RewardPointPage from './routes/rewardPointPage';

import './Components.css';
import RewardPointCompletePage from './routes/rewardPointCompletePage';
import ContextStore, { storeLoginDataKey } from './contextStore';
import { ApiCurrentPoint } from './api';

function App() {
  const [prevRouteNames, setPrevRouteNames] = useState([]);
  const [routeName, setRouteName] = useState(MainPage.name);
  const [loginData, setLoginData] = useState(null);

  const push = useCallback((name) => {
    setPrevRouteNames(prev => prev.concat([routeName]));
    setRouteName(name);
  }, [routeName]);

  const pop = useCallback(() => {
    if (prevRouteNames.length === 0) return;
    const clonePrevRouteNames = prevRouteNames.concat([]);
    setRouteName(clonePrevRouteNames.pop());
    setPrevRouteNames(clonePrevRouteNames);
  }, [prevRouteNames]);

  const pushAndUtilRemoved = useCallback((name) => {
    setPrevRouteNames([]);
    setRouteName(name);
  }, [routeName]);

  return (
    <ContextStore.Provider value={{
      loginData,
      storeLoginData(loginData) {
        window.sessionStorage.setItem(storeLoginDataKey, JSON.stringify(loginData));
        setLoginData(loginData);
      },
      removeLoginData() {
        window.sessionStorage.removeItem(storeLoginDataKey);
        setLoginData(null);
      },
      async updatePointData() {
        if (!loginData) return;
        const resp = await ApiCurrentPoint(loginData.userId);
        if (resp.code === '0000') {
          setLoginData(prev => ({
            ...prev,
            point: resp.data,
          }));
        }
      },
    }}>
      <ContextRouter.Provider value={{
        prevRouteNames,
        push,
        pushAndUtilRemoved,
        pop,
      }}>
        {routeName === MainPage.name && <MainPage />}
        {routeName === JoinPage.name && <JoinPage />}
        {routeName === LoginPage.name && <LoginPage />}
        {routeName === ProductListPage.name && <ProductListPage />}
        {routeName === ProductHistoryPage.name && <ProductHistoryPage />}
        {routeName === RewardPointPage.name && <RewardPointPage />}
        {routeName === RewardPointCompletePage.name && <RewardPointCompletePage />}
      </ContextRouter.Provider>
    </ContextStore.Provider>
  );
}

export default App;
