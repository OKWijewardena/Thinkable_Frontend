import Layout from "@/components/layout/Layout";
import Link from "next/link";

const teamMembers = [
  {
    name: "XXXX",
    role: "Speaker",
    img: "/assets/images/team/team-1-1.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "David Betman",
    role: "Singer",
    img: "/assets/images/team/team-1-2.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Jessica Brown",
    role: "Content Creator",
    img: "/assets/images/team/team-1-3.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "David Beckham",
    role: "Speaker",
    img: "/assets/images/team/team-1-4.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Alisha Martin",
    role: "Singer",
    img: "/assets/images/team/team-1-5.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
  {
    name: "Herbert Spin",
    role: "Content Creator",
    img: "/assets/images/team/team-1-6.jpg",
    description:
      "Events bring people together for shared experience and celebration. Weddings and birthdays to conferences, festivals, events create memories.",
  },
];



export default function Home() {
  return (
    <>
      <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="Host Event">
        <>
        <section className="contact-one">
  <div className="container">
    <div className="contact-one__inner">
      <h3 className="contact-one__title">Publish Your Event</h3>
      <p className="contact-one__text">
        For your car we will do everything advice, repairs and they can
        maintenance. We are the some preferred choice
      </p>
      <form
        className="contact-form-validated contact-one__form"
        action="assets/inc/sendemail.php"
        method="post"
        encType="multipart/form-data"
        noValidate
      >
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <input
                type="text"
                name="Event Name"
                placeholder="Enter event name"
                required
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <input
                type="text"
                name="Description"
                placeholder="Event description"
                required
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <input
                type="text"
                name="Contact Details"
                placeholder="Enter contact information"
                required
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <input
                type="text"
                name="Seat Capacity"
                placeholder="Enter total seats available"
                required
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <div className="select-box">
                <select className="selectmenu wide" defaultValue="Ticket Option">
                  <option value="Ticket Option">Ticket Option</option>
                  <option value="Free">Free</option>
                  <option value="Stranded">Stranded</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__input-box">
              <div className="select-box">
                <select className="selectmenu wide" defaultValue="Availability">
                  <option value="Availability">Availability</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="contact-one__input-box">
              <label htmlFor="eventImage" className="contact-one__label">
                Upload Event Image
              </label>
              <div className="contact-one__file-input">
                {/* <input
                  type="file"
                  name="EventImage"
                  id="eventImage"
                  accept="image/*"
                  required
                /> */}
                <br/>
                <button className="main-menu__btn thm-btn">Choose File</button>
                <span className="contact-one__file-label">No file chosen</span>
              </div>
            </div>
          </div>
          
          <div className="col-xl-12">
            <div className="contact-one__btn-box">
              <button
                type="submit"
                className="thm-btn contact-one__btn"
              >
                Submit Now<span className="icon-arrow-right"></span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="result"></div>
    </div>
  </div>
</section>


          <section className="team-page">
            <div className="container">
              <div className="row">
                {teamMembers.map((member, index) => (
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
                          <img src={member.img} alt={member.name} />
                          <div className="team-one__content">
                            <h4 className="team-one__name">
                              <a href="team-details">{member.name}</a>
                            </h4>
                            <p className="team-one__sub-title">{member.role}</p>
                          </div>
                          <div className="team-one__content-hover">
                            <h4 className="team-one__name-hover">
                              <a href="team-details">{member.name}</a>
                            </h4>
                            <p className="team-one__sub-title-hover">
                              {member.role}
                            </p>
                            <p className="team-one__text-hover">
                              {member.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA One Start */}
          {/* <section className="cta-one">
            <div className="container">
              <div className="cta-one__inner">
                <h3 className="cta-one__title">
                  Get Latest Updates Subscribe <br /> to Our Newsletter
                </h3>
                <form
                  className="cta-one__form mc-form"
                  data-url="MC_FORM_URL"
                  noValidate
                >
                  <div className="cta-one__form-input-box">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="EMAIL"
                    />
                    <button type="submit" className="cta-one__btn">
                      <span className="icon-paper-plan"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section> */}
          {/* CTA One End */}
        </>
      </Layout>
    </>
  );
}
