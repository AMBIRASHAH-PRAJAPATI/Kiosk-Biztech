import { Button, Input, Checkbox } from "antd";
import React from "react";

const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  isEditing,
  deleted,
  setDeleted,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Input
          allowClear
          size="large"
          type="text"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      {isEditing && (
        <div className="mb-3">
          <Checkbox
            checked={deleted}
            onChange={(e) => setDeleted(e.target.checked)}
          >
            Deleted
          </Checkbox>
        </div>
      )}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

export default CategoryForm;
