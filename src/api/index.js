const APIBASE = 'http://localhost:8443';

export const ApiSetPoint = async (phoneNumber) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user/${phoneNumber}/point`, {
        method: 'POST',
        body: JSON.stringify({
            point: 100,
        }),
    });
    return await resp.json();
};

export const ApiLogin = async (phoneNumber, userPw) => {
    const resp = await fetch(`${APIBASE}/api/hansei/login`, {
        method: 'POST',
        body: JSON.stringify({
            phoneNumber,
            userPw
        }),
    });
    return await resp.json();
};

export const ApiJoin = async (obj) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user`, {
        method: 'POST',
        body: JSON.stringify(obj),
    });
    return await resp.json();
};

export const ApiProducts = async () => {
    const resp = await fetch(`${APIBASE}/api/hansei/products`, {
        method: 'GET',
    });
    return await resp.json();
};

export const ApiCurrentPoint = async (userId) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user/${userId}/point`, {
        method: 'GET',
    });
    return await resp.json();
};

export const ApiOrder = async (userId, product_id) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user/${userId}/order`, {
        method: 'POST',
        body: JSON.stringify({
            productId: product_id
        }),
    });
    return await resp.json();
};

export const ApiBuyProducts = async (userId) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user/${userId}/orders`, {
        method: 'GET',
    });
    return await resp.json();
};

export const ApiDeleteOrder = async (userId, orderId) => {
    const resp = await fetch(`${APIBASE}/api/hansei/user/${userId}/order/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
};
