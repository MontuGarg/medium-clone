import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateW() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        tag: "",
        title: "",
        content: "",
        imageA: ""
    });
    const { title, content } = article;
    
    const onValChange = e => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };
    
    useEffect(() => {
        const loadArticle = async () => {
            try {
                const res = await axios.post(`http://localhost:4000/getArticle/${id}`);
                setArticle(res.data.article);
            } catch (error) {
                console.error("Error loading article:", error);
            }
        };
        loadArticle();
    }, [id]);

    const [file, setFile] = useState(null);
    
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && ["image/jpeg", "image/jpg", "image/png"].includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            alert("Please select a valid image file (jpeg, jpg, png). ");
            e.target.value = "";
        }
    };

    const uploadImageToCloudinary = async (file, callback) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "EventImage");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/daeduuf4u/image/upload`,
                formData
            );
            callback({ ...article, imageA: response.data.secure_url });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = () => {
        let user = JSON.parse(localStorage.getItem("LoginUser"));
        if (file) {
            uploadImageToCloudinary(file, (updatedArticle) => {
                let a = {
                    name: user.name,
                    image: user.image,
                    email: user.email,
                    tag: updatedArticle.tag,
                    title: updatedArticle.title,
                    content: updatedArticle.content,
                    imageA: updatedArticle.imageA
                };
                if (updatedArticle.tag && updatedArticle.content && updatedArticle.title) {
                    axios.post(`http://localhost:4000/updateArticle/${id}`, a)
                        .then((res) => {
                            alert(res.data.message);
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Error updating article:", error);
                        });
                }
            });
        } else {
            alert("Select Image file");
        }
    };

    return (
        <div id="article">
            <div id="extradiv"></div>
            <button className='btn btn-success' onClick={handleSubmit}>Update</button>
            <div id="writingArea">
                <h4 style={{ textAlign: "left" }}>Add Tag</h4>
                <select className="form-select form-select-lg mb-3" name="tag" value={article.tag} onChange={onValChange}>
                    <option disabled>Select Tag</option>
                    <option value="life">Life</option>
                    <option value="media">Media</option>
                    <option value="programming">Programming</option>
                    <option value="self improvement">Self Improvement</option>
                    <option value="work">Work</option>
                    <option value="technology">Technology</option>
                    <option value="society">Society</option>
                    <option value="culture">Culture</option>
                    <option value="world">World</option>
                </select>
                <h4 style={{ textAlign: "left" }}>Upload Img</h4>
                <input type="file" className="form-control" accept="image/jpeg, image/jpg, image/png" onChange={handleImageChange} required />
                <h4 style={{ textAlign: "left" }}>Title</h4>
                <input type="text" name="title" className='form-control' placeholder='Title' value={title} onChange={onValChange} />
                <h4 style={{ textAlign: "left" }}>Content</h4>
                <textarea className='form-control' placeholder='Content' name="content" value={content} onChange={onValChange}></textarea>
            </div>
            <div id="extradiv2"></div>
        </div>
    );
}
