const http = require("http");
const nodb = require("nodb").default;

const initProductData = async () => {
    try {
        const itemTemplates = [{
            product_name: '아이스아메리카노',
            product_image_url: 'https://cdn.paris.spl.li/wp-content/uploads/211001_%EB%B9%85%EC%95%84%EC%9D%B4%EC%8A%A4%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EB%85%B8-1280.jpg',
            product_price: 1000
        }, {
            product_name: '녹차',
            product_image_url: 'https://health.chosun.com/site/data/img_dir/2023/06/16/2023061602342_0.jpg',
            product_price: 2000,
        }, {
            product_name: '아리피규어',
            product_image_url: 'https://img.danawa.com/prod_img/500000/791/519/img/15519791_1.jpg?_v=20211026132708',
            product_price: 30000,
        }, {
            product_name: '신상혁',
            product_image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL9rkCP9JN_N9lwkcmbtQJWOAiY2jnrzyiTWDK8itnKNxnyNkegQ0vZX9VHm994IvhlJQ&usqp=CAU',
            product_price: 999999999,
        }, {
            product_name: '베라아이스크림',
            product_image_url: 'https://www.spcmagazine.com/wp-content/uploads/2019/07/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B0%B0%EC%8A%A4%ED%82%A8%EB%9D%BC%EB%B9%88%EC%8A%A4_-%EC%9D%B8%EA%B8%B0-%ED%94%8C%EB%A0%88%EC%9D%B4%EB%B2%84-2%EC%A2%85-%EC%9E%AC%EC%B6%9C%EC%8B%9C.jpg',
            product_price: 5000,
        }]
        for (var i = 0; i < 100; i++) {
            await db.insertData("product", {
                product_id: i,
                ...itemTemplates[Math.floor(Math.random() * 4)],
            });
        }
    } catch (e) { }
};

const db = nodb.getInstance();
db.createFile("user",
    { name: "userId", primary: true },
    { name: "phoneNumber", primary: true },
    { name: "userPw" },
    { name: "name" },
    { name: "point" },
)
    .then(() => { })
    .catch(() => { });
db.createFile("product",
    { name: "product_id", primary: true },
    { name: "product_name" },
    { name: "product_image_url" },
    { name: "product_price" },
)
    .then(initProductData)
    .catch(initProductData);
db.createFile("my_product",
    { name: "idx", primary: true },
    { name: "userId" },
    { name: "product_id" },
)
    .then(() => { })
    .catch(() => { });

const commonHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
    const pathname = req.url || "/";
    console.log(`Request for ${pathname} ${req.method} received.`);

    if (pathname === "favicon.ico") return res.end();
    if (pathname === "/") {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Content-Type": "text/html",
        });

        res.write("Welcome Test Server");
        return res.end();
    }

    try {

        if (req.method === "GET") {
            if (/\/api\/hansei\/user\/([0-9]{1,})\/point/.test(pathname)) {
                const userId = +(pathname.replace(/\/api\/hansei\/user\/([0-9]{1,})\/point/, (p0, p1) => p1));

                const data = await db.selectOne("user", (data) => data.userId === userId);
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                    data: data.point,
                }));
            } else if (pathname === '/api/hansei/products') {
                const datas = await db.select("product", (data) => true);
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                    data: datas,
                }));
            } else if (/\/api\/hansei\/user\/([0-9]{1,})\/orders/.test(pathname)) {
                const userId = +(pathname.replace(/\/api\/hansei\/user\/([0-9]{1,})\/orders/, (p0, p1) => p1));
                const datas = await db.select("my_product", (data) => data.userId === userId);
                const result = [];
                for (var i = 0; i < datas.length; i++) {
                    var product = await db.selectOne("product", (data) => data.product_id === datas[i].product_id);
                    if (product) {
                        result.push({
                            order_id: datas[i].idx,
                            ...product
                        });
                    }
                }
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                    data: result,
                }));
            }
        } else if (req.method === "POST") {
            const postdata = await (new Promise((resolve, reject) => {
                const chunks = [];
                req.on("data", (data) => {
                    chunks.push(data);
                });
                req.on("end", () => {
                    try {
                        const postdata = JSON.parse(Buffer.from(Buffer.concat(chunks), "utf8").toString());
                        resolve(postdata);
                    } catch (e) {
                        reject(e);
                    }
                });
            }));

            if (pathname.startsWith("/api/hansei/login")) {
                const datas = await db.select("user", (data) => data.phoneNumber === postdata.phoneNumber && data.password === postdata.password);
                if (datas.length === 0) {
                    res.writeHead(404, commonHeader);
                    return res.end(JSON.stringify({
                        code: '1001',
                        message: '',
                    }));
                } else {
                    res.writeHead(200, commonHeader);
                    return res.end(JSON.stringify({
                        code: '0000',
                        message: '',
                        data: datas[0],
                    }));
                }
            } else if (/\/api\/hansei\/user\/([0-9]{1,})\/point/.test(pathname)) {
                const phoneNumber = pathname.replace(/\/api\/hansei\/user\/([0-9]{1,})\/point/, (p0, p1) => p1);
                const data = await db.selectOne("user", (data) => {
                    return data.phoneNumber === phoneNumber;
                });
                if (data) {
                    data.point += postdata.point;
                    db.updateData("user", data);
                    res.writeHead(200, commonHeader);
                    return res.end(JSON.stringify({
                        code: '0000',
                        message: '',
                        data: data.point,
                    }));
                }
            } else if (/\/api\/hansei\/user\/([0-9]{1,})\/order/.test(pathname)) {
                const userId = +(pathname.replace(/\/api\/hansei\/user\/([0-9]{1,})\/order/, (p0, p1) => p1));
                const userData = await db.selectOne("user", (data) => data.userId === userId);
                const productData = await db.selectOne("product", (data) => data.product_id === postdata.productId);
                if (userData.point < productData.product_price) {
                    res.writeHead(404, commonHeader);
                    return res.end(JSON.stringify({
                        code: '1001',
                        message: '',
                    }));
                }
                await db.insertData("my_product", {
                    idx: Date.now(),
                    userId,
                    product_id: productData.product_id,
                });
                await db.updateData("user", {
                    ...userData,
                    point: userData.point - productData.product_price,
                });
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                }));
            } else if (pathname.startsWith("/api/hansei/user")) {
                const datas = await db.select("user", (data) => data.phoneNumber === postdata.phoneNumber);
                if (datas.length !== 0) {
                    res.writeHead(404, commonHeader);
                    return res.end(JSON.stringify({
                        code: '1002',
                        message: '',
                    }));
                }

                var obj = Object.assign(postdata, { userId: Date.now(), point: 1000 });
                await db.insertData("user", obj);
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                    data: obj,
                }));
            }
        } else if (req.method === "DELETE") {
            if (/\/api\/hansei\/user\/([0-9]{1,})\/order\/([0-9]{1,})/.test(pathname)) {
                let userId = 0, order_id = 0;
                (pathname.replace(/\/api\/hansei\/user\/([0-9]{1,})\/order\/([0-9]{1,})/, (p0, p1, p2) => {
                    console.log(p0, p1, p2)
                    userId = +p1;
                    order_id = +p2;
                    return p0;
                }));
                const userData = await db.selectOne("user", (data) => data.userId === userId);
                const orderData = await db.selectOne("my_product", (data) => data.idx === order_id);
                if (!orderData) {
                    res.writeHead(404, commonHeader);
                    return res.end(JSON.stringify({
                        code: '1001',
                        message: '오더가없습니다',
                    }));
                }
                const productData = await db.selectOne("product", (data) => data.product_id === orderData.product_id);
                await db.deleteData("my_product", orderData);
                await db.updateData("user", {
                    ...userData,
                    point: userData.point + productData.product_price,
                });
                res.writeHead(200, commonHeader);
                return res.end(JSON.stringify({
                    code: '0000',
                    message: '',
                }));
            }
        } else if (req.method === "OPTIONS") {
            res.writeHead(200, {

                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            });
            return res.end();
        }

        res.writeHead(404, commonHeader);
        return res.end(JSON.stringify({
            code: '1000',
            message: '',
        }));
    } catch (e) {
        console.error(e);

        res.writeHead(404, commonHeader);
        return res.end(JSON.stringify({
            code: '1000',
            message: '',
        }));
    }
});
server.on("listening", () => {
    console.log("server listening 8443");
});
server.listen("8443");