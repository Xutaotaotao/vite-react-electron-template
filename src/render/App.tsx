import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout";
import routes from "./route";
import { useEffect, useState } from "react";
import { Modal, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import packInfo from "../../package.json";
import { gloabReadDbData } from "@/lowdb";
import { AuthProvider} from "./auth";

export default function App() {
  const navigate = useNavigate()
  // let auth = useAuth();
  // const [hasAuth,setHasAuth] = useState(false)

  // useEffect(() => {
  //   if (auth && auth.user) {
  //     setHasAuth(true)
  //   } else {
  //     navigate("/login");
  //     setHasAuth(false)
  //   }
  // },[])

  useEffect(() => {
    window.nativeBridge.onAppUpdateDownloaded((e: any, value: any) => {
      console.log(e, value);
      if (value) {
        Modal.confirm({
          title: "提示",
          content: "新版本已经下载完成，去更新吧",
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            window.nativeBridge.intsallUpdateApp();
          },
        });
      }
    });
    gloabReadDbData("vite-react-electron-template").then((res: any) => {
      console.log(res);
    });
    window.nativeBridge.onLoginOutFromMain(() => {
      navigate("/login");
    })
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Route>
        </Routes>
      </AuthProvider>
      <div className="info-tip">
        <Popover
          placement="right"
          content={packInfo.version}
          title="Version"
          trigger="hover"
        >
          <InfoCircleOutlined rev={undefined} />
        </Popover>
      </div>
    </div>
  );
}
