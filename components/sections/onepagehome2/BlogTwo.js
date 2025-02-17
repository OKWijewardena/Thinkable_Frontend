import Link from "next/link";

const blogPosts = [
  {
    date: "Oct 19",
    title: "This piques curiosity and makes readers want",
    imgSrc: "/assets/images/blog/blog-2-1.jpg",
    link: "/blog-details",
    comments: 5,
    author: "admin",
  },
  {
    date: "Oct 25",
    title: "Clear value proposition and actionable steps",
    imgSrc: "/assets/images/blog/blog-2-2.jpg",
    link: "/blog-details",
    comments: 5,
    author: "admin",
  },
  {
    date: "Sep 25",
    title: "Makes readers want to know the answer",
    imgSrc: "/assets/images/blog/blog-2-3.jpg",
    link: "/blog-details",
    comments: 5,
    author: "admin",
  },
];

export default function BlogTwo() {
  return (
    <section className="blog-two" id="blog">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Blog and news</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
            Latest Event News <br /> & Update
          </h2>
        </div>
        <div className="row">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${index % 2 === 0 ? "Left" : "Right"}`}
              data-wow-delay={`${100 + index * 100}ms`}
            >
              <div className="blog-two__single">
                <div className="blog-two__img">
                  <img src={post.imgSrc} alt={post.title} />
                  <div className="blog-two__hover">
                    <Link href={post.link}>
                      <div className="blog-two__hover-icon-1">
                        <span className="blog-two__hover-icon-2"></span>
                      </div>
                    </Link>
                  </div>
                  <div className="blog-two__date">
                    <p>{post.date}</p>
                  </div>
                </div>
                <div className="blog-two__content">
                  <ul className="blog-two__meta list-unstyled">
                    <li>
                      <a href="#"><span className="icon-user"></span>By {post.author}</a>
                    </li>
                    <li>
                      <a href="#"><span className="icon-comments"></span>Comments ({post.comments})</a>
                    </li>
                  </ul>
                  <h3 className="blog-two__title">
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                  <div className="blog-two__btn-box-two">
                    <Link href={post.link} className="blog-two__btn thm-btn">
                      Read More<span className="icon-arrow-right"></span>
                    </Link>
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
