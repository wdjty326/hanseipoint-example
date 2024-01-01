import { useContext, useState } from "react";
import ContextRouter from "../../contextRouter";
import style from "./style.module.css";
import OutlineInput from "../../components/outlineInput";
import OutlineButton from "../../components/outlineButton";
import ProductListPage from "../productListPage";
import PlainButton from "../../components/plainButton";
import { FaArrowLeft } from 'react-icons/fa';
import ContextStore from "../../contextStore";
import { ApiJoin } from "../../api";

/// 가입페이지
const JoinPage = () => {
    const { pushAndUtilRemoved, pop } = useContext(ContextRouter);
    const { storeLoginData } = useContext(ContextStore);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [userPw, setUserPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    return (<div className={style.JoinPage}>
        <div className={style.JoinBox}>
            <div className={style.JoinBoxText}>
                <PlainButton onClick={() => pop()}>
                    <FaArrowLeft />
                </PlainButton>
                <h3 className={style.JoinText1}>hansei</h3>
                <h3 className={style.JoinText2}>point</h3>
            </div>
            <p className={style.JoinDescription}>
                회원정보를 입력해주세요.
            </p>
            <OutlineInput
                className={style.JoinInput}
                value={phoneNumber}
                onInput={(value) => setPhoneNumber(value.replace(/[^0-9]/g, '').slice(0, 11))}
                placeholder='휴대전화번호(- 제외)' />
            <OutlineInput className={style.JoinInput} value={name} onInput={setName} placeholder='이름' />
            <OutlineInput className={style.JoinInput} value={userPw} onInput={setUserPw} type='password' placeholder='패스워드' />
            <OutlineInput className={style.JoinInput} value={checkPw} onInput={setCheckPw} type='password' placeholder='패스워드확인' />

            <OutlineButton onClick={async () => {
                if (!phoneNumber.length || !name.length || !userPw.length || !checkPw.length) {
                    alert('항목을 입력해주세요');
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

                if (userPw !== checkPw) {
                    alert('패스워드가 맞지 않습니다');
                    return;
                }

                const resp = await ApiJoin({
                    phoneNumber,
                    name,
                    userPw,
                });
                if (resp.code === '0000') {
                    storeLoginData(resp.data);                    
                    pushAndUtilRemoved(ProductListPage.name);
                } else {
                    alert('중복 가입된 계정입니다.');
                }
            }}>
                가입
            </OutlineButton>
        </div>

    </div>)
};
export default JoinPage;