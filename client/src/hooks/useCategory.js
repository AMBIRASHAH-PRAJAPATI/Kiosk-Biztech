import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

export default function useCategory() {
  const { API } = useAuth();
  const [Categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API}/api/category/get-category`);
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return { Categories, getAllCategory };
}
