import * as React from "react";
import { Link } from "react-router-dom";
import * as constants from "../../constants";

function TransitionDisallowedPage() {
  return (
    <div>
      <span>正しいページ遷移が確認できませんでした</span>
      <br />
      <span>再度ログインしなおしてください</span>
      <br />
      <Link to={constants.MAP_URL_LOGIN} state={{ redirect: false }}>
        ログイン画面へ
      </Link>
    </div>
  );
}

export default TransitionDisallowedPage;
