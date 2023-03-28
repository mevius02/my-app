import * as React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Card, Nav } from "react-bootstrap";
import * as constants from "../constants";
import Button01 from "../component/button/Button01";
import { AuthContext } from "../component/provider/AuthContextProvider";

function HomePage() {
  const { authInfo, setAuthInfo } = React.useContext(AuthContext);

  // デバッグ用
  // ==================================================
  const showDebug = () => {
    alert(
      "ログイン情報\nuserId：" +
        authInfo?.userId +
        "\ninsertTimestamp：" +
        authInfo?.insertTimestamp
    );
  };

  // デバッグ用
  // ==================================================
  const deleteAuth = () => {
    setAuthInfo(null);
  };

  return (
    <Row>
      {/* ■■■■■■■■■■ タイトル ■■■■■■■■■■ */}
      <Col xs={12}>
        <h2 className="col-12">{constants.TITLE_HOME}</h2>
      </Col>
      {/* ■■■■■■■■■■ リンク ■■■■■■■■■■ */}
      <Col xs={12}>
        <Card className="col-12">
          <Nav className="flex-column">
            <Nav.Link
              as={NavLink}
              to={constants.MAP_URL_LOGIN}
              state={{ redirect: false }}
            >
              {constants.LOGIN}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={constants.MAP_URL_MST_USER}
              state={{ redirect: false }}
            >
              {constants.USER}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={constants.MAP_URL_USERDETAIL}
              state={{ redirect: false }}
            >
              {constants.USERDETAIL}
              {"(ホーム画面からは遷移不許可)"}
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to={constants.MAP_URL_NOT_FOUND}
              state={{ redirect: false }}
            >
              NotFoundErrorPage
            </Nav.Link>
            <Nav.Link as={NavLink} to="/abcde" state={{ redirect: false }}>
              存在しないURLの場合：/abcde
            </Nav.Link>
          </Nav>
        </Card>
      </Col>
      <Col xl={12} className="d-flex justify-content-center mt-3">
        デバッグ用：
        <Button01 onClick={showDebug} label="ログイン情報" />
      </Col>
      <Col xl={12} className="d-flex justify-content-center mt-3">
        デバッグ用：
        <Button01 onClick={deleteAuth} label="ログイン情報削除" />
      </Col>
    </Row>
  );
}

export default HomePage;
