import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Card } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AuthContext } from "../component/provider/AuthContextProvider";
import * as constants from "../constants";
import Spinner01 from "../component/spinner/Spinner01";
import Button01 from "../component/button/Button01";

function LoginPage() {
  // ローディング表示フラグ
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginParams, setLoginParams] = React.useState({
    email: "",
    password: "",
  });
  // ログイン結果
  const [result, setResult] = React.useState("");
  // ログイン情報
  const { authInfo, setAuthInfo } = React.useContext(AuthContext);
  const navigate = useNavigate();

  // ログイン処理
  // ==================================================
  const login = async () => {
    setIsLoading(true);
    const url =
      constants.LOCALHOST_8080 +
      constants.MAP_URL_API +
      constants.MAP_URL_LOGIN;
    await axios
      .get(url, { params: loginParams })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.userId !== undefined &&
          response.data.userId !== null
        ) {
          console.log(response.data.userId);
          // 認証情報をContextにセット
          setAuthInfo(response.data);
          navigate(constants.MAP_URL_HOME, { state: { redirect: true } });
        } else {
          setResult("ログインに失敗しました");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? (
        <Spinner01 />
      ) : (
        <Form onSubmit={login}>
          <Row className="d-flex justify-content-center">
            <Card style={{ maxWidth: "300px" }} className="mt-3 p-3">
              {/* ■■■■■■■■■■ タイトル ■■■■■■■■■■ */}
              <Col xl={12} className="d-flex justify-content-center mb-3">
                <h1>{constants.LOGIN}</h1>
              </Col>
              {result && (
                <span className="mb-3 text-danger fw-bold">{result}</span>
              )}
              {/* ■■■■■■■■■■ ユーザID ■■■■■■■■■■ */}
              <Form.Group controlId="email" className="mb-3">
                <Col xl={12} className="d-flex justify-content-center">
                  <Form.Control
                    type="text"
                    name="email"
                    value={loginParams.email}
                    onChange={(e) =>
                      setLoginParams({ ...loginParams, email: e.target.value })
                    }
                    placeholder="ユーザID"
                  />
                </Col>
              </Form.Group>
              {/* ■■■■■■■■■■ パスワード ■■■■■■■■■■ */}
              <Form.Group controlId="password" className="mb-3">
                <Col xl={12} className="d-flex justify-content-center">
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginParams.password}
                    onChange={(e) =>
                      setLoginParams({
                        ...loginParams,
                        password: e.target.value,
                      })
                    }
                    placeholder="パスワード"
                  />
                </Col>
              </Form.Group>
              {/* ■■■■■■■■■■ [ボタン]ログイン ■■■■■■■■■■ */}
              <Col xl={12} className="d-flex justify-content-center mb-3">
                <Button01
                  variant={constants.PRIMARY}
                  type={constants.SUBMIT}
                  label={constants.LOGIN}
                />
              </Col>
              {/* ■■■■■■■■■■ [ボタン(デバッグ用)]ホーム ■■■■■■■■■■ */}
              <Col xl={12} className="d-flex justify-content-center">
                デバッグ用：
                <OverlayTrigger
                  key="tips1"
                  placement="top"
                  overlay={
                    <Tooltip id="tips1">
                      <span className="text-warning fw-bold">
                        ログイン情報チェックをオフにしないと効かない
                      </span>
                    </Tooltip>
                  }
                >
                  <Link to={constants.MAP_URL_HOME} state={{ redirect: false }}>
                    {constants.HOME}
                  </Link>
                </OverlayTrigger>
              </Col>
            </Card>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default LoginPage;
