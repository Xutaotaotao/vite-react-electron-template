import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button,Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import reactLogo from "@/render/assets/react.svg";
import { useAuth } from "@/render/auth";
import viteSvg from '@/render/assets/vite.svg'
import "./index.less";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    let from = location.state?.from?.pathname || "/";
    auth.signin(values.username, () => {
      navigate(from, { replace: true });
    });
  };


  return (
    <div className="login-page">
      <div className="logo-section">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteSvg} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>
      </div>

      <div className="login-section">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
