import { Button, Space, message, Card, Typography } from "antd";


function Native() {
  const callNativeSumByDylib = () => {
    const data = {
      parmasOne: 1,
      parmasTwo: 21,
    }
    window.nativeBridge
      .callNativeSumByDylib(data)
      .then((res: any) => {
        message.info(`${data.parmasOne} + ${data.parmasTwo} = ${res}`)
      });
  };
  const callNativeSumByRustnode = () => {
    const data = {
      parmasOne: 22,
      parmasTwo: 21,
    }
    window.nativeBridge
      .callNativeSumByRustnode({
        parmasOne: 22,
        parmasTwo: 21,
      })
      .then((res: any) => {
        message.info(`${data.parmasOne} + ${data.parmasTwo} = ${res}`)
      });
  }

  const callNativeSubtractionByRustnode = () => {
    const data = {
      parmasOne: 100,
      parmasTwo: 21,
    }
    window.nativeBridge
      .callNativeSubtractionByRustnode(data)
      .then((res: any) => {
        message.info(`${data.parmasOne} - ${data.parmasTwo} = ${res}`)
      });
  }
  return (
    <div>
      <div style={{ fontSize: "20px" }}>
        Examples of calling DLL and writing node files with Rust.
        <Space wrap style={{ marginTop: "20px" }}>
          <Button onClick={callNativeSumByDylib}>callNativeSumByDylib</Button>
          <Button onClick={callNativeSumByRustnode}>
          callNativeSumByRustnode
          </Button>
          <Button onClick={callNativeSubtractionByRustnode}>
          callNativeSubtractionByRustnode
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Native;
