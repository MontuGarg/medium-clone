import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    image:""
  })
  const [file, setFile] = useState(null);
  const {name,email,password}=user;
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the selected file is of the correct type (jpeg, jpg, png)
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg" ||
        selectedFile.type === "image/png")
    ) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file (jpeg, jpg, png).");
      e.target.value = ""; // Clear the input
    }
  };

  const uploadImageToCloudinary = async (file, callback) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EventImage"); // Set your Cloudinary upload preset here

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/daeduuf4u/image/upload`, // Cloudinary upload URL
        formData
      );
      console.log("Image uploaded successfully:", response.data);
      const imageUrl = response.data.secure_url;

      // Call the callback function with the updated event data
      callback({ ...user, image: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const onValChange=e=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  const handleSubmit=()=>{
    if(user.name && user.email&&user.password && file){
      uploadImageToCloudinary(file, (updateduser) => {
        axios
          .post("http://localhost:4000/register", updateduser)
          .then((res) => {
              alert(res.data.message);
              navigate("/login");
            
          })
          .catch((error) => {
            console.error("Error creating event:", error);
          });
        
    })
  }else{
    alert("Enter valid Details");
  }
}
  return (<div id="loginDiv"><div id='extradiv'></div>
        <div id="registerCom">
            <h1 >REGISTER</h1>
         
                <table >
                    <tr>
                        <td >
                            Name :<input type="text" class="form-control" name="name" value={name}onChange={e=>onValChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Email :<input type="text" class="form-control "name="email" value={email}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                      <td>
                            Password :<input type="number" class="form-control "name="password" value={password}onChange={e=>onValChange(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Upload Profile Picture :<input
            type="file"
            className="form-control"
            accept="image/jpeg, image/jpg, image/png" // Restrict file types
            onChange={handleImageChange}
            required
          />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan={2}>
                        <button className='btn btn-dark form-control'  onClick={()=>handleSubmit()}>Register</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        Already have account ? <a href='login' id='link'>Login</a></td>
                    </tr>
                </table>
                
            

        </div></div>
  )
}