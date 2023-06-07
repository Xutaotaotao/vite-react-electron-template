import { useAuth } from "@/render/auth";


function Mine() {
  let auth = useAuth();
  console.log(auth)
  return (
    <div>
      Hello👋，{auth.user}
    </div>
  );
}

export default Mine