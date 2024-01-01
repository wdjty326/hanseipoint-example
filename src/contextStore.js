import { createContext } from "react";

const ContextStore = createContext({
    loginData: null,

    storeLoginData(loginData) { },
    removeLoginData() { },
    updatePointData() {},
});
export default ContextStore;