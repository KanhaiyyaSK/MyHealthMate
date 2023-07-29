

const express = require("express");
const router = express.Router();
const { uploadToCloudinary } = require("../middleware/cloudinary");
const { requireAuth } = require("../middleware/requireAuth");
const Report = require("../models/reportsStoreModel");


router.get("/", async (req, res) => {
  console.log("id------->", req.query.user_id);

  try {
    const reports = await Report.find({ user: req.query.user_id }); // Use req.query.user_id to get the user ID from the query string

    console.log("REPORTS------------->", reports);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   POST /api/reportsStore
// @desc    Upload a report
// @access  Private

router.post("/", uploadToCloudinary.single("file"), async (req, res) => {
  console.log("file", req.file);
  console.log("id", req.query.user_id);

  try {
    const { reportName, resourceType, public_id } = req.body;
    const reportResourceURL = req.file.path; // Use req.file.path instead of req.file.secure_url

    const report = new Report({
      user: req.query.user_id,
      reportName: reportName,
      reportResourceURL: reportResourceURL,
      resourceType: resourceType,
      public_id: public_id,
    });
    await report.save();
    res.json({ fileUrl: reportResourceURL }); // Respond with the Cloudinary URL
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cloudinary Error" });
  }
});

// @route   DELETE /api/reportsStore/:id
// @desc    Delete a report
// @access  Private
router.delete("/:id", async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const report = await Report.findById(req.params.id);
    console.log("report", report);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    if (report.user.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this report" });
    }

    await Report.findByIdAndDelete(req.params.id); // Use findByIdAndDelete() to remove the document from the database
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;



// return (
  //     <>
  //       <Navbar buttons="true" LogButton="true" />
  
  //       <div style={{ position: "relative" }}>
  //         <Toast
  //           onClose={() => {
  //             setShowSuccess(false);
  //           }}
  //           bg="success"
  //           show={showSuccess}
  //           delay={2000}
  //           autohide
  //           style={{ position: "absolute", zIndex: "20", right: "1rem" }}
  //         >
  //           <Toast.Header>
  //             <strong className="me-auto text-success">
  //               File uploaded successfully!
  //             </strong>
  //           </Toast.Header>
  //           <Toast.Body className="text-white">
  //             {selectedFile ? selectedFile.name : "No file selected"}
  //           </Toast.Body>
  //         </Toast>
  
  //         <Toast
  //           onClose={() => {
  //             setShowDeleteSuccess(false);
  //           }}
  //           bg="secondary"
  //           show={showDeleteSuccess}
  //           delay={2000}
  //           autohide
  //           style={{ position: "absolute", zIndex: "20", right: "1rem" }}
  //         >
  //           <Toast.Header>
  //             <strong className="me-auto text-danger">
  //               File deleted successfully!
  //             </strong>
  //           </Toast.Header>
  //           <Toast.Body className="text-white">{deletedFile}</Toast.Body>
  //         </Toast>
  
  //         <div className="page-container">
  //           <Sidenav />
  //           <div className="my-4" id="reports-page-container">
  //             <div id="reports-container">
  //               <div>
  //                 <h3 className="charts-heading">
  //                   My Reports <TbReportMedical style={{ fontSize: "30px" }} />
  //                 </h3>
  //               </div>
  //               <h2>My Reports</h2>
  //               <Form onSubmit={handleSubmit}>
  //                 <Form.Group controlId="formBasicFile">
  //                   <Form.Label>Upload a file</Form.Label>
  //                   <Form.Control
  //                     type="file"
  //                     placeholder="Choose a file"
  //                     onChange={handleFileSelect}
  //                   />
  //                   <Form.Text className="text-muted">
  //                     The file <b>should not exceed 2MB</b> in size.
  //                   </Form.Text>
  //                   <Button type="submit" disabled={!isFileSelected}>
  //                     Upload
  //                   </Button>
  //                 </Form.Group>
  //               </Form>
  //               <h4 className="my-3">All reports</h4>
  //               {!reports ? (
  //                 <div className="d-flex justify-content-center">
  //                   <LoadingCircle />
  //                 </div>
  //               ) : (
  //                 <ul
  //                   style={{ listStyle: "none", margin: "0px", padding: "0px" }}
  //                 >
  //                   {reports.map((report, idx) => (
  //                     <li key={report._id}>
  //                       <div className="d-flex justify-content-between my-3">
  //                         <Button
  //                           id="reports-button"
  //                           className="d-flex  align-items-center justify-content-between"
  //                           onClick={() => {
  //                             setCurrentFile(report);
  //                             setExtension(
  //                               report.reportResourceURL.split(".").pop()
  //                             );
  //                           }}
  //                         >
  //                           <span className="">
  //                             {report.reportName.length <= 20
  //                               ? report.reportName
  //                               : report.reportName.slice(0, 20) + "..."}
  //                           </span>
  //                           {/* <Button variant="danger" onClick={()=>handleDelete(report._id,report.reportName)}><AiFillDelete/></Button> */}
  //                           <OverlayTrigger
  //                             trigger="click"
  //                             placement="right"
  //                             overlay={popover}
  //                             rootClose
  //                             flip
  //                             fallbackPlacements={["left", "top", "bottom"]}
  //                             show={showPopup && clickedIndex === idx}
  //                             onHide={() => {
  //                               setShowPopup(false);
  //                               setClickedIndex(null);
  //                             }}
  //                           >
  //                             <Button
  //                               onClick={(e) => {
  //                                 handlePopup(
  //                                   e,
  //                                   report._id,
  //                                   report.reportName,
  //                                   idx
  //                                 );
  //                               }}
  //                               variant="danger"
  //                             >
  //                               <AiFillDelete id="delete-button-overlay" />
  //                             </Button>
  //                           </OverlayTrigger>
  //                         </Button>
  //                       </div>
  //                     </li>
  //                   ))}
  //                 </ul>
  //               )}
  //             </div>
  //             {currentFile ? (
  //               <div
  //                 id="viewer-container"
  //                 style={{ backgroundColor: "rgb(23,29,61)", color: "white" }}
  //               >
  //                 <div className="d-flex justify-content-between">
  //                   <h3>Reports viewer</h3>
  
  //                   <Button
  //                     variant="success"
  //                     id="download-button"
  //                     onClick={() => handleDownloadReport(currentFile)}
  //                   >
  //                     Download {getFileTypeIcon(currentFile.reportName)}
  //                   </Button>
  //                 </div>
  //                 <div id="viewer">
  //                   {extension === "pdf" ? (
  //                     <embed
  //                       src={`https://docs.google.com/gview?url=${currentFile?.reportResourceURL}&embedded=true`}
  //                       id="viewer-embed"
  //                       type="application/pdf"
  //                     />
  //                   ) : (
  //                     <img
  //                       src={currentFile.reportResourceURL}
  //                       id="viewer-image"
  //                       alt="report img"
  //                     />
  //                   )}
  //                 </div>
  //               </div>
  //             ) : (
  //               <div
  //                 id="viewer-container"
  //                 style={{ backgroundColor: "rgb(23,29,61)", color: "white" }}
  //               >
  //                 <div className="d-flex justify-content-between">
  //                   <h3>Reports viewer</h3>
  //                 </div>
  //                 <div
  //                   className="d-flex justify-content-center align-items-center"
  //                   style={{
  //                     backgroundColor: "rgb(147,148,150,0.3)",
  //                     width: "100%",
  //                     minHeight: "20rem",
  //                   }}
  //                 >
  //                   <span style={{ fontSize: "1.2rem" }}>
  //                     <GrSelect />
  //                     Select a file to view
  //                   </span>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <Footer />
  //       </div>
  //     </>
  //   );
  // };
  
  // export default Reports;
  
  // reports.js