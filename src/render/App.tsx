import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./auth";
import Layout from "./layout";
import routes from "./route";
import { useEffect } from "react";
import { Modal, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import packInfo from "../../package.json";
import { testFetch } from "@/http/service";

export default function App() {
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
    // testFetch().then(res => {
    //   console.log(res)
    // })
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
                  element={
                    route.auth ? (
                      <RequireAuth>{route.element}</RequireAuth>
                    ) : (
                      route.element
                    )
                  }
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
