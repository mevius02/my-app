import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import Spinner01 from "../component/spinner/Spinner01";
import SearchForm from "../component/form/mst/user/SearchForm";
import SearchList from "../component/list/mst/user/SearchList";
import * as constants from "../constants";

function MstUserPage() {
  // ローディング表示フラグ
  const [isLoading, setIsLoading] = React.useState(false);
  // 検索結果データリスト
  const [userList, setUserList] = React.useState([]);
  // 検索条件値
  const [searchParams, setSearchParams] = React.useState({
    userId: "",
    userNm: "",
    // enabledFlg: true,
  });

  // 検索処理
  // ==================================================
  const searchUserList = async () => {
    setIsLoading(true);
    const url =
      constants.LOCALHOST_8080 +
      constants.MAP_URL_API +
      constants.MAP_URL_SEARCH_USER_LIST;
    await axios
      .get(url, { params: searchParams })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // CSVダウンロード処理
  // ==================================================
  const downloadCsv = async () => {
    const response = await axios.get(
      constants.LOCALHOST_8080 +
        constants.MAP_URL_API +
        constants.MAP_URL_DOWNLOAD_CSV,
      {
        params: searchParams,
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "userList.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner01 />
      ) : (
        <>
          {/* ■■■■■■■■■■ デバッグ用、リンク集 ■■■■■■■■■■ */}
          <Row>
            <Col>
              <Link to={constants.MAP_URL_HOME} state={{ redirect: false }}>
                {constants.HOME}
              </Link>
              <span>　</span>
              <Link
                to={constants.MAP_URL_USERDETAIL}
                state={{ redirect: false }}
              >
                {constants.USERDETAIL}
              </Link>
            </Col>
          </Row>
          <Row>
            {/* ■■■■■■■■■■ タイトル ■■■■■■■■■■ */}
            <Col xs={12}>
              <h2 className="col-12">{constants.TITLE_MST_USER}</h2>
            </Col>
            {/* ■■■■■■■■■■ 検索条件 ■■■■■■■■■■ */}
            <Col xs={12}>
              <Card className="col-12 mb-2 p-3">
                <SearchForm
                  searchUserList={searchUserList}
                  downloadCsv={downloadCsv}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </Card>
            </Col>
            {/* ■■■■■■■■■■ 明細 ■■■■■■■■■■ */}
            <Col xs={12}>
              <div
                className="col p-0 overflow-auto"
                style={{ maxHeight: "50vh" }}
              >
                <SearchList userList={userList} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default MstUserPage;
