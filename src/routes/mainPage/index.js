import { useContext } from "react";
import OutlineButton from "../../components/outlineButton";

import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import RewardPointPage from "../rewardPointPage";
import LoginPage from "../loginPage";
import JoinPage from "../joinPage";

/// 메인페이지
const MainPage = () => {
    const { push } = useContext(ContextRouter);
    return (<div className={style.MainPage}>
        <div className={style.MainPageTitle}>
            <h1 className={style.MainPageTitleText1}>hansei</h1>
            <h1 className={style.MainPageTitleText2}>point</h1>
        </div>
        <div className={style.MainPageButtons}>
            <OutlineButton className={style.RewardPointButton} onClick={() => push(RewardPointPage.name)}>
                적립
            </OutlineButton>
            <OutlineButton color="secondary" className={style.LoginButton} onClick={() => push(LoginPage.name)}>로그인</OutlineButton>
            <OutlineButton color="secondary" className={style.JoinButton} onClick={() => push(JoinPage.name)}>가입</OutlineButton>
        </div>
    </div>);
};
export default MainPage;