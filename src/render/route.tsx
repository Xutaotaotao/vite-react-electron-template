import { HomeOutlined, UserOutlined,ApiOutlined,AndroidOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Home from "./pages/home";
import Communication from "./pages/communication";
import Login from "./pages/login";
import Native from "./pages/native";

const routes = [
  {
    path: "/login",
    hidden: true,
    label: <Link to="/communication">Communication</Link>,
    element: <Login />
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
]

export default routes