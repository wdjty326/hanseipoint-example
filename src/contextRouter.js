import { createContext } from "react";

/// 라우터 제어용
const ContextRouter = createContext({
    prevRouteNames: [],
    pop() { },
    push(name) { },
    pushAndUtilRemoved(name) { }
});
export default ContextRouter;