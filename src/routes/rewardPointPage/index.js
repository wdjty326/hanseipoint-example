import { FaRegWindowClose } from 'react-icons/fa';

import style from "./style.module.css";
import { useContext } from 'react';
import ContextRouter from '../../contextRouter';
import RewardPointCompletePage from '../rewardPointCompletePage';

/// 포인트 적립 페이지
const RewardPointPage = () => {
    const { pop, push } = useContext(ContextRouter);
    return (<div className={style.RewardPointPage}>
        <div className={style.RewardPointHeader}>
            <h3 className={style.RewardPointTitle}>휴대전화번호를 눌러주세요.</h3>
            <button className={style.RewardPointClose}
                onClick={() => pop()}
            >
                <FaRegWindowClose size={30} />
            </button>
        </div>
        <div className={style.RewardPointSide}>
            <div className={style.RewardPointBox}>
                <span className={style.RewardPointHighlight}>100 P</span> 적립
            </div>
            <div className={style.RewardPointBox}>
                <p>Kakao<b>Talk</b></p>
                입력하신 휴대전화번호로 매장의 카카오톡 알림톡이 전송 안됩니다.
            </div>
        </div>
        <div className={style.RewardPointBody}>
            <div className={style.RewardPointInput}>
                <input readOnly />
                <p><a>이용약관</a>과 <a>개인정보 취급방침</a>에 동의하시면 휴대전화 번호 입력 후 아래 적립 버튼을 터치하세요.</p>
            </div>
            <div className={style.RewardPointPad}>
                <button className={style.RewardPointPadButton}>1</button>
                <button className={style.RewardPointPadButton}>2</button>
                <button className={style.RewardPointPadButton}>3</button>
                <button className={style.RewardPointPadButton}>4</button>
                <button className={style.RewardPointPadButton}>5</button>
                <button className={style.RewardPointPadButton}>6</button>
                <button className={style.RewardPointPadButton}>7</button>
                <button className={style.RewardPointPadButton}>8</button>
                <button className={style.RewardPointPadButton}>9</button>
                <button className={style.RewardPointPadButton}>←</button>
                <button className={style.RewardPointPadButton}>0</button>
                <button className={style.RewardPointPadButton} onClick={() => push(RewardPointCompletePage.name)}>적립</button>
            </div>
        </div>
    </div>);
};
export default RewardPointPage;