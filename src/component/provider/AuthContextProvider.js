import * as React from "react";

// 初期値
const initialAuthContext = {
  authInfo: null,
  setAuthInfo: () => {},
};

// Context作成
export const AuthContext = React.createContext(initialAuthContext);

export const AuthContextProvider = ({ children }) => {
  // 認証情報をstateで管理
  const [authInfo, setAuthInfo] = React.useState(null);

  // 認証情報が変更される度に、ローカルストレージに上書き保存
  React.useEffect(() => {
    if (authInfo) {
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
    } else {
      localStorage.removeItem("authInfo");
    }
  }, [authInfo]);

  // ローカルストレージから認証情報を読込
  React.useEffect(() => {
    const storedAuthInfo = localStorage.getItem("authInfo");
    if (storedAuthInfo) {
      setAuthInfo(JSON.parse(storedAuthInfo));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
