"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CTAOne() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: null,
  });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const email = getCookie("email");
  console.log("User Email:", email);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      images: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let uploadedImagesId = formData.images;
  
    // If an images file is selected, upload it first
    if (formData.images) {
      const formDataForImages = new FormData();
      formDataForImages.append('files', formData.images);
  
      try {
        // Upload the images to the server
        const imagesUploadResponse = await axios.post('http://localhost:1337/api/upload', formDataForImages, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Get the uploaded images's ID
        uploadedImagesId = imagesUploadResponse.data[0]?.id;
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images. Please try again.');
        return;
      }
    }
  
    try {
      // Create the event with the uploaded images ID
      const formPayload = new FormData();
      for (const key in formData) {
        // Append the rest of the form data to the payload
        if (key !== 'images') {
          formPayload.append(`data[${key}]`, formData[key]);
        }
      }
  
      // Include the uploaded images ID in the payload
      formPayload.append('data[images]', uploadedImagesId);
  
      // Create the event
      const response = await axios.post('http://localhost:1337/api/feedbacks', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Feedback created:', response.data);
  
      // Optionally reset the form after submission
      setFormData({
        name: '',
        description: '',
        images: null,
      });
  
      alert('Feedback added successfully!');
    } catch (error) {
      console.error('Error creating feedback:', error);
      alert('Failed to add feedback. Please try again.');
    }
  };

  return (
    <section className="cta-one">
      <div className="container">
        <div className="cta-one__inner">
          <h3 className="cta-one__title">
            Give feedback about your enjoyment
          </h3>
          <form
            className="cta-one__form mc-form"
            data-url="MC_FORM_URL"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="cta-one__form-input-box">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                      onChange={handleChange}
                required
              />
              <br/>
              <br/>
              <input
                type="text"
                placeholder="Enter your feedback about enjoyment"
                name="description"
                value={formData.description}
                      onChange={handleChange}
                required
              />
              <br/>
              <br/>
<label>Upload image of enjoyment</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
            </div>
              <br/>
            <button type="submit" className="thm-btn contact-one__btn">
                      Submit Now<span className="icon-arrow-right"></span>
                    </button>
          </form>
        </div>
      </div>
    </section>
  );
}
