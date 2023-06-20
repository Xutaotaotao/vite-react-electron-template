import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import routes from "../route";
import { useAuth } from "../auth";
import "./index.less";
const { Sider, Content } = Layout;

function MyLayout(props: any) {
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const auth = useAuth();
  console.log(auth)

  const [hash,setHash] = useState('')

  useEffect(() => {
    setHash(window.location.hash)
  },[window.location.hash])

  const Main = () => {
    return (
      <Layout style={{ height: "100%", overflow: "hidden" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={180}
        >
          <Menu
            style={{ height: "100%", border: "none" }}
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={routes
              .filter((route) => !route.hidden)
              .map((i) => {
                return {
                  key: i.path,
                  icon: i.icon,
                  label: i.label,
                };
              })}
          />
        </Sider>
        <Layout style={{ overflow: "hidden" }}>
          <Content
            style={{
              margin: "8px 8px 8px 8px",
              padding: "8px 16px 8px 8px",
              height: "100vh",
              overflow: "auto",
              background: colorBgContainer,
              borderRadius: "4px",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  };
  return (
    <div className="layout">
      {((auth && auth.user) || hash !== '#/login') ? Main() : <Outlet />}
    </div>
  );
}

export default MyLayout;
