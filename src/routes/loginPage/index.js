import { useContext } from "react";
import OutlineButton from "../../components/outlineButton";
import OutlineInput from "../../components/outlineInput";
import JoinPage from "../joinPage";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import ProductListPage from "../productListPage";
import { FaArrowLeft } from 'react-icons/fa';
import PlainButton from "../../components/plainButton";

/// 로그인페이지
const LoginPage = () => {
    const { pushAndUtilRemoved, push, pop } = useContext(ContextRouter);
    return (<div className={style.LoginPage}>
        <div className={style.LoginBox}>
            <div className={style.LoginBoxText}>
                <PlainButton onClick={() => pop()}>
                    <FaArrowLeft />
                </PlainButton>
                <h3 className={style.LoginText1}>hansei</h3>
                <h3 className={style.LoginText2}>point</h3>
            </div>
            <OutlineInput className={style.LoginInput} placeholder='휴대전화번호(- 제외)' />
            <OutlineInput className={style.LoginInput} type='password' placeholder='패스워드' />
            <p className={style.LoginDescription}>
                아직 회원이 아니신가요?{' '}
                <a onClick={() => push(JoinPage.name)}>
                    회원가입
                </a>
            </p>
            <OutlineButton onClick={() => pushAndUtilRemoved(ProductListPage.name)}>
                로그인
            </OutlineButton>
        </div>
    </div>)
};
export default LoginPage;