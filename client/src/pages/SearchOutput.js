import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import ProductCard from "../components/ProductCard";

const SearchOutput = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="products-layout p-5">
        <div className="p-5 mt-5">
          <div className="p-3 container shadow p-md-5 bg-white">
            <h2 className="text-center unLineheading">Search Results</h2>
            <h5>
              {values.results.length < 1
                ? "No Products Found"
                : `Fount ${values.results.length} products`}
            </h5>
            <div className="row mt-5">
              {values.results.map((p) => (
                <div className="col-md-4 col-6 border p-0" key={p._id}>
                  <ProductCard product={p} url="/category" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchOutput;
