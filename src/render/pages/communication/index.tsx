import React, { useEffect, useState } from "react";
import { Button, Space, message, Card, Typography } from "antd";

const Communication = () => {
  // Open the browser for one-way communication
  const openUrlByDefaultBrowser = () => {
    window.nativeBridge.openUrlByDefaultBrowser("https://www.baidu.com");
  };
  // Asynchronous bidirectional communication.
  const communicateWithEachOtherSendMsg = () => {
    window.nativeBridge.communicateWithEachOtherSendMsg("Hello");
  };
  // Synchronous bidirectional communication.
  const communicateWithEachOtherSendMsgSendSync = () => {
    const msg =
      window.nativeBridge.communicateWithEachOtherSendMsgSendSync("Hello sync");
    message.info(msg);
  };
  // Bidirectional communication with Promise
  const communicateWithEachOtherSendMsgPromise = () => {
    window.nativeBridge
      .communicateWithEachOtherSendMsgPromise("Hello Promise")
      .then((msg: any) => {
        message.info(msg);
      });
  };

  const sendMsgToWork = () => {
    window.nativeBridge.renderSendMsgToWork("I am render");
  };

  const sendMsgToWorkByMessagePort = () => {
    window.nativeBridge.renderSendMsgToWorkByMessagePort(
      "I am render, sendMsgToWorkByMessagePort"
    );
  };

  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    window.nativeBridge.onUpdateCounterByMain((e: Event, value: any) => {
      console.log("a", value);
      setCount((pre: number) => {
        console.log(pre);
        return pre + value;
      });
    });
  }, []);

  return (
    <div>
      <div style={{ fontSize: "20px" }}>
        Examples of interprocess communication
      </div>
      <Card style={{ marginTop: "20px" }} title="Render send msg to main">
        <Button onClick={openUrlByDefaultBrowser}>
          openUrlByDefaultBrowser
        </Button>
      </Card>
      <Card
        style={{ marginTop: "20px" }}
        title="Render send msg to main has replay"
      >
        <Space wrap>
          <Button onClick={communicateWithEachOtherSendMsg}>
            communicateWithEachOtherSendMsg
          </Button>
          <Button onClick={communicateWithEachOtherSendMsgSendSync}>
            communicateWithEachOtherSendMsgSendSync
          </Button>
          <Button onClick={communicateWithEachOtherSendMsgPromise}>
            communicateWithEachOtherSendMsgPromise
          </Button>
        </Space>
      </Card>
      <Card style={{ marginTop: "20px" }} title="Render send msg to work">
        <Space wrap>
          <Button onClick={sendMsgToWork}>
            sendMsgToWork
          </Button>
          <Button onClick={sendMsgToWorkByMessagePort}>
            sendMsgToWorkByMessagePort
          </Button>
        </Space>
      </Card>

      <Card style={{ marginTop: "20px" }} title="Get msg form main">
        <div>
          You can click on the IncrementNumber option in the application's menu
          bar to increase the number below.
        </div>
        <div style={{fontSize:'18px'}}>
          count is <span style={{ color: "red" }}>{count}</span>
        </div>
      </Card>
    </div>
  );
};

export default Communication;
