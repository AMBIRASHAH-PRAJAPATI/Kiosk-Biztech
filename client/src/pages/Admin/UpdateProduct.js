import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Input, InputNumber, Button, message, Popconfirm } from "antd";
import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";
const { Option } = Select;
const { TextArea } = Input;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { AuthorizationToken, API } = useAuth();
  const { Categories } = useCategory();

  const [isloading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalprice, setOriginalPrice] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tonavigate, setTonavigate] = useState("");
  const [image, setImage] = useState("");
  const [updatedIMG, setUpdatedIMG] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pid, setPID] = useState("");

  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [display, setDisplay] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");

  //   single product
  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/product/get-product/${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );

      setName(data.product.name);
      setPID(data.product._id);
      setDescription(data.product.description);
      setOriginalPrice(data.product.originalprice);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
      setTonavigate(data.product.category.slug);
      setImage(data.product.image);

      setProcessor(data.product.specifications.processor);
      setRam(data.product.specifications.ram);
      setStorage(data.product.specifications.storage);
      setDisplay(data.product.specifications.display);
      setOperatingSystem(data.product.specifications.operatingSystem);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("not found");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // update product
  const handleUpdateP = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("originalprice", originalprice);
      productData.append("price", price);
      productData.append("category", category);
      updatedIMG && productData.append("image", updatedIMG);
      productData.append("quantity", quantity);
      productData.append("specifications[processor]", processor);
      productData.append("specifications[ram]", ram);
      productData.append("specifications[storage]", storage);
      productData.append("specifications[display]", display);
      productData.append("specifications[operatingSystem]", operatingSystem);

      const { data } = await axios.put(
        `${API}/api/product/update-product/${pid}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      if (data.success) {
        message.success(`${data.message}: ${name.slice(0, 7)}`);
        navigate(`/dashboard/admin/products/${tonavigate}`);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong in the input form");
    }
  };

  // Delete product
  const handleDeleteP = async () => {
    try {
      const { data } = await axios.delete(
        `${API}/api/product/delete-product/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${AuthorizationToken}`,
          },
        }
      );
      message.success("Product deleted successfully");
      navigate(`/dashboard/admin/products/${tonavigate}`);
    } catch (error) {
      console.log(error);
      message.error("Product not deleted yet");
    }
  };

  const cancel = (e) => {
    message.error(`${name} not deleted`);
  };

  return (
    <AdminLayout heading="Update Products" isloading={isloading}>
      <div>
        <div className="p-3 ps-0">
          <h3 className="fw-semibold">Update product</h3>
        </div>

        <form className="m-1 w-75" onSubmit={handleUpdateP}>
          <div className="grid w-full max-w-xs gap-1.5 mb-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              className="w-100"
              allowClear
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {Categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 mb-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
              for="picture"
            >
              Product Picture
            </label>
            <div className="input-group">
              <input
                id="picture"
                type="file"
                name="image"
                onChange={(e) => setUpdatedIMG(e.target.files[0])}
                style={{ fontSize: "16px" }}
                className="form-control border rounded-md rounded-4 border-input bg-white px-3 py-2 text-sm text-gray-400 file-input"
              />
            </div>
            {(image || updatedIMG) && (
              <div className="text-center my-3">
                <img
                  src={updatedIMG ? URL.createObjectURL(updatedIMG) : image}
                  alt="Product_image"
                  height="150px"
                  className="rounded mx-auto d-block"
                />
              </div>
            )}
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
              for="original_price"
            >
              Original Price
            </label>
            <InputNumber
              id="original_price"
              className="mx-3"
              defaultValue={0}
              min={0}
              name="price"
              size="large"
              value={originalprice}
              onChange={(value) => setOriginalPrice(value)}
              style={{
                width: 200,
              }}
              required
            />
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
              for="price"
            >
              Product Price
            </label>
            <InputNumber
              id="price"
              className="mx-3"
              defaultValue={0}
              min={0}
              name="price"
              size="large"
              value={price}
              onChange={(value) => setPrice(value)}
              style={{
                width: 200,
              }}
              required
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
              for="quantity"
            >
              Product Quantity
            </label>
            <InputNumber
              id="quantity"
              className="mx-3"
              defaultValue={0}
              min={0}
              name="quantity"
              size="large"
              value={quantity}
              onChange={(value) => setQuantity(value)}
              style={{
                width: 200,
              }}
              required
            />
          </div>

          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={processor}
              onChange={(e) => {
                setProcessor(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={ram}
              onChange={(e) => {
                setRam(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={storage}
              onChange={(e) => {
                setStorage(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={display}
              onChange={(e) => {
                setDisplay(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
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
              value={operatingSystem}
              onChange={(e) => {
                setOperatingSystem(e.target.value);
              }}
            />
          </div>
          <div className="grid w-full max-w-xs gap-1.5 my-4 pb-2">
            <label
              className="text-sm text-gray-400 font-medium fw-medium mb-3"
              for="description"
            >
              Description
            </label>
            <TextArea
              id="description"
              placeholder="Enter description of product"
              allowClear
              value={description}
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
            />
          </div>
          <div className="my-4 pb-2 ">
            <button type="submit" className="btn btn-primary mx-2">
              Update Product
            </button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={handleDeleteP}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger className="mx-2">
                Delete Product
              </Button>
            </Popconfirm>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
