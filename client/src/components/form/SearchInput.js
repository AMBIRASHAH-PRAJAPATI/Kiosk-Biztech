import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useAuth } from "../../context/auth";

const { Search } = Input;

const SearchInput = () => {
  const { API } = useAuth();

  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/product-search/${values.keyword}`
      );
      setValues({ ...values, keyword: "", results: data });
      navigate(`/search/${value}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Search
      placeholder="input search text"
      onSearch={handleSearch}
      enterButton
      value={values.keyword}
      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    />
  );
};

export default SearchInput;
