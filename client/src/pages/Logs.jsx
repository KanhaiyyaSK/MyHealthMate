import { GrCatalog } from "react-icons/gr";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import { ListGroup } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
const Logs = () => {
  const [logsData, setLogsData] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    handleFetchLogs();
  }, []);

<<<<<<< HEAD
  const handleFetchLogs = async () => {
    const axios = require("axios");
=======
    const handleFetchLogs = async()=>{
        const axios = require("axios");
		
		let config = {
			method: "get",
			maxBodyLength: Infinity,
            url: `http://localhost:4000/api/logs`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user.token}`
			},
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:4000/api/logs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response);
        setLogsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const logsData = [
  // {
  //     content: "Crocin taken on 5th May Night",
  // },
  // {
  //     content: "Crocin taken on 5th May Evening",
  // },
  // {
  //     content: "Crocin taken on 5th May Morning",
  // },
  // {
  //     content: "Crocin taken on 5th May",
  // },
  // {
  //     content: "Crocin taken on 5th May",
  // },
  // {
  //     content: "Crocin taken on 5th May",
  // },
  // ]
  return (
    <>
      <Navbar buttons="true" LogButton="false" />

<<<<<<< HEAD
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidenav />
=======
    // const logsData = [
        // {
        //     content: "Crocin taken on 5th May Night",
        // },
        // {
        //     content: "Crocin taken on 5th May Evening",
        // },
        // {
        //     content: "Crocin taken on 5th May Morning",
        // },
        // {
        //     content: "Crocin taken on 5th May",
        // },
        // {
        //     content: "Crocin taken on 5th May",
        // },
        // {
        //     content: "Crocin taken on 5th May",
        // },
    // ]
    return (
        <>
            <Navbar buttons='true' LogButton='false' />

            <div className="d-flex" style={{minHeight:"100vh"}}>
                <Sidenav />

                <div className="d-flex flex-column w-100 align-items-center">
                    <h3 className="charts-heading">
                        Medicine Logs <GrCatalog style={{ fontSize: "30px", backgroundColor: 'white', borderRadius: "25%", padding: "3px" }} />
                    </h3>
                    <div className="logs-list bg-dark">
                        <ListGroup as="ol" numbered>
                        {
                            (logsData?.length!==0 && logsData)?logsData?.map((elem) => {
                                return <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{elem.logMessage}</div>
                                        </div>
                                      
                                    </ListGroup.Item>
                            }):(
                                <div className="ms-2 me-auto">
                                <div className="fw-bold text-white h-100">Logs Unavailable</div>
                            </div>
                            )
                        }
                        
                        
                        </ListGroup>
                                </div>
				</div>
>>>>>>> 05a4763e9d1126d6ffb2835e1de5b3e4dac4ec7f

        <div className="d-flex flex-column w-100 align-items-center">
          <h3 className="charts-heading">
            Medicine Logs{" "}
            <GrCatalog
              style={{
                fontSize: "30px",
                backgroundColor: "white",
                borderRadius: "25%",
                padding: "3px",
              }}
            />
          </h3>
          <div className="logs-list bg-dark">
            <ListGroup as="ol" numbered>
              {logsData?.length !== 0 && logsData ? (
                logsData?.map((elem) => {
                  return (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{elem.logMessage}</div>
                      </div>
                    </ListGroup.Item>
                  );
                })
              ) : (
                <div className="ms-2 me-auto">
                  <div className="fw-bold text-white h-100">
                    Logs Unavailable
                  </div>
                </div>
              )}
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
};
export default Logs;
