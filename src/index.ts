import { Agent, AgentOptions } from "http";
import { Client, ConnectConfig } from "ssh2";

export class SSHttpAgent extends Agent {
    private _defaultSrcIP = "127.0.0.1";
    private _defaultLocalPort = 0;

    constructor(
        private readonly connectCfg: ConnectConfig,
        private readonly agentOptions?: AgentOptions
    ) {
        super(agentOptions);
    }

    createConnection(options, cb) {
        const srcIP = (options && options.localAddress) || this._defaultSrcIP;
        const srcPort =
            (options && options.localPort) || this._defaultLocalPort;
        const dstIP = options.host;
        const dstPort = options.port;

        const client = new Client();
        client
            .on("ready", () => {
                client.forwardOut(
                    srcIP,
                    srcPort,
                    dstIP,
                    dstPort,
                    (err, stream) => {
                        if (err) {
                            client.end();
                            return cb(err);
                        }
                        stream.once("close", () => {
                            client.end();
                        });
                        cb(null, this.decorateStream(stream));
                    }
                );
            })
            .on("error", cb)
            .on("close", () => {
                cb(new Error("Unexpected connection loss"));
            })
            .on(
                "keyboard-interactive",
                (name, instructions, lang, prompts, finish) => {
                    finish([this.connectCfg.password]);
                }
            )
            .connect(this.connectCfg);
    }

    decorateStream(stream) {
        stream.setKeepAlive = () => {};
        stream.setNoDelay = () => {};
        stream.setTimeout = () => {};
        stream.ref = () => {};
        stream.unref = () => {};
        stream.destroySoon = stream.destroy;
        return stream;
    }
}
