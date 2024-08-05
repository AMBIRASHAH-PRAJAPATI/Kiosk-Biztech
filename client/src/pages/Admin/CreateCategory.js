import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/AdminLayout";
import { Button, message, Modal, Popconfirm } from "antd";

const CreateCategory = () => {
  const { AuthorizationToken, API } = useAuth();
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedname] = useState("");
  const [counts, setCounts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [isloading, setLoading] = useState(true);

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/api/category/get-all-category`, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      });

      if (data.success) {
        setCategories(data.category);
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong while fetching categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // handle form
  const handleCreateCat = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API}/api/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );

      if (data?.success) {
        getAllCategory();
        message.success(`${data.message}: ${name}`);
        setName("");
      } else {
        message.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      message.error("Something wents wrong in input form");
      setLoading(false);
    }
  };

  // update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API}/api/category/update-category/${selected._id}`,
        { name: updatedName, deleted },
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      if (data.success) {
        getAllCategory();
        message.success(`${data.message}: ${updatedName}`);
        setSelected(null);
        setUpdatedname("");
        setVisible(false);
        setDeleted(false);
      } else message.error(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // handle delete
  const handleDelete = async (Pid, permanent) => {
    try {
      setLoading(true);
      const url = permanent
        ? `${API}/api/category/permanenetdelete-category/${Pid}`
        : `${API}/api/category/softdelete-category/${Pid}`;

      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      });
      if (data.success) {
        fetchCounts();
        getAllCategory();
        message.success(`${data.message}`);
      } else message.error(data.message);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const fetchCounts = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/product-count-by-category`
      );
      if (data.success) {
        setCounts(data.counts);
      }
    } catch (error) {
      console.log("Error fetching product counts by category:", error);
    }
  };
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <AdminLayout heading="Manage Category" isloading={isloading}>
      <div>
        <div className="p-3 ps-0 w-50">
          <h3 className="fw-semibold">Create New Category</h3>
          <CategoryForm
            handleSubmit={handleCreateCat}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="w-75">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S no</th>
                <th scope="col">Name</th>
                <th scope="col">Products</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Categories.map((c, index) => {
                const count =
                  counts.find((count) => count.category === c.slug)?.count || 0;
                return (
                  <tr key={c._id}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>{count}</td>
                    <td>
                      <Button
                        type="primary me-3"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedname(c.name);
                          setSelected(c);
                          setDeleted(c.deleted);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        type="primary"
                        danger
                        onClick={() => {
                          setDeleteModalVisible(true);
                          setDeleteId(c._id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title="Update Category"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedname}
          handleSubmit={handleUpdate}
          isEditing={true}
          deleted={deleted}
          setDeleted={setDeleted}
        />
      </Modal>
      <Modal
        title="Delete Category"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
      >
        <p>Do you want to delete this category permanently or soft delete?</p>

        <Popconfirm
          title="Rest the filters"
          description="Do u want to delete permanently ?"
          onConfirm={() => {
            handleDelete(deleteId, true);
            setDeleteModalVisible(false);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" className="me-3" danger>
            Permanent Delete
          </Button>
        </Popconfirm>
        <Popconfirm
          title="Rest the filters"
          description="Do u want to soft delete ?"
          onConfirm={() => {
            handleDelete(deleteId, false);
            setDeleteModalVisible(false);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Soft Delete</Button>
        </Popconfirm>
      </Modal>
    </AdminLayout>
  );
};

export default CreateCategory;
