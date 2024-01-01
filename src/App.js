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
import ContextStore from './contextStore';

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
        setLoginData(loginData);
      },
      removeLoginData() {
        setLoginData(null);
      },
      updatePointData() {
        /// 직접구현
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
