import { unauthorizedFetch } from "@/http/service"
import { Button, Space } from "antd"



const HttpTest = () => {

  const mainUnauthorizedFetch = () => {
    window.nativeBridge.unauthorizedFetch()
  }

  return <div>
    <Space>
      <Button onClick={unauthorizedFetch}>401（render）</Button>
      <Button onClick={mainUnauthorizedFetch}>401（main）</Button>
    </Space>
  </div>
}

export default HttpTest