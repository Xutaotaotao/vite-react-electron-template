import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './index.less'
const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  },[])

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