import {Application, bodyParse, Router} from '../mod.ts';
import v2 from "./test_hand.ts";

let app = new Application(8888);
let mainRoute = new Router();
let secRout = new Router();
let v1API = new Router();

v1API.all("/user", async () => {

})

v1API.all("/login", async () => {

})

mainRoute.get("/", async (req: any, res: any) => {
    res.status = 200
    res.headers = {
        "Content-Type": "text/html",
        "Set-Cookie": "USER_TOKN=de87df",
        "X-Firefox-Spdy": "h2"
    }
    res.reply = `
        <html>
            <body>
                <form action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
                <form enctype="multipart/form-data" action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
            </body>
        </html>
    `
});

mainRoute.post("/", async (req: any, res: any) => {
    res.status = 200
    res.headers = {
        "Content-Type": "text/html",
        "Set-Cookie": "USER_TOKN=de87df",
        "X-Firefox-Spdy": "h2"
    }
    res.reply = `
        <html>
            <body>
            <h1>POST method</h1>
                <form action="/helloworld" method="post">
                    <input type="text" name="f_name">
                    <input type="text" name="l_name">
                    <input type="submit" name="submit">
                </form>
            </body>
        </html>
    `
});

mainRoute.all("/helloworld", async (req: any, res: any) => {
    res.headers = {
        "Content-Type": "text/html",
        "Set-Cookie": "AUTHOR=parthka"
    }
    let s = await bodyParse(req);
    res.reply = `${s}`
});

secRout.pre("/v1", v1API)

secRout.pre("/v2", v2);

secRout.all("/v3", async () => {

})

app.listen();

mainRoute.pre("/api", secRout);

mainRoute.set404(async (req: any, res: any) => {
    res.headers = {
        "Content-Type": "text/html"
    }
    res.reply = {error: "Opps, Page Not Found Bro"}
})

app.set(mainRoute);