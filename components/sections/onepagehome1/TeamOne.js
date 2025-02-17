"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import Link from "next/link";

export default function TeamOne() {
  // State for dynamic content
  const [teamContent, setTeamContent] = useState({
    tagline: "Our Team Member",
    title: "Our Amazing & Learned Event Speakers",
    members: [
      {
        id: 1,
        name: "David Beckham",
        role: "Speaker",
        image: "/assets/images/team/team-1-1.jpg",
        hoverText:
          "Events bring people together for shared experiences and celebrations. From weddings and birthdays to conferences and festivals, events create memories.",
        link: "/team-details",
      },
      {
        id: 2,
        name: "David Betman",
        role: "Singer",
        image: "/assets/images/team/team-1-2.jpg",
        hoverText:
          "Events bring people together for shared experiences and celebrations. From weddings and birthdays to conferences and festivals, events create memories.",
        link: "/team-details",
      },
      {
        id: 3,
        name: "Jessica Brown",
        role: "Content Creator",
        image: "/assets/images/team/team-1-3.jpg",
        hoverText:
          "Events bring people together for shared experiences and celebrations. From weddings and birthdays to conferences and festivals, events create memories.",
        link: "/team-details",
      },
    ],
  });

  return (
    <>
      {/* Team One Start */}
      <section className="team-one" id="team">
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
                      <img src={member.image} alt={member.name} />
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link href={member.link}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title">{member.role}</p>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link href={member.link}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title-hover">{member.role}</p>
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
