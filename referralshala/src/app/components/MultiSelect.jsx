import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { FaPlus } from "react-icons/fa";
import "../styles/Select.css";

const allSkills = [
  "JavaScript",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "SQL",
  "Git",
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

const SkillSet = ({
  candidateSkills,
  setCandidateSkills,
  updateCandidateData,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = allSkills.filter(
    (skill) => !candidateSkills.includes(skill)
  );

  const handleChange = (e) => {
    setSelectedSkills(e.value);
  };

  const handleAddSkills = () => {
    if (selectedSkills.length === 0) return;

    const updatedSkills = [...new Set([...candidateSkills, ...selectedSkills])];
    setCandidateSkills(updatedSkills);
    updateCandidateData({ skills: updatedSkills });
    setSelectedSkills([]);
  };

  return (
    <div className="skillset-container">
      <MultiSelect
        value={selectedSkills}
        options={availableSkills.map((skill) => ({
          label: skill,
          value: skill,
        }))}
        onChange={handleChange}
        optionLabel="label"
        placeholder="Select Skills"
        display="chip"
        filter
        className="multiselect-dropdown"
        disabled={availableSkills.length === 0}
      />

      <button
        className="add-skills-btn"
        onClick={handleAddSkills}
        disabled={selectedSkills.length === 0}
      >
        <FaPlus className="icon" />
        <span>Add Skills</span>
      </button>
    </div>
  );
};

export default SkillSet;
