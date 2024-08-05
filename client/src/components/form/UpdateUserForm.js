import React, { useEffect, useState } from "react";
import { Button, Input, Form, message } from "antd";
import axios from "axios";
import { useAuth } from "../../context/auth";

const UpdateUserForm = ({ user, onCancel, onUpdate }) => {
  const { AuthorizationToken, API } = useAuth();
  const [form] = Form.useForm();
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password, // Set the password field to the current value
    });
  }, [user, form]);

  const handleUpdate = async (values) => {
    try {
      const { username, email, phone, password } = values;
      const updateData = { username, email, phone };
      if (passwordChanged) {
        updateData.password = password;
      }

      const { data } = await axios.patch(
        `${API}/api/admin/update-user/${user._id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      if (data.success) {
        message.success("User updated successfully");
        onUpdate();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Error updating user");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleUpdate}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please enter username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please enter phone number" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input.Password onChange={() => setPasswordChanged(true)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserForm;
