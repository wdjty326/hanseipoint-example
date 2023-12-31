import { useContext } from "react";
import OutlineButton from "../../components/outlineButton";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import PlainButton from "../../components/plainButton";
import MainPage from "../mainPage";
import { FaArrowLeft } from "react-icons/fa";

/// 구매상품목록페이지
const ProductHistoryPage = () => {
    const { pop, pushAndUtilRemoved } = useContext(ContextRouter);
    return (<div className={style.ProductHistoryPage}>
        <div className={style.ProductHistoryHeader}>
            <div className={style.ProductHistoryTitle}>
                <PlainButton onClick={() => pop()}>
                    <FaArrowLeft color="#ffffff" />
                </PlainButton>
                <h5 className={style.ProductHistoryText1}>hansei</h5>
                <h5 className={style.ProductHistoryText2}>point</h5>
                <h5 className={style.ProductHistoryText3}>구매목록</h5>
            </div>
            <div className={style.ProductHistoryProfile}>
                <span>홍길동</span>
                <span>포인트 : 1000P</span>
                <PlainButton onClick={() => pushAndUtilRemoved(MainPage.name)}>
                    로그아웃
                </PlainButton>
            </div>
        </div>
        <div className={style.ProductHistoryBody}>
            <p>
                구매 하신 상품을 취소하시려면 상품 우측의 '취소하기'를 눌러주세요.
            </p>
            <ul className={style.ProductHistory}>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        취소하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        취소하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        취소하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        취소하기
                    </OutlineButton>
                </li>
            </ul>
        </div>
    </div>);
};
export default ProductHistoryPage;