import React, { useState, useEffect } from "react";
import TokenService from "../../services/token-service";
import Loader from "../Loader/Loader";
import { API_URL } from "../../constants/constants";
import HeaderUtilities from "../../utilities/header-utilities";

const FileDeleter: React.FC = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteFileResponse, setDeleteFileResponse] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mobile-1.moveitcloud.com/api/v1/files",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + TokenService.getAccessToken(),
          },
        }
      );
      const data = await response.json();

      setFiles(
        data.items.map((item: any) => ({ path: item.path, id: item.id }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(event.target.value);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const headers = new Headers();
      HeaderUtilities.addAuthorizationTokenHeader(headers);

      if (selectedFile) {
        await fetch(API_URL + `/files/${selectedFile}`, {
          method: "DELETE",
          headers: headers,
        });

        setFiles(files.filter((file: any) => file.id !== selectedFile));
        setLoading(false);
        setDeleteFileResponse("File deleted successfully!");
      } else {
        setDeleteFileResponse("Please select a file to delete.");
      }
    } catch (error) {
      setDeleteFileResponse("An error occurred while deleting the file.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="container">
        <Loader />
      </div>
    );

  return (
    <div className="container">
      <select
        className="select-container"
        value={selectedFile}
        onChange={handleFileSelect}
      >
        <option value="">Select a file: </option>
        {files.map((file: any) => (
          <option key={file.id} value={file.id}>
            {file.path}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete File</button>
      {deleteFileResponse && <p>{deleteFileResponse}</p>}
    </div>
  );
};

export default FileDeleter;
