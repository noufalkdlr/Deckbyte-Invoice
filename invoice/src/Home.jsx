import React, { useState } from "react";
import { Link } from "react-router-dom";
import Invoice from "./Invoice";

const Home = () => {
  const [data, setData] = useState([{ itemName: "", itemPrice: "" }]);

  const handleDataChange = (index, e) => {
    const { name, value } = e.target;

    const updateData = [...data]; 
    updateData[index][name] = value;

    setData(updateData);
  };

  const handleAddItem = ()=>{
    setData([...data, { itemName: "", itemPrice: "" } ]);
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        {data.map((item, index) => (
          <div key={index}>
            <label>Item {index + 1}</label>
            <input
              type="text"
              name="itemName"
              value={item.itemName}
              onChange={(e) => handleDataChange(index, e)}
              placeholder="Name"
            />
            <input
              type="text"
              name="itemPrice"
              value={item.itemPrice}
              onChange={(e) => handleDataChange(index, e)}
              placeholder=" Price"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>➕ Add Item</button>

      </form>
      <Invoice data={data} />
    </>
  );
};

export default Home;
