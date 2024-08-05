import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";

export default function useLatestProduct() {
  const { API } = useAuth();
  const [LatestProducts, setLatestProducts] = useState([]);

  const fetchLatestProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/latest-products`);
      if (data.success) {
        setLatestProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  return { LatestProducts, fetchLatestProducts };
}
