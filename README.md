1. Axios Example
```typescript
import { SSHttpAgent } from "../src";
import Axios from "axios";

const main = async () => {
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

    const res = await Axios.post<any>(
        "http://internalIP/xxx",
        {},
        {
            httpAgent: this.agent,
        }
    );
    return res.data;
};
```

2. Request Example
```typescript
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
```
