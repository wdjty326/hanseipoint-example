import { useContext, useState } from "react";
import OutlineButton from "../../components/outlineButton";
import OutlineInput from "../../components/outlineInput";
import JoinPage from "../joinPage";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import ProductListPage from "../productListPage";
import { FaArrowLeft } from 'react-icons/fa';
import PlainButton from "../../components/plainButton";
import { ApiLogin } from "../../api";
import ContextStore from "../../contextStore";

/// 로그인페이지
const LoginPage = () => {
    const { pushAndUtilRemoved, push, pop } = useContext(ContextRouter);
    const { storeLoginData } = useContext(ContextStore);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userPw, setUserPw] = useState('');
    return (<div className={style.LoginPage}>
        <div className={style.LoginBox}>
            <div className={style.LoginBoxText}>
                <PlainButton onClick={() => pop()}>
                    <FaArrowLeft />
                </PlainButton>
                <h3 className={style.LoginText1}>hansei</h3>
                <h3 className={style.LoginText2}>point</h3>
            </div>
            <OutlineInput
                value={phoneNumber}
                className={style.LoginInput}
                placeholder='휴대전화번호(- 제외)'
                onInput={(value) => setPhoneNumber(value.replace(/[^0-9]/g, '').slice(0, 11))}
            />
            <OutlineInput
                value={userPw}
                className={userPw.LoginInput}
                type='password'
                placeholder='패스워드'
                onInput={setUserPw}
            />
            <p className={style.LoginDescription}>
                아직 회원이 아니신가요?{' '}
                <a onClick={() => push(JoinPage.name)}>
                    회원가입
                </a>
            </p>
            <OutlineButton onClick={async () => {
                if (phoneNumber.length === 0 || userPw === 0) {
                    alert('휴대전화 및 패스워드를 입력해주세여');
                    return;
                }

                if (phoneNumber.length !== 11) {
                    alert('휴대전화가 올바르지 않습니다');
                    return;
                }

                if (userPw.length < 6) {
                    alert('패스워드가 올바르지 않습니다');
                    return;
                }

                const resp = await ApiLogin(phoneNumber, userPw);
                if (resp.code === '0000') {
                    storeLoginData(resp.data);
                    pushAndUtilRemoved(ProductListPage.name)
                } else {
                    alert('로그인에 실패하였습니다');
                }
            }}>
                로그인
            </OutlineButton>
        </div>
    </div>)
};
export default LoginPage;