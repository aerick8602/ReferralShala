
import "../styles/Courses.css";
import Link from "next/link";
import { useRef } from "react";

const courses = [
  {
    id: 1,
    title: "AI & ML Course",
    description: "Learn AI & ML with hands-on projects and real-world applications.",
    image: "aiml.jpeg", // Fill with correct image link
    price: "₹5500",
    link: "https://www.coursera.org/learn/introduction-to-ai", // Fill with correct link
  },
  {
    id: 2,
    title: "Java Course",
    description: "Master Java programming from basics to advanced concepts.",
    image: "Java.jpeg", // Fill with correct image link
    price: "₹2500",
    link: "https://www.coursera.org/specializations/java-programming", // Fill with correct link
  },
  {
    id: 3,
    title: "Web Development",
    description: "Become a full-stack web developer with this comprehensive course.",
    image: "webdev.jpeg", // Fill with correct image link
    price: "₹00.00",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", // Fill with correct link
  },
  {
    id: 4,
    title: "Cybersecurity Basics",
    description: "Learn the fundamentals of cybersecurity and ethical hacking.",
    image: "cyber.jpeg", // Fill with correct image link
    price: "₹3000",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_google-cybersecurity_google_ftcof_professional-certificates_cx_dr_bau_gg_sem_pr_in_all_m_hyb_24-03_x&campaignid=20122356860&adgroupid=150743468562&device=c&keyword=cyber%20security%20courses%20online&matchtype=p&network=g&devicemodel=&creativeid=696893433067&assetgroupid=&targetid=kwd-13474713204&extensionid=&placement=&gad_source=1&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfSgDCmPbEEbUJChLXRdiwsF2_w1iNCC3zhe61OyjcEgi8-Os63Ig5U4aAgRjEALw_wcB", // Fill with correct link
  },
  {
    id: 5,
    title: "Data Science",
    description: "Master data science techniques with Python and R.",
    image: "data science.jpeg", // Fill with correct image link
    price: "₹100000",
    link: "https://www.coursera.org/degrees/bachelor-of-science-data-science-ai-iitguwahati", // Fill with correct link
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and Google Cloud from experts.",
    image: "cloud.jpeg", // Fill with correct image link
    price: "₹4000",
    link: "https://cloud.google.com/learn/training", // Fill with correct link
  }
];

const CoursesList = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 270 * 2; // Scroll by 2 courses at a time
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="courses-container">
      <h2 className="title">Courses for Sale</h2>
      <div className="slider-wrapper">
        <button className="scroll-button left" onClick={() => scroll("left")}>◀</button>
        <div ref={scrollRef} className="courses-slider">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {course.image && (
                <img src={course.image} alt={course.title} className="course-image" />
              )}
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <p className="course-price">{course.price}</p>
              <a 
                  href={course.link.startsWith("http") ? course.link : `https://${course.link}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
              >
                <button className="view-course">View Course</button>
              </a>

            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scroll("right")}>▶</button>
      </div>
    </div>
  );
};

export default CoursesList;
