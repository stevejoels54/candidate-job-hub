import React, { useMemo } from "react";
import { Button, Modal, Form, Input, Alert } from "antd";
import { actions } from "../../../config/actions";
import { useSelector, useDispatch } from "react-redux";
import { IState, ICandidate } from "../../../types";
import { isEmpty, omitBy } from "lodash";

// interface for form field type which is ICandidate without id and _id
type FieldType = Omit<ICandidate, "id" | "_id">;

const UpdateCandidate: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleCancel = () => {
    dispatch(actions.showUpdateCandidateModal());
  };

  const { updateCandidateModalVisible } = useSelector(
    (state: IState) => state.appUi
  );

  const {
    updateCandidateLoading,
    updateCandidateSuccess,
    updateCandidateError,
    updateCandidateData,
  } = useSelector((state: IState) => state.candidate);

  const onFinish = (values: FieldType) => {
    // clean up the values object by removing empty fields with lodash
    const cleanedValues = omitBy(
      values,
      (value) => value === null || value === undefined
    ) as FieldType;
    dispatch(actions.updateCandidate(cleanedValues));
  };

  useMemo(() => {
    form.setFieldsValue(updateCandidateData);
  }, [updateCandidateData, form]);

  return (
    <>
      <Modal
        title="UPDATE JOB CANDIDATE"
        open={updateCandidateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {!isEmpty(updateCandidateError) && (
          <Alert
            message={updateCandidateError.message}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        {!isEmpty(updateCandidateSuccess) && (
          <Alert
            message="Candidate updated successfully"
            type="success"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        <Form
          name="update-candidate-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
          style={{ marginTop: "1rem" }}
        >
          <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input
              // disabled
              readOnly
            />
          </Form.Item>

          <Form.Item<FieldType> label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Call Interval" name="callInterval">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="LinkedIn" name="linkedin">
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="GitHub" name="github">
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please input comment!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={updateCandidateLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCandidate;
