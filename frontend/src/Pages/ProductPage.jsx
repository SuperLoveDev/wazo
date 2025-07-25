import React, { useState } from "react";
import List from "./List";

const ProductPage = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleProductAdded = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <div>
      <Add onAdded={handleProductAdded} />
      <List refreshTrigger={refreshList} />
    </div>
  );
};

export default ProductPage;
