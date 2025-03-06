import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Write2() {
    const navigate=useNavigate();
    const [article,setArticle]=useState({
        tag:"",
        title:"",
        content:"",
        imageA:""
    });
    const {title,content}=article;
    const [file, setFile] = useState(null);
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
    const onValChange=e=>{
        setArticle({...article,[e.target.name]:e.target.value});
    }
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
          callback({ ...article, imageA: imageUrl });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

    const handleSubmit=()=>{
        let user =JSON.parse(localStorage.getItem("LoginUser"));
        if(file){
            uploadImageToCloudinary(file, (updatedArticle) => {
                let a={
                    name:user.name,
                    image:user.image,
                    email:user.email,
                    tag:updatedArticle.tag,
                    title:updatedArticle.title,
                    content:updatedArticle.content,
                    imageA:updatedArticle.imageA
        
                }  
                if(updatedArticle.tag && updatedArticle.content && updatedArticle.title){
                    axios
                        .post("http://localhost:4000/postArticle", a)
                        .then((res) => {
                            alert(res.data.message);
                            navigate("/");
                        
                        })
                        .catch((error) => {
                        console.error("Error creating event:", error);
                        });
                }
          })
        }
        else{
            alert("Select Image file");
        }
    }
  return (
    <div id="article">
       <div id="extradiv"></div>
       <button className='btn btn-success' onClick={handleSubmit}>Publish</button>
       <div id="writingArea">
           <h4 style={{textAlign:"left"}}>Add Tag</h4>
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="tag" onBeforeInput={e=>onValChange(e)}  onChange={e=>onValChange(e)}>
                <option disabled selected>Select Tag</option>
                <option value="life">Life</option>
                <option value="media">Media</option>
                <option value="programming">Programming</option>
                <option value="self improvement">Self Improvement</option>
                <option value="work">Work</option>
                <option value="technology">Technology</option>
                <option value="society">Society</option>
                <option value="culture">culture</option>
                <option value="world">World</option>
            </select>
            <h4 style={{textAlign:"left"}}>Upload Image</h4>
            <input
            type="file"
            className="form-control"
            accept="image/jpeg, image/jpg, image/png" // Restrict file types
            onChange={handleImageChange}
            required/>
            <h4 style={{textAlign:"left"}}>Title</h4>
            <input type="text" name="title" className='form-control' placeholder='Title' value={title} onChange={e=>onValChange(e)}></input>
            <h4 style={{textAlign:"left"}}>Content</h4>
            <textarea className='form-control'placeholder='Content'name="content" value={content} onChange={e=>onValChange(e)}></textarea>
       </div>
       <div id="extradiv2"></div>
    </div>
  )
}
