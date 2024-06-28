import React from "react";
import { Modal, Alert, Avatar, Typography, Space, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../../types";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { actions } from "../../../config/actions";
import { isEmpty } from "lodash";

const { Title, Text } = Typography;

const CandidateDetails: React.FC = () => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(actions.showCandidateDetailsModal());
  };

  const { candidateDetailsModalVisible } = useSelector(
    (state: IState) => state.appUi
  );

  const { candidateLoading, candidateSuccess } = useSelector(
    (state: IState) => state.candidate
  );

  const candidate = candidateSuccess;

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <Modal
      title="CANDIDATE DETAILS"
      onCancel={handleCancel}
      footer={null}
      open={candidateDetailsModalVisible}
      width={600}
    >
      {candidateLoading ? (
        <Alert message="Loading..." type="info" />
      ) : isEmpty(candidate) ? (
        <Alert message="No candidate details available." type="warning" />
      ) : (
        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space align="center">
              <Avatar
                size={64}
                style={{
                  backgroundColor: stringToColor(
                    candidate.firstName + candidate.lastName
                  ),
                  verticalAlign: "middle",
                }}
              >
                {candidate.firstName[0]}
                {candidate.lastName[0]}
              </Avatar>
              <div>
                <Title level={4}>
                  {candidate.firstName} {candidate.lastName}
                </Title>
                <Text>Email: {candidate.email}</Text>
              </div>
            </Space>
            <Divider />
            <div>
              <Text strong>Phone:</Text> {candidate.phoneNumber || "N/A"}
            </div>
            <div>
              <Text strong>Comment:</Text> {candidate.comment || "No comments"}
            </div>
            <Divider />
            <div>
              <Space>
                {candidate.linkedin && (
                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} color="#0e76a8" />
                  </a>
                )}
                {candidate.github && (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={24} color="#000" />
                  </a>
                )}
              </Space>
            </div>
          </Space>
        </div>
      )}
    </Modal>
  );
};

export default CandidateDetails;
