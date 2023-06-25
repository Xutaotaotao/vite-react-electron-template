import { unauthorizedFetch } from "@/http/service"
import { Button, Space } from "antd"



const HttpTest = () => {

  const mainUnauthorizedFetch = () => {
    window.nativeBridge.unauthorizedFetch()
  }

  const workUnauthorizedFetch = () => {
    window.nativeBridge.renderSendMsgToWork('unauthorizedFetch')
  }

  return <div>
    <Space>
      <Button onClick={unauthorizedFetch}>401（render）</Button>
      <Button onClick={mainUnauthorizedFetch}>401（main）</Button>
      <Button onClick={workUnauthorizedFetch}>401（work）</Button>
    </Space>
  </div>
}

export default HttpTest