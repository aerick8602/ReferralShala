import "../styles/Courses.css";
import Link from "next/link";
import { useRef } from "react";

const courses = [
  {
    id: 1,
    title: "AI & ML Course",
    description:
      "Learn AI & ML with hands-on projects and real-world applications.",
    image: "aiml.jpeg",
    price: "₹5500",
    link: "https://www.coursera.org/learn/introduction-to-ai",
  },
  {
    id: 2,
    title: "Java Course",
    description: "Master Java programming from basics to advanced concepts.",
    image: "Java.jpeg",
    price: "₹2500",
    link: "https://www.coursera.org/specializations/java-programming",
  },
  {
    id: 3,
    title: "Web Development",
    description:
      "Become a full-stack web developer with this comprehensive course.",
    image: "webdev.jpeg",
    price: "Free",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    id: 4,
    title: "Cybersecurity Basics",
    description: "Learn the fundamentals of cybersecurity and ethical hacking.",
    image: "cyber.jpeg",
    price: "₹3000",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity",
  },
  {
    id: 5,
    title: "Data Science",
    description: "Master data science techniques with Python and R.",
    image: "data science.jpeg",
    price: "₹100000",
    link: "https://www.coursera.org/degrees/bachelor-of-science-data-science-ai-iitguwahati",
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and Google Cloud from experts.",
    image: "cloud.jpeg",
    price: "₹4000",
    link: "https://cloud.google.com/learn/training",
  },
];

const CoursesList = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <>
      <div className="courses-container">
        <div className="ctitle">Explore Our Courses</div>
        <div className="slider-wrapper">
          <button className="scroll-button left" onClick={() => scroll("left")}>
            <i className="pi pi-arrow-left"></i> {/* Previous arrow */}
          </button>
          <div ref={scrollRef} className="courses-slider">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <div className="course-content">
                  <div className="course-title">{course.title}</div>
                  <div className="course-description">{course.description}</div>
                  <div className="course-footer">
                    <span className="course-price">{course.price}</span>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="view-course">View Course</button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="scroll-button right"
            onClick={() => scroll("right")}
          >
            <i className="pi pi-arrow-right"></i> {/* Next arrow */}
          </button>
        </div>
      </div>
    </>
  );
};

export default CoursesList;
