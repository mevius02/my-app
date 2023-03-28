import * as React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./component/provider/AuthContextProvider";
import NotFoundPage from "./page/error/NotFoundPage";
import TransitionDisallowedPage from "./page/error/TransitionDisallowedPage";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import MstUserPage from "./page/MstUserPage";
import UserdetailListPage from "./page/UserdetailListPage";
import "./App.css";
import * as constants from "./constants";

// ■■■■■■■■■■ ログイン情報有無チェック ■■■■■■■■■■
function isAuth(authInfo, location) {
  // 遷移先URL
  const nextPath = location.pathname;
  // ログイン画面とエラー画面のみ、チェック不要
  if (
    nextPath === constants.MAP_URL_LOGIN ||
    nextPath === constants.MAP_URL_NOT_FOUND ||
    nextPath === constants.MAP_URL_TRANSITION_DISALLOWED
  ) {
    return true;
  }
  console.log(
    "ログインチェック：" + authInfo !== undefined &&
      authInfo !== null &&
      authInfo !== ""
  );
  return authInfo !== undefined && authInfo !== null && authInfo !== "";
}

// ■■■■■■■■■■ 画面遷移チェック(ロケーション, 現在URL) ■■■■■■■■■■
// １、ログイン画面以外のURL直接入力の場合エラー
// ２、遷移マッピング一覧に存在しないURLへ遷移の場合エラー
// ３、遷移マッピング一覧で遷移先URLと遷移元URLのマッピングが存在しない場合エラー
// ※<Link><Navigate>などを書く際に必ず state={{ redirect: false }} を記載する(true/false はどちらでも可)
//   → location.state = null の場合、URL直接入力遷移と判定し、遷移チェックエラーページに遷移される
// ==================================================
function isTrantision(currentPath, location) {
  // 遷移先URL
  const nextPath = location.pathname;
  // ログイン画面以外のURL直接入力の場合
  if (nextPath !== constants.MAP_URL_LOGIN && !location.state) {
    return false;
  }
  // ログイン画面以外のアプリ内遷移の場合 && 同じURLへの遷移でない場合(F5更新など)
  if (nextPath !== constants.MAP_URL_LOGIN && currentPath !== nextPath) {
    // KEY(遷移先URL)に該当する遷移マッピング一覧取得
    const transitionArr = transitionMap.get(nextPath);
    console.log(
      `■ DEBUG\n現在URL：${currentPath}\n遷移先URL：${nextPath}\n許可された遷移元URL：${transitionArr}`
    );
    // KEY(遷移先URL)に該当する遷移マッピング一覧が存在しない場合
    if (transitionArr === undefined) {
      console.log(`■ DEBUG\n遷移マッピング一覧に存在しません\nKEY=${nextPath}`);
      return false;
    }
    // 遷移マッピング一覧で許可されているか？
    const result =
      transitionArr.includes(currentPath) ||
      transitionArr[0] === constants.MAP_URL_WILD;
    console.log(
      "■ DEBUG\n遷移チェック：" + (result ? constants.OK : constants.NG)
    );
    return result;
  }
  return true;
}
// ==================================================

// ■■■■■■■■■■ 画面遷移マッピング一覧 ■■■■■■■■■■
// set(key, value配列) → set(遷移先URL, 許可する遷移元URL配列)
// ※全ての画面から遷移を許可する場合 "/*" のみセット
// ==================================================
const transitionMap = new Map();
transitionMap.set(
  constants.MAP_URL_LOGIN,
  constants.TRANSITION_PERMISSION_WILD
);
transitionMap.set(constants.MAP_URL_HOME, constants.TRANSITION_PERMISSION_HOME);
transitionMap.set(
  constants.MAP_URL_MST_USER,
  constants.TRANSITION_PERMISSION_MST_USER
);
transitionMap.set(
  constants.MAP_URL_USERDETAIL,
  constants.TRANSITION_PERMISSION_USERDETAIL
);
transitionMap.set(
  constants.MAP_URL_NOT_FOUND,
  constants.TRANSITION_PERMISSION_WILD
);
transitionMap.set(
  constants.MAP_URL_TRANSITION_DISALLOWED,
  constants.TRANSITION_PERMISSION_WILD
);
// ==================================================

function App() {
  // ログイン情報
  const { authInfo } = React.useContext(AuthContext);
  const location = useLocation();
  // 現在URL
  const [currentPath, setCurrentPath] = React.useState(
    React.useRef(location).current.pathname
  );

  React.useLayoutEffect(() => {
    // 遷移する直前に現在URLを保持する
    setCurrentPath(location.pathname);
  }, [location]);

  // 遷移チェック実施
  return isAuth(authInfo, location) && isTrantision(currentPath, location) ? (
    // 遷移チェックOKの場合
    <Routes>
      <Route exact path={constants.MAP_URL_LOGIN} element={<LoginPage />} />
      <Route exact path={constants.MAP_URL_HOME} element={<HomePage />} />
      <Route
        exact
        path={constants.MAP_URL_MST_USER}
        element={<MstUserPage />}
      />
      <Route
        exact
        path={constants.MAP_URL_USERDETAIL}
        element={<UserdetailListPage />}
      />
      {/* ■■■■■■■■■■ エラー画面 ■■■■■■■■■■ */}
      <Route
        exact
        path={constants.MAP_URL_NOT_FOUND}
        element={<NotFoundPage />}
      />
      <Route
        exact
        path={constants.MAP_URL_TRANSITION_DISALLOWED}
        element={<TransitionDisallowedPage />}
      />
    </Routes>
  ) : (
    // 遷移チェックNGの場合
    <Navigate
      to={constants.MAP_URL_TRANSITION_DISALLOWED}
      state={{ redirect: true }}
      replace
    />
  );
}

export default App;
