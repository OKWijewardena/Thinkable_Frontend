"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import Link from "next/link";

export default function TeamOne() {
  // State for dynamic content
  const [teamContent, setTeamContent] = useState({
    tagline: "Our Event Team",
    title: "Our Events have Amazing & Learned Event Speakers and Artists",
    members: [
      {
        id: 1,
        name: "Event Speakers",
        role: "Speaker",
        image: "/assets/images/team/team1.jpg",
        hoverText:
          "Event speakers bring valuable insights, inspiration, and expertise to captivate the audience. Their stories and knowledge foster meaningful discussions, empowering attendees to learn, innovate, and grow.",
        link: "/team-details",
      },
      {
        id: 2,
        name: "Event Singers",
        role: "Singer",
        image: "/assets/images/team/team2.jpeg",
        hoverText:
          "Event singers set the perfect mood with their captivating vocals, delivering powerful and soulful performances that resonate with the audience.",
        link: "/team-details",
      },
      {
        id: 3,
        name: "DJ Artists",
        role: "Content Creator",
        image: "/assets/images/team/team3.jpg",
        hoverText:
          "Event DJ artists keep the crowd energized with electrifying beats and seamless mixes, ensuring a vibrant and unforgettable atmosphere.",
        link: "/team-details",
      },
    ],
  });

  return (
    <>
      {/* Team One Start */}
      <section className="team-one">
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">{teamContent.tagline}</span>
            </div>
            <h2 className="section-title__title">
              {teamContent.title.split(" & ").map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
            </h2>
          </div>
          <div className="row">
            {teamContent.members.map((member, index) => (
              <div
                key={member.id}
                className={`col-xl-4 col-lg-6 wow fadeIn${
                  index === 0 ? "Left" : index === 1 ? "Up" : "Right"
                }`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="team-one__single">
                  <div className="team-one__img-box">
                    <div className="team-one__img">
                      <img src={member.image} alt={member.name} style={{
    width: "455px",
    height: "410px",
    objectFit: "cover", // Ensures the image is scaled proportionally
    borderRadius: "8px" // Optional: Adds rounded corners
  }}/>
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link href={member.link}>{member.name}</Link>
                        </h4>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link href={member.link}>{member.name}</Link>
                        </h4>
                        <p className="team-one__text-hover">{member.hoverText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team One End */}
    </>
  );
}
