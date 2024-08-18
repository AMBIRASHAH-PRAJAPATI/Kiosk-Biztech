import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Select, Input, InputNumber, message } from "antd";
import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";

const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
  const navigate = useNavigate();
  const { AuthorizationToken, API } = useAuth();
  const { Categories } = useCategory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalprice, setoriginalprice] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState({
    processor: "",
    ram: "",
    storage: "",
    display: "",
    operatingSystem: "",
    otherDetails: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Product Name is required";
    if (!description) newErrors.description = "Description is required";
    if (!originalprice) newErrors.originalprice = "Original Price is required";
    if (originalprice <= 0)
      newErrors.originalprice = "Original Price must be greater than zero";
    if (!price) newErrors.price = "Price is required";
    if (price <= 0) newErrors.price = "Price must be greater than zero";
    if (!category) newErrors.category = "Category is required";
    if (!quantity) newErrors.quantity = "Quantity is required";
    if (quantity <= 0)
      newErrors.quantity = "Quantity must be greater than zero";
    if (!image) newErrors.image = "Product Picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateP = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("originalprice", originalprice);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("image", image);
      productData.append("quantity", quantity);
      productData.append("specifications", JSON.stringify(specifications));

      const { data } = await axios.post(
        `${API}/api/product/create-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );

      if (data?.success) {
        message.success(`${data.message}: ${name}`);
        navigate("/dashboard/admin/products/all-products");
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      message.error(errorMessage);
    }
  };

  return (
    <AdminLayout heading="Manage Products">
      <div>
        <div className="p-3 ps-0">
          <h3 className="fw-semibold">Create new product</h3>
        </div>

        <form onSubmit={handleCreateP} className="m-1 w-75">
          <div className="grid w-full max-w-xs gap-1.5 mb-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="category"
            >
              Category
            </label>
            <Select
              id="category"
              placeholder="Select a category"
              size="large"
              showSearch
              name="category"
              className={`w-100 ${
                errors.category ? "border border-danger-subtle" : ""
              }`}
              allowClear
              onChange={(value) => {
                setCategory(value);
                setErrors((prevErrors) => ({ ...prevErrors, category: null }));
              }}
            >
              {Categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            {errors.category && (
              <div className="text-danger fs-5  mt-1">
                {errors.category} &#33;
              </div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="name"
            >
              Product Name
            </label>
            <Input
              id="name"
              placeholder="Enter product name"
              allowClear
              size="large"
              name="name"
              className={`w-100 ${
                errors.name ? "border border-danger-subtle" : ""
              }`}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, name: null }));
              }}
            />
            {errors.name && (
              <div className="text-danger fs-5 mt-1">{errors.name} &#33;</div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 mb-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="picture"
            >
              Product Picture
            </label>
            <div className="input-group">
              <input
                id="picture"
                type="file"
                name="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setErrors((prevErrors) => ({ ...prevErrors, image: null }));
                }}
                style={{ fontSize: "16px" }}
                className={`form-control border rounded-md rounded-4 border-input bg-white px-3 py-2 text-gray-400 file-input ${
                  errors.image ? "border border-danger-subtle" : ""
                }`}
              />
            </div>
            {errors.image && (
              <div className="text-danger fs-5  mt-1">{errors.image} &#33;</div>
            )}
            {image && (
              <div className="text-center my-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product_image"
                  height={"150px"}
                  className="rounded mx-auto d-block"
                />
              </div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="originalprice"
            >
              Original Price
            </label>
            <InputNumber
              id="originalprice"
              className={`mx-3 ${
                errors.originalprice ? "border border-danger-subtle" : ""
              }`}
              defaultValue={0}
              min={0}
              name="originalprice"
              size="large"
              onChange={(value) => {
                setoriginalprice(value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  originalprice: null,
                }));
              }}
              style={{ width: 200 }}
            />
            {errors.originalprice && (
              <div className="text-danger fs-5  mt-1">
                {errors.originalprice} &#33;
              </div>
            )}
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="price"
            >
              Sale Price
            </label>
            <InputNumber
              id="price"
              className={`mx-3 ${
                errors.price ? "border border-danger-subtle" : ""
              }`}
              defaultValue={0}
              min={0}
              name="price"
              size="large"
              onChange={(value) => {
                setPrice(value);
                setErrors((prevErrors) => ({ ...prevErrors, price: null }));
              }}
              style={{ width: 200 }}
            />
            {errors.price && (
              <div className="text-danger fs-5  mt-1">{errors.price} &#33;</div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="quantity"
            >
              Product Quantity
            </label>
            <InputNumber
              id="quantity"
              className={`mx-3 ${
                errors.quantity ? "border border-danger-subtle" : ""
              }`}
              defaultValue={0}
              min={0}
              name="quantity"
              size="large"
              onChange={(value) => {
                setQuantity(value);
                setErrors((prevErrors) => ({ ...prevErrors, quantity: null }));
              }}
              style={{ width: 200 }}
            />
            {errors.quantity && (
              <div className="text-danger fs-5 mt-1">
                {errors.quantity} &#33;
              </div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="processor"
            >
              Processor
            </label>
            <Input
              id="processor"
              placeholder="Enter processor details"
              allowClear
              size="large"
              name="processor"
              onChange={(e) => {
                setSpecifications({
                  ...specifications,
                  processor: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="ram"
            >
              RAM
            </label>
            <Input
              id="ram"
              placeholder="Enter RAM details"
              allowClear
              size="large"
              name="ram"
              onChange={(e) => {
                setSpecifications({ ...specifications, ram: e.target.value });
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="storage"
            >
              Storage
            </label>
            <Input
              id="storage"
              placeholder="Enter storage details"
              allowClear
              size="large"
              name="storage"
              onChange={(e) => {
                setSpecifications({
                  ...specifications,
                  storage: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="display"
            >
              Display
            </label>
            <Input
              id="display"
              placeholder="Enter display details"
              allowClear
              size="large"
              name="display"
              onChange={(e) => {
                setSpecifications({
                  ...specifications,
                  display: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="os"
            >
              Operating System
            </label>
            <Input
              id="os"
              placeholder="Enter operating system details"
              allowClear
              size="large"
              name="operatingSystem"
              onChange={(e) => {
                setSpecifications({
                  ...specifications,
                  operatingSystem: e.target.value,
                });
              }}
            />
          </div>

          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="otherDetails"
            >
              Other Details
            </label>
            <Input
              id="otherDetails"
              placeholder="Enter operating system details"
              allowClear
              size="large"
              name="otherDetails"
              onChange={(e) => {
                setSpecifications({
                  ...specifications,
                  otherDetails: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-gray-400 font-medium fw-medium mb-3"
              for="description"
            >
              Description
            </label>
            <TextArea
              id="description"
              placeholder="Enter description of product"
              allowClear
              size="large"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              style={{
                height: 120,
                resize: "none",
              }}
              showCount
              maxLength={1000}
              className={`${
                errors.description ? "border border-danger-subtle" : ""
              }`}
            />
            {errors.description && (
              <div className="text-danger fs-5 mt-1">{errors.description}</div>
            )}
          </div>
          <div className="w-full my-4 pb-2">
            <button type="submit" className="btn btn-primary">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;
