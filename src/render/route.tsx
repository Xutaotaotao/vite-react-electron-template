import { HomeOutlined, UserOutlined,ApiOutlined,AndroidOutlined,WifiOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Home from "./pages/home";
import Communication from "./pages/communication";
import Login from "./pages/login";
import Native from "./pages/native";
import Splash from './pages/splash';
import HttpTest from './pages/http_test';

const routes = [
  {
    path: "*",
    hidden: true,
    label: <Link to="*">Communication</Link>,
    element: <Splash />,
    auth: true
  },
  {
    path: "/login",
    hidden: true,
    label: <Link to="/communication">Communication</Link>,
    element:  <Login />
  },
  {
    path: "/",
    icon: <HomeOutlined rev={undefined} />,
    label: <Link to="/">Home</Link>,
    element: <Home />,
    auth: true
  },
  {
    path: "/communication",
    icon: <ApiOutlined rev={undefined} />,
    label: <Link to="/communication">Communication</Link>,
    element: <Communication />,
    auth: true
  },
  {
    path: "/native",
    icon: <AndroidOutlined rev={undefined} />,
    label: <Link to="/native">Native</Link>,
    element: <Native />,
    auth: true
  },
  {
    path: "/http_test",
    icon: <WifiOutlined rev={undefined} />,
    label: <Link to="/http_test">HttpTest</Link>,
    element: <HttpTest />,
    auth: true
  }
]

export default routes