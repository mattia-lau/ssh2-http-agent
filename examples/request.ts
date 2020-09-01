import { request } from "http";
import { SSHttpAgent } from "../src";

const main = () => {
    const agent = new SSHttpAgent(
        {
            host: "xxx.xxx.xxx.xxx",
            username: "root",
            password: "12345678",
            port: 22,
            tryKeyboard: true,
            readyTimeout: 2000,
        },
        {
            timeout: 3000,
            keepAlive: true,
            maxSockets: 5,
            maxFreeSockets: 5,
            keepAliveMsecs: 1000 * 60 * 60,
        }
    );

    request(
        {
            hostname: "",
            port: 80,
            path: "/",
            method: "post",
            agent,
        },
        (res) => {
            // ....
        }
    );
};
