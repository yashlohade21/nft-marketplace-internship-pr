import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mint = (props) => {
  const [filelink, setFileLink] = useState();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setUploadStatus("Please wait...");
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios({
        method: "post",
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: 'e56456df2d47b4e7761e',
          pinata_secret_api_key: "baf1259a68ddadf4017b0c918a49a16446239ce94a375f9828a8a8641dda7db9",          
          "Content-Type": "multipart/form-data",
        },
      });

      const imgHash = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
      setFileLink(imgHash);
      setUploadStatus("Uploaded successfully.");
    } catch (error) {
      setUploadStatus("Failed to upload. Please try again.");
      console.error(error);
    }
  };

  return props.trigger ? (
    <div className="upload-body">
      <br /><br />
      <center>
        <div className="upload-form">
          <center>
            <h5>UPLOAD NFT</h5><br />
            <input type="file" onChange={handleFileChange} className="form-control" />
            <button onClick={handleUpload} className="btn btn-secondary">Upload</button>
            <p>{uploadStatus}</p>
            <button onClick={() => props.setTrigger(false)} className="btn btn-danger">CLOSE</button>
          </center>
        </div>
      </center>
    </div>
  ) : null;
};

export default Mint;
