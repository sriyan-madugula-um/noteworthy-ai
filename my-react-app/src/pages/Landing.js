import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import LandingNavBar from "../components/LandingNavBar";
import LargeText from "../components/LargeText";
import backgroundImage from "./background.png";
import { Link } from 'react-router-dom';
import "./Landing.css"; // Import the CSS file
import axios from 'axios';
import FileUploadButton from './fileuploadbutton';

function Landing() {
    var btns = []
    let text = ["GitHub"]
    let url = ['https://github.com/AksheetDUTTA123/Google_Mhacks_Project2024'];

    for (let i = 0; i < 1; ++i) {
        btns.push(
            <Link to={url[i]} key={i}>
                <Button variant="transparent" className="mr-3 ml-3">
                    {text[i]}
                </Button>
            </Link>
        )
    }

    const fullPage = {
        height: '100vh', // 100% of viewport height
        width: '100vw', // 100% of viewport width
        margin: 0,
        padding: 0,
    };

    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
  
    function handleMultipleChange(event) {
      setFiles([...event.target.files]);
    }
  
    function handleMultipleSubmit(event) {
      event.preventDefault();
      const url = 'http://localhost:3000/uploadFiles';
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
  
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
  
      axios.post(url, formData, config)
        .then((response) => {
          console.log(response.data);
          setUploadedFiles(response.data.files);
        })
        .catch((error) => {
          console.error("Error uploading files: ", error);
        });
    }

    return (
        <div className="" style={fullPage}>
            <div className="bg-img" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                height: '120vh',
            }}>
                <LandingNavBar style={{}} buttons={btns} />
            </div>
            <div className="" style={{ position: 'absolute', top: '25%', left: '25%' }}>
                <LargeText text="Note.ai" />
                <h1 style={{ textAlign: 'left', color: 'ivory' }}>Insert motto here ✨</h1>
                {/* <div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <input id="file-upload" type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                        Choose file
                    </label>
                </div> */}
                <FileUploadButton />
                <div className="App">
                    <form onSubmit={handleMultipleSubmit}>
                        <h1>React Multiple File Upload</h1>
                        {/* Apply the custom-file-upload class directly to the input element */}
                        <input type="file" multiple onChange={handleMultipleChange} className="custom-file-upload" />
                        <button type="submit">Upload</button>
                    </form>
                    {uploadedFiles.map((file, index) => (
                        <img key={index} src={file} alt={`Uploaded content ${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Landing;
