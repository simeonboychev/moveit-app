import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/constants";
import HeaderUtilities from "../../utilities/header-utilities";

const FileLoader: React.FC<{
  selectedFolder: string;
  selectedFolderName: string;
  onFolderSelectName: (folderName: string) => void;
  onFolderSelect: (folderId: string) => void;
}> = ({
  selectedFolder,
  onFolderSelect,
  selectedFolderName,
  onFolderSelectName,
}) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const headers = new Headers();
    HeaderUtilities.addAuthorizationTokenHeader(headers);

    fetch(API_URL + "/folders", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setFolders(
          data.items
            .map((item: any) => ({ name: item.name, folderId: item.id }))
            .filter((item: any) => item.name !== "")
        );
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFolderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFolderSelect(event.target.value);
    onFolderSelectName(event.target.options[event.target.selectedIndex].text);
  };

  return (
    <div className="container">
      <label htmlFor="folder">Select a folder: </label>
      <select
        className="select-container"
        id="folder"
        value={selectedFolder}
        onChange={handleFolderChange}
      >
        <option value="">Select...</option>
        {folders.map((folder: any) => (
          <option key={folder.folderId} value={folder.folderId}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FileLoader;
