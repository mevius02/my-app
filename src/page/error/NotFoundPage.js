import * as React from "react";
import { Link } from "react-router-dom";
import * as constants from "../../constants";

function NotFoundPage() {
  return (
    <div>
      <span>ページが見つかりませんでした</span>
      <br />
      <Link to={constants.MAP_URL_LOGIN} state={{ redirect: false }}>
        ログイン画面へ
      </Link>
    </div>
  );
}

export default NotFoundPage;
