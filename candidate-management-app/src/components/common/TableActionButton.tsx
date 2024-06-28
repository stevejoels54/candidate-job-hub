/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Popconfirm, Popover, Space } from "antd";
import { ICandidate } from "../../types";

interface ITableButtonActions {
  viewDetails?: (id: any, record: any) => void;
  updateRecord?: (record: any) => void;
  confirmDelete?: (id: any, record: any) => void;
  deleteLoading?: boolean;
  record: ICandidate;
  deleteId?: any;
  deleteRecord?: (id: any, record: any) => void;
  extraActions?: any;
}

const TableButtonActions = ({
  viewDetails,
  updateRecord,
  confirmDelete,
  deleteLoading,
  record,
  deleteId,
  deleteRecord,
  extraActions,
}: ITableButtonActions) => {
  const viewRecordDetails = () =>
    viewDetails && viewDetails(record?.email, record);
  const updateRecordDetails = () => updateRecord && updateRecord(record);
  const confirmDeleteRecord = () =>
    confirmDelete && confirmDelete(record.email, record);
  const deleteRow = () => deleteRecord && deleteRecord(record.email, record);

  return (
    <Popover
      placement="bottom"
      trigger="click"
      content={
        <Space direction="vertical">
          {extraActions}
          {viewDetails && (
            <Button style={{ width: "100%" }} onClick={viewRecordDetails}>
              More
            </Button>
          )}
          {updateRecord && (
            <Button
              type="primary"
              onClick={updateRecordDetails}
              style={{ width: "100%" }}
            >
              Edit
            </Button>
          )}
          <Popconfirm
            okText="Yes"
            cancelText="No"
            onConfirm={confirmDeleteRecord}
            title="Are you sure you want to delete this ?"
          >
            {deleteRecord && (
              <Button
                onClick={deleteRow}
                loading={deleteId === record.id ? deleteLoading : false}
                danger
                type="primary"
                style={{ width: "100%" }}
              >
                Delete
              </Button>
            )}
          </Popconfirm>
        </Space>
      }
    >
      <Button className="d-none d-md-block">Actions</Button>
    </Popover>
  );
};

export default TableButtonActions;
