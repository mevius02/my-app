import * as React from "react";
import { Table } from "react-bootstrap";
import * as constants from "../../../../constants";

function SerchList(props) {
  const { userList } = props;

  return (
    <Table striped bordered hover size="sm" style={{ margin: 0 }}>
      <thead>
        <tr className="text-center text-nowrap sticky-top bg-white">
          <th>No</th>
          <th>更新回数</th>
          <th>{constants.USER_ID}</th>
          <th>{constants.USER_NM}</th>
          <th>アカウント有効期限</th>
          <th>パスワード有効期限</th>
          <th>アカウント有効フラグ</th>
          <th>
            {constants.INSERT}
            {constants.USER_ID}
          </th>
          <th>追加日時</th>
          <th>
            {constants.UPDATE}
            {constants.USER_ID}
          </th>
          <th>更新日時</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user, index) => (
          <tr key={user.userId} className="text-nowrap">
            <td className="text-center">{index + 1}</td>
            <td>{user.updateCnt}</td>
            <td>{user.userId}</td>
            <td>{user.userNm}</td>
            <td className="text-center">{user.accountExpiration}</td>
            <td className="text-center">{user.passwordExpiration}</td>
            <td className="text-center">{user.enabled}</td>
            <td>{user.insertUserId}</td>
            <td className="text-center">{user.insertTimestamp}</td>
            <td>{user.updateUserId}</td>
            <td className="text-center">{user.updateTimestamp}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SerchList;
