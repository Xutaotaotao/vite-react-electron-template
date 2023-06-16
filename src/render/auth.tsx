import { gloabReadDbData, gloabWriteDbData } from "@/lowdb";
import React, { useEffect } from "react";
import {
  useLocation,
  Navigate,
} from "react-router-dom";
export const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

interface AuthContextType {
  user: any;
  signin: (user: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);
  const init = () => {
    gloabReadDbData('user').then((res:any) => {
      setUser(res)
    })
  }

  const signin = (newUser: any, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      gloabWriteDbData({
        key:'user',
        value: newUser
      }).then(() => {
        callback();
      })
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      gloabWriteDbData({
        key:'user',
        value: ''
      }).then(() => {
        callback();
      })
    });
  };

  useEffect(() => {
    init()
  },[])

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthStatus() {
  let auth = useAuth();
  console.log('auth',auth)
  if (auth && auth.user) {
    return true
  }
  return false
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  console.log(auth,'RequireAuth')
  if ( !auth || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

