import React, { useEffect, useState } from "react";
import { Button, Card, Modal, message, List } from "antd";
import axios from "axios";
import { useAuth } from "../../context/auth";
import AdminLayout from "../../components/Layout/AdminLayout";
import UpdateUserForm from "../../components/form/UpdateUserForm";

const AdminDashboard = () => {
  const { user, AuthorizationToken, API, userAuthentication } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const [countsByCat, setCountsByCat] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const showModal = async () => {
    try {
      const response = await axios.get(
        `${API}/api/admin/get-user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUserData(response.data.userData);
        setIsModalVisible(true);
      } else {
        message.error("Failed to fetch user data");
      }
    } catch (error) {
      message.error("Error fetching user data");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = () => {
    userAuthentication();
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/product/product-count-by-category`
        );
        if (data.success) {
          setCountsByCat(data.counts); // Use the correct property name for counts
        }
      } catch (error) {
        console.log("Error fetching product counts by category:", error);
      }
    };

    const fetchTotalCount = async () => {
      try {
        const { data } = await axios.get(`${API}/api/product/product-count`);
        if (data.success) {
          setTotalCount(data.totalecount);
        }
      } catch (error) {
        console.log("Error fetching total product count:", error);
      }
    };

    fetchTotalCount();
    fetchCounts();
  }, [API, AuthorizationToken, user._id, userAuthentication]);

  return (
    <AdminLayout heading="Dashboard">
      <div className="p-3 bg-org shadow">
        <Card
          className="admin-card shadow"
          title="Admin Profile"
          bordered={false}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <h4 className="mb-3">
            <strong>Admin Name:</strong>&nbsp; {user?.username}
          </h4>
          <h4 className="mb-3">
            <strong>Admin Email:</strong>&nbsp; {user?.email}
          </h4>
          <h4 className="mb-3">
            <strong>Admin Contact:</strong>&nbsp; {user?.phone}
          </h4>
          <Button type="primary" onClick={showModal} className="mt-2">
            Update Profile
          </Button>
        </Card>

        <Card
          className="product-stats-card shadow"
          title="Product Statistics"
          bordered={false}
          style={{ width: "100%", maxWidth: "600px", marginTop: "20px" }}
        >
          <h4 className="mb-3">
            <strong>Total Product Count:</strong>&nbsp; {totalCount}
          </h4>
          <h4 className="mb-3">
            <strong>Product Count by Category:</strong>
          </h4>
          <List
            dataSource={countsByCat}
            renderItem={(item) => (
              <List.Item>
                <strong>{item.category}:</strong>&nbsp; {item.count}
              </List.Item>
            )}
          />
        </Card>

        <Modal
          title="Update Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {userData && (
            <UpdateUserForm
              user={userData}
              onCancel={handleCancel}
              onUpdate={handleUpdate}
            />
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
