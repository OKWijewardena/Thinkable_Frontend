"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Link from "next/link";


export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticket_price: "",
    seat_capacity: "",
    seat_availability: "",
    is_premium: false,
    is_live_stream: false,
    event_image: null,
  });
  const [hostData,setHostData] = useState({
    name: "",
    description: "",
    contact_info: "",
    logo: null,
    user:"",
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hostPermission, setHostPermission] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const email = getCookie("email");
  console.log("User Email:", email);


  useEffect(() => {
    fetchEvents();
    fetchHost();
  }, []);

  const fetchHost = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/hosts?filters[user][$eq]=${email}`);
      console.log(response);

      const hostData = response.data.data;

      if (hostData.length === 0) {
        console.error("No host found for the given email!");
        return;
      }

      const host = hostData[0];

      setHostPermission(host.permission);
      console.log("host permition",host.permission);
      
    } catch (error) {
      console.error('Error fetching host:', error);
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/events?populate=event_image');
      console.log(response);

      const eventsData = response.data.data.map((event) => ({
        id: event.id,
        documentId: event.documentId,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        ticket_price: event.ticket_price,
        seat_capacity: event.seat_capacity,
        seat_availability: event.seat_availability,
        is_premium: event.is_premium,
        is_live_stream: event.is_live_stream,
        event_image: event.event_image
  ? [{ url: `http://localhost:1337${event.event_image[0]?.url}` }] // Prefix URL with the Strapi server URL
  : [], // Wrap in array
      }));

      setUpcomingEvents(eventsData);
      console.log(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleHostChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHostData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      event_image: e.target.files[0],
    }));
  };

  const handleHostFileChange = (e) => {
    setHostData((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let uploadedImageId = formData.event_image;
  
    // If an image file is selected, upload it first
    if (formData.event_image) {
      const formDataForImage = new FormData();
      formDataForImage.append('files', formData.event_image);

      try {
        // Upload the image to the server
        const imageUploadResponse = await axios.post('http://localhost:1337/api/upload', formDataForImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Get the uploaded image's ID
        uploadedImageId = imageUploadResponse.data[0]?.id;
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
        return;
      }
    }
  
    try {
      // Create the event with the uploaded image ID
      const formPayload = new FormData();
      for (const key in formData) {
        // Append the rest of the form data to the payload
        if (key !== 'event_image') {
          formPayload.append(`data[${key}]`, formData[key]);
        }
      }
  
      // Include the uploaded image ID in the payload
      formPayload.append('data[event_image]', uploadedImageId);
  
      // Create the event
      const response = await axios.post('http://localhost:1337/api/events', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Event created:', response.data);
  
      // Optionally reset the form after submission
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        ticket_price: '',
        seat_capacity: '',
        seat_availability: '',
        is_premium: false,
        is_live_stream: false,
        event_image: null,
      });
  
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to add event. Please try again.');
    }
  };

  const handleHostSubmit = async (e) => {
    e.preventDefault();
  
    let uploadedImageId = null;
  
    // Step 1: Upload Image First (if available)
    if (hostData.logo) {
      const imageFormData = new FormData();
      imageFormData.append('files', hostData.logo);
  
      try {
        const imageUploadResponse = await axios.post('http://localhost:1337/api/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        uploadedImageId = imageUploadResponse.data[0]?.id;
      } catch (error) {
        console.error('Error uploading logo:', error);
        alert('Failed to upload logo. Please try again.');
        return;
      }
    }
  
    // Step 2: Prepare JSON Data for the Request
    const hostPayload = {
      data: {
        name: hostData.name,
        description: hostData.description,
        contact_info: hostData.contact_info,
        user: email, // Ensure email is retrieved correctly
        logo: uploadedImageId ? [uploadedImageId] : [], // Ensure this matches Strapi format
      },
    };
  
    try {
      // Step 3: Send Host Data to Strapi
      const response = await axios.post('http://localhost:1337/api/hosts', hostPayload, {
        headers: {
          'Content-Type': 'application/json', // Ensure sending JSON data
        },
      });
  
      console.log('Host created:', response.data);
      alert('Host request sent successfully!');
  
      // Step 4: Reset Form Data
      setHostData({
        name: '',
        description: '',
        contact_info: '',
        logo: null,
        user: email,
      });
    } catch (error) {
      console.error('Error in host requesting:', error);
      alert('Failed to add host. Please try again.');
    }
  };
  

  // Handle dialog open and populate selected event data
  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: event.date || "",
      location: event.location || "",
      ticket_price: event.ticket_price || "",
      seat_capacity: event.seat_capacity || "",
      seat_availability: event.seat_availability || "",
      is_premium: event.is_premium || false,
      is_live_stream: event.is_live_stream || false,
      event_image: event.event_image?.[0]?.id || "", // Store image ID
    });
    setImagePreview(event.event_image?.[0]?.url || null);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setImagePreview(null);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent) {
      alert("No event selected.");
      return;
    }

    try {
      let uploadedImageId = formData.event_image;

      // Upload image if a new file is selected
      // if (imageFile) {
      //   try {
      //     const imageFormData = new FormData();
      //     imageFormData.append("files", imageFile);

      //     const uploadResponse = await axios.post(
      //       "http://localhost:1337/api/upload",
      //       imageFormData,
      //       {
      //         headers: { "Content-Type": "multipart/form-data" },
      //       }
      //     );

      //     if (uploadResponse.status === 200 && uploadResponse.data.length > 0) {
      //       uploadedImageId = uploadResponse.data[0]?.id || "";
      //     } else {
      //       throw new Error("Image upload failed");
      //     }
      //   } catch (imageError) {
      //     console.error("Image Upload Error:", imageError);
      //     alert("Failed to upload image. Please try again.");
      //     return;
      //   }
      // }

      // Prepare updated event data
      const updatedData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        ticket_price: formData.ticket_price,
        seat_capacity: formData.seat_capacity,
        seat_availability: formData.seat_availability,
        is_premium: formData.is_premium,
        is_live_stream: formData.is_live_stream,
      };

      console.log("Updated Event Payload:", updatedData);

      // Send update request
      const response = await axios.put(
        `http://localhost:1337/api/events/${selectedEvent.documentId}`,
        { data: updatedData }
      );

      if (response.status === 200) {
        alert("Event updated successfully!");
        setOpenDialog(false);
        window.location.reload();
      } else {
        throw new Error("Event update failed");
      }
    } catch (updateError) {
      console.error("Event Update Error:", updateError);
      alert("Failed to update event. Please try again.");
    }
  };


  // Handle event deletion
const handleDeleteEvent = async (eventId) => {
  try {
    // Send a DELETE request to the API
    await axios.delete(`http://localhost:1337/api/events/${eventId}`);
    
    // Update the list of events in the UI by filtering out the deleted event
    setUpcomingEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    
    // Notify the user of successful deletion
    alert("Event deleted successfully!");
  } catch (error) {
    // Log and handle the error
    console.error("Error deleting event:", error);
    alert("Failed to delete the event. Please try again.");
  }
};

  
  

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Host Event">
        <>
        {hostPermission ? (
            // Public Event Form (if hostPermission is true)
            <section className="contact-one">
        <div className="container">
          <div className="contact-one__inner">
            <h3 className="contact-one__title">Publish Your Event</h3>
            <p className="contact-one__text">
              Share your event details and bring your community together.
            </p>
            <form
              className="contact-form-validated contact-one__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="title"
                      placeholder="Event Title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="description"
                      placeholder="Event Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="text"
                      name="location"
                      placeholder="Event Location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="number"
                      name="ticket_price"
                      placeholder="Ticket Price"
                      value={formData.ticket_price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="number"
                      name="seat_capacity"
                      placeholder="Seat Capacity"
                      value={formData.seat_capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <input
                      type="number"
                      name="seat_availability"
                      placeholder="Available Seats"
                      value={formData.seat_availability}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <label>
                      Premium Event
                      <input
                        type="checkbox"
                        name="is_premium"
                        checked={formData.is_premium}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="contact-one__input-box">
                    <label>
                      Live Stream Available
                      <input
                        type="checkbox"
                        name="is_live_stream"
                        checked={formData.is_live_stream}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="contact-one__input-box">
                    <label htmlFor="event_image">Upload Event Image</label>
                    <input
                      type="file"
                      name="event_image"
                      id="event_image"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="contact-one__btn-box">
                    <button type="submit" className="thm-btn contact-one__btn">
                      Submit Now<span className="icon-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
        

) : (
  // Host Requesting Form (if hostPermission is false)

        

<section className="contact-one">
<div className="container">
  <div className="contact-one__inner">
    <h3 className="contact-one__title">Request for the host events</h3>
    <p className="contact-one__text">
      You can send request for get permitions for host event.
    </p>
    <form
      className="contact-form-validated contact-one__form"
      onSubmit={handleHostSubmit}
      noValidate
    >
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="contact-one__input-box">
            <input
              type="text"
              name="name"
              placeholder="Host name"
              value={hostData.name}
              onChange={handleHostChange}
              required
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="contact-one__input-box">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={hostData.description}
              onChange={handleHostChange}
              required
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="contact-one__input-box">
            <input
              type="text"
              name="contact_info"
              placeholder="Contact details"
              value={hostData.contact_info}
              onChange={handleHostChange}
              required
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="contact-one__input-box">
            <label htmlFor="logo">Upload host logo</label>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={handleHostFileChange}
              accept="image/*"
              required
            />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="contact-one__btn-box">
            <button type="submit" className="thm-btn contact-one__btn">
              Submit Now<span className="icon-arrow-right"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</section>

)}

{hostPermission ? (
  <section className="team-page">
        
  <div className="container">
    <div className="row">
      {upcomingEvents.map((event, index) => (
        <div
          key={index}
          className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${
            index % 2 === 0 ? "Left" : "Right"
          }`}
          data-wow-delay={`${(index + 1) * 100}ms`}
        >
          <div className="team-one__single">
            <div className="team-one__img-box">
              <div className="team-one__img">
                <img
                  src={event.event_image[0].url}
                  alt={event.title}
                  className="responsive-img"
                />
                <div className="team-one__content">
                  <h4 className="team-one__name">
                    <a href="team-details">{event.title}</a>
                  </h4>
                  <p className="team-one__sub-title">{event.date}</p>
                </div>
                <div className="team-one__content-hover">
                  <h4 className="team-one__name-hover">
                    <a href="team-details">{event.ticket_price}</a>
                  </h4>
                  <p className="team-one__sub-title-hover">{event.title}</p>
                  <p className="team-one__text-hover">{event.description}</p>
                  <div className="button-group">
                    <button
                      className="update-button"
                      onClick={() => handleOpenDialog(event)}
                    >
                      Update
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => handleDeleteEvent(event.documentId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

) : (
  <div>

  </div>
)}


{openDialog && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Update Event</h3>
            <form>
              <label>Event Name</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />

              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>

              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />

              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />

              <label>Ticket Price</label>
              <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} />

              <label>Event Image</label>
              <input type="file" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%" }} />}

              <div className="button-group">
                <button type="button" className="cancel-button" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button type="button" className="update-button" onClick={handleUpdateEvent}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        </>
      </Layout>
    </>
  );
}
