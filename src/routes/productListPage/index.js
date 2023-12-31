import { useContext } from "react";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import MainPage from "../mainPage";
import OutlineButton from "../../components/outlineButton";
import ProductHistoryPage from "../productHistoryPage";
import PlainButton from "../../components/plainButton";

/// 상품목록페이지
const ProductListPage = () => {
    const { push, pushAndUtilRemoved } = useContext(ContextRouter);
    return (<div className={style.ProductListPage}>
        <div className={style.ProductListHeader}>
            <div className={style.ProductListTitle}>
                <h5 className={style.ProductListText1}>hansei</h5>
                <h5 className={style.ProductListText2}>point</h5>
            </div>
            <div className={style.ProductListProfile}>
                <span>홍길동</span>
                <span>포인트 : 1000P</span>
                <PlainButton onClick={() => push(ProductHistoryPage.name)}>
                    구매목록
                </PlainButton>
                <PlainButton onClick={() => pushAndUtilRemoved(MainPage.name)}>
                    로그아웃
                </PlainButton>
            </div>
        </div>
        <div className={style.ProductListBody}>
            <h1>
                포인트로 여러 상품을 구매하실 수 있습니다.
            </h1>
            <p>
                구매 하신 상품은 우측 상단의 '구매목록' 에서 확인해주세요.
            </p>
            <ul className={style.ProductList}>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        구매하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        구매하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        구매하기
                    </OutlineButton>
                </li>
                <li className={style.ProductItem}>
                    <img src="https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg" />
                    <div>
                        <p>아이스아메리카노</p>
                        <p>1000P</p>
                    </div>
                    <OutlineButton>
                        구매하기
                    </OutlineButton>
                </li>
            </ul>
        </div>
    </div>);
};

export default ProductListPage;