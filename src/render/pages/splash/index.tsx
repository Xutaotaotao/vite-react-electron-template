import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './index.less'
import { useAuth } from '@/render/auth';


const Splash = () => {
  let auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth && auth.user)  {
      navigate("/");
    } else {
      navigate("/login");
    }
  },[auth])

  return <div className="container loader">
  <span>W</span>
  <span>E</span>
  <span>L</span>
  <span>C</span>
  <span>O</span>
  <span>M</span>
  <span>E</span>
</div>
}

export default Splash