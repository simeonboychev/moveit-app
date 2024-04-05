import React, { useState } from "react";
import FolderLoader from "../FolderLoader/FolderLoader";
import Loader from "../Loader/Loader";
import { API_URL } from "../../constants/constants";
import HeaderUtilities from "../../utilities/header-utilities";

const FileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [submissionResponse, setSubmissionResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFolderSelectName = (folderName: string) => {
    setSelectedFolderName(folderName);
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSubmissionResponse("No file selected");
      return;
    }
    debugger;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const headers = new Headers();
      headers.append("Accept", "application/json");
      HeaderUtilities.addAuthorizationTokenHeader(headers);

      setLoading(true);
      var response = await fetch(API_URL + `/folders/${selectedFolder}/files`, {
        method: "POST",
        body: formData,
        headers: headers,
      });

      if (response.ok) {
        setLoading(false);
        setSubmissionResponse("File submitted successfully!");
      } else {
        var result = await response.json();
        setSubmissionResponse(result.detail);
      }
    } catch (error) {
      setSubmissionResponse("Failed to submit file!");
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
      <FolderLoader
        selectedFolder={selectedFolder}
        onFolderSelect={handleFolderSelect}
        selectedFolderName={selectedFolderName}
        onFolderSelectName={handleFolderSelectName}
      />

      <h1>File Uploader</h1>
      {selectedFolder ? (
        <>
          <p>Selected folder id: {selectedFolder}</p>
          <p>Selected folder name: {selectedFolderName}</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : null}

      <div>{submissionResponse}</div>
    </div>
  );
};

export default FileUploader;
