import { useContext } from "react";
import ContextRouter from "../../contextRouter";
import style from "./style.module.css";
import OutlineInput from "../../components/outlineInput";
import OutlineButton from "../../components/outlineButton";
import ProductListPage from "../productListPage";
import PlainButton from "../../components/plainButton";
import { FaArrowLeft } from 'react-icons/fa';

/// 가입페이지
const JoinPage = () => {
    const { pushAndUtilRemoved, pop } = useContext(ContextRouter);

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
            <OutlineInput className={style.JoinInput} placeholder='휴대전화번호(- 제외)' />
            <OutlineInput className={style.JoinInput} placeholder='이름' />
            <OutlineInput className={style.JoinInput} type='password' placeholder='패스워드' />
            <OutlineInput className={style.JoinInput} type='password' placeholder='패스워드확인' />

            <OutlineButton onClick={() => pushAndUtilRemoved(ProductListPage.name)}>
                가입
            </OutlineButton>
        </div>

    </div>)
};
export default JoinPage;