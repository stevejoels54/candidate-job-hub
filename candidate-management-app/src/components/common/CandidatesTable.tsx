/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, TableProps, Tag, Input, Button } from "antd";
import { ICandidate } from "../../types";
import { FaGithub, FaLinkedin, FaPlus } from "react-icons/fa";
import TableButtonActions from "./TableActionButton";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../config/actions";
import { IState } from "../../types";

type DataType = ICandidate;

// interface for table data props
interface ITableProps {
  data: DataType[];
  loarding?: boolean;
}

export const CandidatesTable: React.FC<ITableProps> = ({
  data,
  loarding,
}: ITableProps) => {
  const dispatch = useDispatch();
  const { Search } = Input;
  const [searchText, setSearchText] = useState("");
  const [deleteId, setDeleteId] = useState<string | undefined>("");

  const { deleteCandidateLoading } = useSelector(
    (state: IState) => state.candidate
  );

  const deleteRecord = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = (id: string) => {
    dispatch(actions.deleteCandidate(id));
  };

  const updateRecord = (record: ICandidate) => {
    dispatch(actions.setUpdateCandidateData(record));
    dispatch(actions.showUpdateCandidateModal());
  };

  const viewRecordDetails = (email: string) => {
    dispatch(actions.getCandidate(email));
    dispatch(actions.showCandidateDetailsModal());
  };

  // show add candidate modal
  const showAddCandidateModal = () => {
    dispatch(actions.showAddCandidateModal());
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = data.filter(
    (candidate) =>
      candidate.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      candidate.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      responsive: ["md"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (comment: string) =>
        comment ? (
          <span>
            {comment.length > 50 ? `${comment.substring(0, 50)}...` : comment}
          </span>
        ) : (
          <span>N/A</span>
        ),
      responsive: ["md"],
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedin",
      key: "linkedin",
      render: (linkedin: string) =>
        linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#0e76a8" }}
          >
            <Tag color="#0e76a8">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaLinkedin />
                <span style={{ marginLeft: 5 }}>LinkedIn</span>
              </div>
            </Tag>
          </a>
        ) : (
          <span>N/A</span>
        ),
      responsive: ["md"],
    },
    {
      title: "Github",
      dataIndex: "github",
      key: "github",
      render: (github: string) =>
        github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#333" }}
          >
            <Tag color="#333">
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaGithub />
                <span style={{ marginLeft: 5 }}>Github</span>
              </div>
            </Tag>
          </a>
        ) : (
          <span>N/A</span>
        ),
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: ICandidate) => (
        <TableButtonActions
          record={record}
          viewDetails={viewRecordDetails}
          updateRecord={updateRecord}
          confirmDelete={confirmDelete}
          deleteRecord={deleteRecord}
          deleteId={deleteId}
          deleteLoading={deleteCandidateLoading}
        />
      ),
      responsive: ["md"],
    },
  ];

  return (
    <Table
      tableLayout="fixed"
      scroll={{ x: "100%", y: 600 }}
      bordered
      loading={loarding}
      columns={columns}
      dataSource={searchText ? filteredData : data}
      rowKey={(record) => record.email}
      title={() => (
        <div className="table-title-container">
          <Button
            icon={<FaPlus />}
            type="primary"
            onClick={showAddCandidateModal}
          >
            Add Candidate
          </Button>
          <Search
            className="table-search"
            placeholder="Search candidates..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
            allowClear
          />
        </div>
      )}
    />
  );
};
