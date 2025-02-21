"use client";
import React, { Profiler, useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const [subscription, setSubscription] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [Profile, setProfile] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDetails, setOpenDialogDetails] = useState(false);

  const [formData, setFormData] = useState({
    Picture: null,
  });

  const [formDataDetails, setFormDataDetails]= useState({
    name:"",
    contact_number:"",
    address:""
  })

  const[profileId, setProfileId] = useState("");

  const getCookie = (name) => {
    if (typeof window !== "undefined") {
      // Only access document.cookie in the browser
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    return null;
  };
  
  const email = getCookie("email");
  console.log("User Email:", email);
const documentId = getCookie('documentId');
console.log(documentId);

  useEffect(() => {

    fetchSubscription();
    fetchProfile();
    fetchTickets();
  }, []);

  const fetchSubscription = async () => {
    try {
        console.log("Fetching subscriptions for email:", email);
        
        const response = await axios.get(
          `http://localhost:1337/api/subscriptions?filters[user][$eq]=${email}`
        );

    const subscribeData = response.data.data.map((subscribe) => ({
      id: subscribe.id,
      documentId: subscribe.documentId,
      start_date: subscribe.start_date,
      end_date: subscribe.end_date,
      time_period_months: subscribe.time_period_months,
      subscription_fee: subscribe.subscription_fee
    }));

    setSubscription(subscribeData);
    calculateTotalFee(subscribeData);
  } catch (error) {
    console.error("Error fetching subscribes:", error);
  }
};

const fetchTickets = async () => {
  try {
      console.log("Fetching tickets for email:", email);
      
      const response = await axios.get(
        `http://localhost:1337/api/tickets?filters[user][$eq]=${email}`
      );

      const ticketDataArray = response.data.data.map((ticket) => ({
        id: ticket.id,
        documentId: ticket.documentId,
        purchase_date: ticket.purchase_date,
        price: ticket.price,
        event: ticket.event
      }));

      setTicket(ticketDataArray);

} catch (error) {
  console.error("Error fetching tickets:", error);
}
};

const fetchEvent = async (eventId) => {

  try {
    const eventResponse = await axios.get(`http://localhost:1337/api/events?populate=event_image&filters[documentId][$eq]=${eventId}`);

      const eventsData = eventResponse.data.data.map((event) => ({
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
          ? [{ url: `http://localhost:1337${event.event_image[0]?.url}` }]
          : [],
      }));

      setEventDetails(eventsData);
      // setImagePreview(eventsData.event_image[0]?.url || null);
      setShowModal(true);
    
  } catch (error) {
    console.error("Error fetching Event details:", error);
  }
}

const fetchProfile = async () => {
    try {
        console.log("Fetching subscriptions for email:", email);
        
        const response = await axios.get(
          `http://localhost:1337/api/profiles?populate=Picture&filters[user][$eq]=${email}`
        );

    const profileData = response.data.data.map((profile) => ({
      id: profile.id,
      documentId: profile.documentId,
      name: profile.name,
      Picture: profile.Picture
          ? [{ url: `http://localhost:1337${profile.Picture.url}` }]
          : [],
      contact_number: profile.contact_number,
      membership_balance: profile.membership_balance,
      subscription_status: profile.subscription_status,
      address: profile.address,
      user: profile.user,
    }));

    setProfile(profileData);
    console.log("profile data: ", profileData);

  } catch (error) {
    console.error("Error fetching subscribes:", error);
  }
};

  const calculateTotalFee = (subscriptions) => {
    const total = subscriptions.reduce(
      (sum, subscription) => sum + (subscription.subscription_fee || 0),
      0
    );
    setTotalFee(total);
  };

  const popup = async (profileID) => {
    setOpenDialog(true);
    setProfileId(profileID);
  };

  const popupDetails = async (profile) => {
    setOpenDialogDetails(true);
    setFormDataDetails({
      name: profile.name || "",
      contact_number: profile.contact_number || "",
      address: profile.address || "",
    });
    setProfileId(profile.documentId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenDialogDetails(false);
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      Picture: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
  
    let uploadedImageId = formData.Picture;
    console.log("profile ID:", profileId);
  
    // If an image file is selected, upload it first
    if (formData.Picture) {
      const formDataForImage = new FormData();
      formDataForImage.append('files', formData.Picture);

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
        if (key !== 'Picture') {
          formPayload.append(`data[${key}]`, formData[key]);
        }
      }
  
      // Include the uploaded image ID in the payload
      formPayload.append('data[Picture]', uploadedImageId);
  
      // Create the event
      const response = await axios.put(`http://localhost:1337/api/profiles/${profileId}`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Profile Picture:', response.data);
  
      alert('Profile Picture Updated successfully!');
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating profile picture:', error);
      alert('Failed to add profile picture. Please try again.');
    }
  };

  const handleUpdateProfile = async () => {

    try {

      const updatedData = {
        name: formDataDetails.name,
        address: formDataDetails.address,
        contact_number: formDataDetails.contact_number,
      };

      console.log("Updated Profile Payload:", updatedData);

      // Send update request
      const response = await axios.put(
        `http://localhost:1337/api/profiles/${profileId}`,
        { data: updatedData }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setOpenDialogDetails(false);
        window.location.reload();
      } else {
        throw new Error("Profile update failed");
      }
    } catch (updateError) {
      console.error("Profile Update Error:", updateError);
      alert("Failed to update Profile. Please try again.");
    }
  };


  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Profile">
        <div>
          <section className="blog-page">
            <div className="container">
            {Profile.map((profile) => (
                <div>
                    <div className="row">

                    <div className="event-details__speakers">
                    <img
      src={
        profile.Picture[0]?.url ||
        "/assets/images/blog/blog-1-1.png"
      }
      alt="Profile"
      style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #ddd"
      }}
    />
    <br/><br/>
                        <h3 className="event-details__speakers-title">{profile.name}</h3>
                        <br/>
                        <h3 className="event-details__speakers-title">{profile.address}</h3>
                        <br/>
                        <h3 className="event-details__speakers-title">{profile.contact_number}</h3>
                        <br/>
                        <button
                                className="schedule-one__btn thm-btn"
                                onClick={() => popup(profile.documentId)}
                              >
                                Update profile picture
                              </button>
                              <br/><br/>
                        <button
                                className="schedule-one__btn thm-btn"
                                onClick={() => popupDetails(profile)}
                              >
                                Update details
                              </button>
                    </div>
                    </div>
                    
                    <br/>
                    <div className="row">
                    <div className="event-details__speakers">
                        <p className="event-details__speakers-sub-title">
                        Your subscription balance
                        </p>

                        <p className="event-details__speakers-text">
                        Events are special occasions where people gather together
                        to celebrate...
                        </p>
                        <br/>
                        <h3 className="event-details__speakers-title">${profile.membership_balance}</h3>
                    </div>
                    </div>
                
                    
              </div>
              ))}
              <div className="row">
              <h1 className="blog-one__title">Your Purchased Tickets</h1>
                {ticket.map((ticket, index) => (
                  <div
                    key={ticket.id}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                      index % 3 === 0
                        ? "Left"
                        : index % 3 === 1
                        ? "Up"
                        : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="blog-one__single">
                      <div className="blog-one__img">
                      </div>
                      <div className="blog-one__content">
                      <h3 className="blog-one__title">Purchase Date</h3>
                        <ul className="blog-one__meta list-unstyled">
                          <li><a href="#">{ticket.purchase_date}</a></li>
                          {/* <li><a href="#">{ticket.end_date}</a></li> */}
                        </ul>
                        <h3 className="blog-one__title">Ticket Price</h3>
                        <ul className="blog-one__meta list-unstyled">
                          {/* <li><a href="#">{ticket.start_date}</a></li> */}
                          <li><a href="#">{ticket.price}</a></li>
                        </ul>
                        <div className="blog-one__btn-box-two">
                          <button
                            className="blog-one__btn-2 thm-btn"
                            onClick={() => fetchEvent(ticket.event)}
                          >
                            Event Details
                            <span className="icon-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row">
              <h1 className="blog-one__title">Subscribed plans</h1>
                {subscription.map((subscription, index) => (
                  <div
                    key={subscription.id}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                      index % 3 === 0
                        ? "Left"
                        : index % 3 === 1
                        ? "Up"
                        : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="blog-one__single">
                      <div className="blog-one__img">
                      </div>
                      <div className="blog-one__content">
                      <h3 className="blog-one__title">Start date</h3>
                        <ul className="blog-one__meta list-unstyled">
                          <li><a href="#">{subscription.start_date}</a></li>
                          {/* <li><a href="#">{subscription.end_date}</a></li> */}
                        </ul>
                        <h3 className="blog-one__title">End date</h3>
                        <ul className="blog-one__meta list-unstyled">
                          {/* <li><a href="#">{subscription.start_date}</a></li> */}
                          <li><a href="#">{subscription.end_date}</a></li>
                        </ul>
                        <h3 className="blog-one__title">{subscription.subscription_fee}</h3>
                        <div className="blog-one__btn-box-two">
                          <button
                            className="blog-one__btn-2 thm-btn"
                          >
                            Renew Subscribe
                            <span className="icon-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {openDialog && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Update Profile Picture</h3>
            <form>

              <label>Profile Picture {profileId}</label>
              <input type="file" onChange={handleFileChange} />

              <div className="button-group">
                <button type="button" className="cancel-button" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button type="button" className="update-button" onClick={handleUpdateProfilePicture}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{openDialogDetails && (
        <div className="dialog-backdrop">
          <div className="dialog-box">
            <h3>Update Profile Details</h3>
            <form>
              <label>Name</label>
              <input type="text" name="name" value={formDataDetails.name} onChange={handleChange} />

              <label>Address</label>
              <textarea name="address" value={formDataDetails.address} onChange={handleChange} rows="4"></textarea>

              <label>Contact Details</label>
              <input type="text" name="contact_number" value={formDataDetails.contact_number} onChange={handleChange} />

              <div className="button-group">
                <button type="button" className="cancel-button" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button type="button" className="update-button" onClick={handleUpdateProfile}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

          {/* Modal Popup */}
        {showModal && (
          <div className="dialog-backdrop">
          <div className="dialog-box">
            <div className="event-details__speakers">
            <h3>Event Details</h3>
            {eventDetails.map((event) => (
          
            <form>
              <div>
                
              <br/>
              <div className="file-input">
                {event.event_image.length > 0 && (
  <img
    src={event.event_image[0].url}
    alt="Event Preview"
    style={{ maxWidth: "100%" }}
  />
)}
              </div>
              <br/>
              <h5 className="event-details__speakers-title">{event.title}</h5>
              </div>
              <br/>
              <div>
                <label>Description</label>
                <p className="event-details__speakers-title">{event.description}</p>
              </div>
              <br/>
              <div>
                <label>Date</label>
                <p className="event-details__speakers-title">{event.date}</p>
              </div>
              <br/>
              <div>
                <label>Location</label>
                <p className="event-details__speakers-title">{event.location}</p>
              </div>
              <br/>
              <div>
                <label>Ticket Price</label>
                <p className="event-details__speakers-title">{event.ticket_price}</p>
              </div>
              <br/>
              <div className="button-group">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
            ))}
            </div>
          </div>
        </div>
        )}
        </div>
      </Layout>
    </>
  );
}
