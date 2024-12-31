import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";

// Define the skillset options
const skillset = [
  "JavaScript",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "SQL",
  "Git",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud Platform",
  "Java",
  "C++",
  "C#",
  "HTML",
  "CSS",
  "Bootstrap",
  "PostgreSQL",
  "MySQL",
  "GraphQL",
  "REST API",
  "Express.js",
  "Redux",
  "Vue.js",
  "Angular",
  "Flutter",
  "Swift",
  "Django",
  "Flask",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "Pandas",
  "NumPy",
  "MATLAB",
  "R",
  "Ruby",
  "Ruby on Rails",
  "PHP",
  "Laravel",
  "Figma",
  "Adobe XD",
  "Jenkins",
  "CI/CD",
  "Terraform",
  "Ansible",
  "Hibernate",
  "Spring Boot",
  "Scala",
  "Hadoop",
  "Spark",
  "Tableau",
  "Power BI",
  "Splunk",
  "ElasticSearch",
  "Kafka",
];

const options = skillset.map((skill) => ({ value: skill, label: skill }));

const SkillSet = ({
  candidateSkills,
  setCandidateSkills,
  updateCandidateData,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort skills based on the search query
  const availableSkills = options
    .filter(
      (skill) =>
        !candidateSkills.includes(skill.value) &&
        skill.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aMatchIndex = a.label
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase());
      const bMatchIndex = b.label
        .toLowerCase()
        .indexOf(searchTerm.toLowerCase());

      if (aMatchIndex === bMatchIndex) {
        return a.label.localeCompare(b.label);
      }
      return aMatchIndex - bMatchIndex;
    });

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions || []);
  };

  const handleDelete = (skillToDelete) => {
    setSelectedSkills((prev) =>
      prev.filter((skill) => skill.value !== skillToDelete.value)
    );
  };

  const handleSkills = async () => {
    const updatedSkills = [
      ...candidateSkills,
      ...selectedSkills.map((s) => s.value),
    ];
    updateCandidateData({ skills: updatedSkills });
    setCandidateSkills(updatedSkills);
    setSelectedSkills([]); // Clear selected skills after submission
  };

  return (
    <div className="pb-5 pl-5 pr-5  bg-white  w-full max-w-3xl ">
      {/* React Select multi-select component with enhanced styling */}
      <div className="flex space-x-4 items-center">
        <div className="w-4/5">
          <Select
            isMulti
            name="skills"
            options={availableSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            value={selectedSkills}
            placeholder="Select skills"
            onInputChange={(newValue) => setSearchTerm(newValue)}
            styles={{
              control: (base) => ({
                ...base,
                padding: "5px 5px",
                borderRadius: "8px",
                borderColor: "#fe4949",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#fd7171",
                borderRadius: "20px",
                padding: "1px",
                margin: "3px 3px",
              }),
              multiValueLabel: (base) => ({
                ...base,
                display: "flex",
                alignContent: "center",
                color: "white",
                fontSize: "13px",
                fontWeight: "500",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "white",
                cursor: "pointer",
                paddingTop: "1px",
                scale: "1.2",
                ":hover": {
                  // color: "black",
                },
              }),
            }}
          />
        </div>

        {/* Button to update the skills in the candidate's profile */}
        <div className="w-1/5">
          <button
            onClick={handleSkills}
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: "5px",
              color: "#fe4949",
              fontWeight: "500",
              padding: "10px 15px",
              borderRadius: "25px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <FaPlus style={{ marginTop: "5px" }}></FaPlus> Add Skills
          </button>
        </div>
      </div>

      {/* Display selected skills with delete option */}
      {/* <div className="flex flex-wrap space-x-2 mt-4">
        {selectedSkills.map((skill) => (
          <div
            key={skill.value}
            className="flex items-center justify-between bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>{skill.label}</span>
            <button
              onClick={() => handleDelete(skill)}
              className="ml-2 text-red-500 hover:text-red-700 transition duration-200"
            >
              &times;
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SkillSet;
