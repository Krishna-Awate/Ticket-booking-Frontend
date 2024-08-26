"use client";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import axios from "axios";
const Swal = require("sweetalert2");

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xlsx, .xls",
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles),
  });

  const handleFileUpload = async (files) => {
    const file = files[0]; // Assume single file upload
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Process each sheet in the workbook
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      console.log("Sheet Data:", jsonData);

      // Send data to backend
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST}/data/upload`,
          jsonData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data successfully uploaded:", response.data);
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
      } catch (e) {
        console.error("Error uploading data:", e);
        Swal.fire({
          title: "Error!",
          text: e.response.data.message,
          icon: "error",
        });
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex ml-20 mt-16 w-1/2">
      <div
        {...getRootProps({
          style: {
            border: "2px dashed #cccccc",
            borderRadius: "4px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            transition: "border-color 0.3s",
          },
        })}
      >
        <input
          {...getInputProps()}
          style={{ display: "none" }} // Hide the file input element
        />
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#333",
          }}
        >
          Click here to upload excel file
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
