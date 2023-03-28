import * as React from "react";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
import Button01 from "../../../button/Button01";
import * as constants from "../../../../constants";

function SearchForm(props) {
  const { searchUserList, downloadCsv, searchParams, setSearchParams } = props;
  const [enumList, setEnumList] = React.useState([]);

  // React.useEffect(() => {
  //   axios
  //     .get(
  //       constants.LOCALHOST_8080 +
  //         constants.MAP_URL_GET_ENUM +
  //         constants.MAP_URL_ENABLED_FLG
  //     )
  //     .then((response) => {
  //       setEnumList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Form onSubmit={searchUserList}>
      <Row>
        {/* ■■■■■■■■■■ ユーザID ■■■■■■■■■■ */}
        <Col xs={12} sm={4} lg={2} xl={2} xx={1}>
          <Form.Group>
            <Form.Label htmlFor="userId">{constants.USER_ID}</Form.Label>
            <Form.Control
              type="text"
              name="userId"
              value={searchParams.userId}
              onChange={(e) =>
                setSearchParams({ ...searchParams, userId: e.target.value })
              }
              placeholder={constants.USER_ID}
            />
          </Form.Group>
        </Col>
        {/* ■■■■■■■■■■ ユーザ名 ■■■■■■■■■■ */}
        <Col xs={12} sm={4} lg={2} xl={2} xx={1}>
          <Form.Group>
            <Form.Label htmlFor="userNm">{constants.USER_NM}</Form.Label>
            <Form.Control
              type="text"
              name="userNm"
              value={searchParams.userNm}
              onChange={(e) =>
                setSearchParams({ ...searchParams, userNm: e.target.value })
              }
              placeholder={constants.USER_NM}
            />
          </Form.Group>
        </Col>
        {/* <Col xs={12} sm={4} lg={2} xl={2} xx={1}>
          <Form.Group>
            <Form.Label htmlFor="enabledFlg">有効無効</Form.Label>
            <Form.Select>
              <option value=""></option>
              <option value="valid">有効</option>
              <option value="invalid">無効</option>
            </Form.Select>
          </Form.Group>
        </Col> */}
      </Row>
      <Row>
        <Col className="d-flex justify-content-between mt-2">
          {/* ■■■■■■■■■■ 検索ボタン ■■■■■■■■■■ */}
          <Button01
            variant={constants.PRIMARY}
            type={constants.SUBMIT}
            label={constants.SEARCH}
            onClick={searchUserList}
          ></Button01>
          {/* ■■■■■■■■■■ CSVダウンロードボタン ■■■■■■■■■■ */}
          <Button01
            variant={constants.SECONDARY}
            type={constants.BUTTON}
            label={constants.CSV}
            onClick={downloadCsv}
          ></Button01>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchForm;
