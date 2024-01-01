import { useContext, useEffect, useState } from "react";
import OutlineButton from "../../components/outlineButton";
import style from "./style.module.css";
import ContextRouter from "../../contextRouter";
import PlainButton from "../../components/plainButton";
import MainPage from "../mainPage";
import { FaArrowLeft } from "react-icons/fa";
import ContextStore from "../../contextStore";
import { ApiBuyProducts, ApiDeleteOrder } from "../../api";
import LoginPage from "../loginPage";

/// 구매상품목록페이지
const ProductHistoryPage = () => {
    const { pop, pushAndUtilRemoved } = useContext(ContextRouter);
    const { loginData, removeLoginData } = useContext(ContextStore);
    const [products, setPruducts] = useState([]);

    useEffect(() => {
        if (!loginData) {
            alert('로그인 후 이용가능합니다.');
            pushAndUtilRemoved(LoginPage.name);
            return;
        }
        ApiBuyProducts(loginData.userId).then((resp) => {
            if (resp.code === '0000') {
                setPruducts(resp.data);
                return;
            } else {
                alert('목록을 가져오지 못했습니다.');
            }
        });
    }, [loginData]);

    if (!loginData) return null;
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
                <span>{loginData.name}</span>
                <span>포인트 : {loginData.point}P</span>
                <PlainButton onClick={() => {
                    removeLoginData();
                    pushAndUtilRemoved(MainPage.name);
                }}>
                    로그아웃
                </PlainButton>
            </div>
        </div>
        <div className={style.ProductHistoryBody}>
            <p>
                구매 하신 상품을 취소하시려면 상품 우측의 '취소하기'를 눌러주세요.
            </p>
            <ul className={style.ProductHistory}>
                {products.map((value, idx) => {
                    return <li className={style.ProductItem}>
                        <img src={value.product_image_url} />
                        <div>
                            <p>{value.product_name}</p>
                            <p>{value.product_price}P</p>
                        </div>
                        <OutlineButton onClick={async () => {
                            const c = window.confirm('취소하시겠습니까?');
                            if (c) {
                                const resp = await ApiDeleteOrder(loginData.userId, value.order_id);
                                if (resp.code === '0000') {
                                    setPruducts(prev => {
                                        const clone = prev.concat([]);
                                        clone.splice(idx, 1);
                                        return clone;
                                    });
                                    alert('취소완료되었습니다.');
                                } else {
                                    alert('취소에 실패하였습니다.');
                                }
                            }
                        }}>
                            취소하기
                        </OutlineButton>
                    </li>
                })}
            </ul>
        </div>
    </div>);
};
export default ProductHistoryPage;