import React, { useState, useEffect } from "react";
import "./Health_Data.css";
import { useAuthContext } from "../hooks/useAuthContext";

const Health_Data = () => {
  const { user } = useAuthContext();
  const [values, setValues] = useState([]);
  const [newData, setNewData] = useState({});
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const userId = user.user_id;

  // Function to fetch all health data from the backend for the logged-in user
  const fetchHealthData = async () => {
    try {
      const response = await fetch(
        `https://myhealthmate.onrender.com/api/healthdata/${user.user_id}`
      );
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      const data = await response.json();
      setValues(data.data);
    } catch (error) {
      console.error("Error fetching health data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchHealthData();
    }
  }, [userId]); // Fetch data when the user_id is available or changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(
        `https://myhealthmate.onrender.com/api/healthdata/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setValues((prevValues) => [...prevValues, data.data]);
        setNewData({});
        setIsAddMode(false);
      } else {
        alert("Failed to add data.");
      }
    } catch (error) {
      console.error("Error adding health data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { index, field } = selectedSectionIndex; // Destructure the selected index and field from the object

      console.log(field);
      if (Object.keys(newData).length > 0) {
        const response = await fetch(
          `https://myhealthmate.onrender.com/api/healthdata?user_id=${userId}&field=${field}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ value: newData[field] }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index][field] = data.data[field];
            return updatedValues;
          });
          setNewData({});
          setSelectedSectionIndex(null); // Reset the selected index and field
        } else {
          alert("Failed to update data.");
        }
      } else {
        alert("Please enter at least one value to update.");
      }
    } catch (error) {
      console.error("Error updating health data:", error);
    }
  };

  const handleUpdateButtonClick = (index, field) => {
    setSelectedSectionIndex({ index, field }); // Store the index and field as an object
    setNewData({ ...newData, [field]: values[index][field] || "" });
    setIsAddMode(true);
  };

  return (
    <div className={isAddMode ? "section handle-add" : "section"}>
      {values.map((data, index) => (
        <div key={index} className="data-card">
          <div className="field">
            <h3>Sugar :</h3>
            <p className="field-value">{data.Blood_Sugar}</p>
            <div className="buttons">
              <button
                onClick={() => handleUpdateButtonClick(index, "Blood_Sugar")}
              >
                Update
              </button>
            </div>
          </div>
          <p className="timestamp">
            {data.updatedAt
              ? `Updated at: ${new Date(data.updatedAt).toDateString()}`
              : ""}
          </p>

          <div className="field">
            <h3>B.P. Dia:</h3>
            <p className="field-value">{data.B_P_Dia}</p>
            <div className="buttons">
              <button onClick={() => handleUpdateButtonClick(index, "B_P_Dia")}>
                Update
              </button>
            </div>
          </div>
          <p className="timestamp">
            {data.updatedAt
              ? `Updated at: ${new Date(data.updatedAt).toDateString()}`
              : ""}{" "}
          </p>
          <div className="field">
            <h3>B.P. Sys:</h3>

            <p className="field-value">{data.B_P_Sys}</p>
            <div className="buttons">
              <button onClick={() => handleUpdateButtonClick(index, "B_P_Sys")}>
                Update
              </button>
            </div>
          </div>
          <p className="timestamp">
            {data.updatedAt
              ? `Updated at: ${new Date(data.updatedAt).toDateString()}`
              : ""}{" "}
          </p>
        </div>
      ))}
      {isAddMode ? (
        <div className="data-card">
          <input
            type="text"
            name="Blood_Sugar"
            placeholder="Blood Sugar"
            value={newData.Blood_Sugar || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="B_P_Dia"
            placeholder="B.P. Dia"
            value={newData.B_P_Dia || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="B_P_Sys"
            placeholder="B.P. Sys"
            value={newData.B_P_Sys || ""}
            onChange={handleChange}
          />
          {selectedSectionIndex !== null ? (
            <button
              onClick={() => handleUpdate(selectedSectionIndex, "Blood_Sugar")}
            >
              Update
            </button>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )}
          <button className="cancel_btn" onClick={() => setIsAddMode(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="add-button">
          <button onClick={() => setIsAddMode(true)}>Add Data</button>
        </div>
      )}
    </div>
  );
};

export default Health_Data;
