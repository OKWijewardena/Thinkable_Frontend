"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const galleryItems = [
  {
    src: "/assets/images/gallery/gallery-1-1.jpg",
    alt: "Gallery 1",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-2.jpg",
    alt: "Gallery 2",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-3.jpg",
    alt: "Gallery 3",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-4.jpg",
    alt: "Gallery 4",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-5.jpg",
    alt: "Gallery 5",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-6.jpg",
    alt: "Gallery 6",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-7.jpg",
    alt: "Gallery 7",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
  {
    src: "/assets/images/gallery/gallery-1-9.jpg",
    alt: "Gallery 9",
    title: "Dream Makers Event Planning",
    subtitle: "Gala Affairs",
    href: "/gallery-details",
  },
];

export default function GalleryOne() {
  const [columns, setColumns] = useState(3);
  const [upcomingFeedbacks, setUpcomingFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/feedbacks?populate=images');
      console.log(response);

      const feedbackData = response.data.data.map((feedback) => ({
        id: feedback.id,
        documentId: feedback.documentId,
        name: feedback.name,
        description: feedback.description,
        images: feedback.images
  ? [{ url: `http://localhost:1337${feedback.images[0]?.url}` }] // Prefix URL with the Strapi server URL
  : [], // Wrap in array
      }));

      setUpcomingFeedbacks(feedbackData);
      console.log(feedbackData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
    <section className="gallery-one">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Feedback for Our Events</span>
          </div>
          <h2 className="section-title__title">
            An evening for creator & art <br /> lover meet together
          </h2>
        </div>
        <div className="row masonary-layout">
          {upcomingFeedbacks.map((feedback, index) => (
            <div
              key={feedback}
              className={`col-xl-${feedback === 8 ? 3 : 3} col-lg-6 col-md-6`}
            >
              <div className="gallery-one__single">
                <div className="gallery-one__img">
                <img
                  src={feedback.images[0].url}
                  alt={feedback.name}
                  style={{
                    width: "407px",
                    height: "378px",
                    objectFit: "cover", // Ensures the image is scaled proportionally
                    borderRadius: "8px" // Optional: Adds rounded corners
                  }}
                />
                  <div className="gallery-one__content">
                    <div className="gallery-one__sub-title-box">
                      <div className="gallery-one__sub-title-shape"></div>
                      <p className="gallery-one__sub-title">{feedback.description}</p>
                    </div>
                    <h4 className="gallery-one__title">
                      {feedback.name}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
