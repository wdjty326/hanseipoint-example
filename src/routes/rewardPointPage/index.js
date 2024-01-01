import { FaRegWindowClose } from 'react-icons/fa';

import style from "./style.module.css";
import { useContext, useState } from 'react';
import ContextRouter from '../../contextRouter';
import RewardPointCompletePage from '../rewardPointCompletePage';
import { ApiSetPoint } from '../../api';
import ContextStore from '../../contextStore';

/// 포인트 적립 페이지
const RewardPointPage = () => {
    const { pop, push } = useContext(ContextRouter);
    const [phoneNumber, setPhoneNumber] = useState('');

    const padClick = (e) => {
        const value = e.target.value;
        setPhoneNumber(prev => {
            const phoneString = (prev.replace(/[^0-9]/g, '') + value).slice(0, 11);
            console.log(phoneString);
            return phoneString.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/\-{1,2}$/g, "");
        });
    };

    const backspaceClick = (e) => {
        setPhoneNumber(prev => {
            const phoneString = prev.replace(/[^0-9]/g, '');
            return phoneString.slice(0, phoneString.length - 1).replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/\-{1,2}$/g, "");
        });
    };

    const setPoint = async () => {
        const resp = await ApiSetPoint(phoneNumber.replace(/[^0-9]/g, ''));
        if (resp.code === '0000') {
            push(RewardPointCompletePage.name);
        } else {
            alert('폰번호가 없습니다.');
        }
    }

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
                <input value={phoneNumber} readOnly />
                <p><a>이용약관</a>과 <a>개인정보 취급방침</a>에 동의하시면 휴대전화 번호 입력 후 아래 적립 버튼을 터치하세요.</p>
            </div>
            <div className={style.RewardPointPad}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => <button key={`RewardPointPadButton-${value}`} className={style.RewardPointPadButton} value={value} onClick={padClick}>{value}</button>)}
                <button className={style.RewardPointPadButton} onClick={backspaceClick}>←</button>
                <button className={style.RewardPointPadButton} value={0} onClick={padClick}>0</button>
                <button className={style.RewardPointPadButton} disabled={!(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber))} onClick={setPoint}>적립</button>
            </div>
        </div>
    </div>);
};
export default RewardPointPage;