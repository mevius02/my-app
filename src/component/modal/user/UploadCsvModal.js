import * as React from "react";
import { Modal, Form } from "react-bootstrap";
import * as constants from "../../../constants";
import Button01 from "../../button/Button01";

function UploadCsvModal(props) {
  const { uploadCsv, setCsvFile, showModalUploadCsv, modalCloseUploadCsv } =
    props;
  return (
    <Modal show={showModalUploadCsv} onHide={modalCloseUploadCsv}>
      <Modal.Header closeButton>
        <Modal.Title>CSVアップロード</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type="file"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files[0])}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button01
          variant={constants.SECONDARY}
          type={constants.BUTTON}
          label="閉じる"
          onClick={modalCloseUploadCsv}
        />
        <Button01
          variant={constants.PRIMARY}
          type={constants.BUTTON}
          label="アップロード"
          onClick={uploadCsv}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default UploadCsvModal;
