import { createContext } from "react";

export const storeLoginDataKey = "__STORE_LOGIN_DATA_KEY";

const getStoreLoginData = () => {
    const loginData = window.sessionStorage.getItem(storeLoginDataKey);
    if (loginData) {
        return JSON.parse(loginData);
    }
    return null;
}

const ContextStore = createContext({
    loginData: getStoreLoginData(),

    storeLoginData(loginData) { },
    removeLoginData() { },
    updatePointData() {},
});
export default ContextStore;