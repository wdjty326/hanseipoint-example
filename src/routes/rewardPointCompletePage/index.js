import { FaRegWindowClose } from 'react-icons/fa';

import style from "./style.module.css";
import { useContext } from 'react';
import ContextRouter from '../../contextRouter';
import OutlineButton from "../../components/outlineButton";
import MainPage from '../mainPage';

/// 포인트 적립 완료 페이지
const RewardPointCompletePage = () => {
    const { pushAndUtilRemoved } = useContext(ContextRouter);
    return (<div className={style.RewardPointCompletePage}>
        <div className={style.RewardPointCompleteHeader}>
            <h3 className={style.RewardPointCompleteTitle}>적립 완료</h3>
        </div>
        <div className={style.RewardPointCompleteBody}>
            <div>
                <h1>적립이 완료되었습니다.</h1>
                <h3>로그인 하셔서 포인트를 사용해보세요!</h3>
            </div>
            <OutlineButton onClick={() => pushAndUtilRemoved(MainPage.name)}>
                홈으로
            </OutlineButton>
        </div>
    </div>);
};
export default RewardPointCompletePage;