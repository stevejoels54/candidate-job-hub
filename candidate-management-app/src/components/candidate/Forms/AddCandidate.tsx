import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Alert } from "antd";
import { actions } from "../../../config/actions";
import { useSelector, useDispatch } from "react-redux";
import { IState, ICandidate } from "../../../types";
import { isEmpty } from "lodash";

// interface for form field type which is ICandidate without id and _id
type FieldType = Omit<ICandidate, "id" | "_id">;

const AddCandidate: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleCancel = () => {
    dispatch(actions.showAddCandidateModal());
  };

  const { addCandidateModalVisible } = useSelector(
    (state: IState) => state.appUi
  );

  const { addCandidateLoading, addCandidateSuccess, addCandidateError } =
    useSelector((state: IState) => state.candidate);

  const onFinish = (values: FieldType) => {
    dispatch(actions.addCandidate(values));
  };

  useEffect(() => {
    if (!isEmpty(addCandidateSuccess)) {
      form.resetFields();
    }
  }, [addCandidateSuccess, dispatch, form]);

  return (
    <>
      <Modal
        title="ADD JOB CANDIDATE"
        open={addCandidateModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {!isEmpty(addCandidateError) && (
          <Alert
            message={addCandidateError.message}
            type="error"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        {!isEmpty(addCandidateSuccess) && (
          <Alert
            message="Candidate added successfully"
            type="success"
            showIcon
            closable
            style={{ marginBottom: "1rem" }}
          />
        )}
        <Form
          name="add-candidate-form"
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
            <Input />
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
              loading={addCandidateLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCandidate;
