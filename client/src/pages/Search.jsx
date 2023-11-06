import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import "../components/searchsidebar.css";
import axios from "axios";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./search.css";
import Card from "react-bootstrap/Card";
import { IoIosNavigate } from "react-icons/io";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { AiFillUpCircle } from "react-icons/ai";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState("");
  const [results, setResults] = useState(null);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);
  const [distanceValue, setDistanceValue] = useState(500);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { user } = useAuthContext();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      // You can now use these values to search for nearby documents
    });
  } else {
    console.log("Geolocation is not supported by this browser");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axios = require("axios");
    let newData = JSON.stringify({
      latitude: Number(latitude),
      longitude: Number(longitude),
      distance: Number(distanceValue),
      speciality: filters,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "hhttp://localhost:4000/api/doctors/nearby",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      data: newData,
    };

    await axios
      .request(config)
      .then((response) => {
        if (response.data.length == 0) {
          setResults([]);
        } else setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar buttons="true" LogButton="true" />

      <div className="page-container">
        <Sidenav />

        <div style={{ width: "100%" }}>
          <div className="sidebar">
            <h4>Search Doctors Nearby</h4>

            <div className="d-flex flex-column search-container">
            <div className="soon">
            <h4>Comming Soon 🙂🙂!</h4>
          </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Search;
