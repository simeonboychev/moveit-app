import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import App from "../../App";
import FileUploader from "../FileUploader/FileUploader";
import FileDeleter from "../FileDeleter/FileDeleter";

const Router = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/file-uploader">File Uploader</Link> |{" "}
        <Link to="/file-deleter">File Deleter</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/file-uploader" element={<FileUploader />} />
        <Route path="/file-deleter" element={<FileDeleter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
