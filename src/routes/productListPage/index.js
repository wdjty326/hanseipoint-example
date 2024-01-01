import { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import MainPage from "../mainPage";
import OutlineButton from "../../components/outlineButton";
import ProductHistoryPage from "../productHistoryPage";
import PlainButton from "../../components/plainButton";
import ContextStore from "../../contextStore";
import LoginPage from "../loginPage";
import { ApiOrder, ApiProducts } from "../../api";

/// 상품목록페이지
const ProductListPage = () => {
    const { push, pushAndUtilRemoved } = useContext(ContextRouter);
    const { loginData, removeLoginData, updatePointData } = useContext(ContextStore);
    const [products, setPruducts] = useState([]);

    useEffect(() => {
        if (!loginData) {
            alert('로그인 후 이용가능합니다.');
            pushAndUtilRemoved(LoginPage.name);
            return;
        }

        if (!products.length)
            ApiProducts().then((resp) => {
                if (resp.code === '0000') {
                    setPruducts(resp.data);
                    return;
                } else {
                    alert('목록을 가져오지 못했습니다.');
                }
            });
    }, [loginData]);

    if (!loginData) return null;
    return (<div className={style.ProductListPage}>
        <div className={style.ProductListHeader}>
            <div className={style.ProductListTitle}>
                <h5 className={style.ProductListText1}>hansei</h5>
                <h5 className={style.ProductListText2}>point</h5>
            </div>
            <div className={style.ProductListProfile}>
                <span>{loginData.name}</span>
                <span>포인트 : {loginData.point}P</span>
                <PlainButton onClick={() => push(ProductHistoryPage.name)}>
                    구매목록
                </PlainButton>
                <PlainButton onClick={() => {
                    removeLoginData();
                    pushAndUtilRemoved(MainPage.name);
                }}>
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
                {products.map((value) => {
                    return <li className={style.ProductItem}>
                        <img src={value.product_image_url} />
                        <div>
                            <p>{value.product_name}</p>
                            <p>{value.product_price}P</p>
                        </div>
                        <OutlineButton onClick={async () => {
                            const c = window.confirm('구매하시겠습니까?');
                            if (c) {
                                const resp = await ApiOrder(loginData.userId, value.product_id);
                                if (resp.code === '0000') {
                                    updatePointData();
                                    alert('구매완료되었습니다.');
                                } else {
                                    alert('포인트가 부족합니다.');
                                }
                            }
                        }}>
                            구매하기
                        </OutlineButton>
                    </li>
                })}
            </ul>
        </div>
    </div>);
};

export default ProductListPage;