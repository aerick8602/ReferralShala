import React, { useState } from "react";
import Select from "react-select";

// Define the skillset options
const skillset = [
  'JavaScript', 'Python', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB',
  'SQL', 'Git', 'Tailwind CSS', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud Platform',
  'Java', 'C++', 'C#', 'HTML', 'CSS', 'Bootstrap', 'PostgreSQL', 'MySQL', 'GraphQL', 'REST API',
  'Express.js', 'Redux', 'Vue.js', 'Angular', 'Flutter', 'Swift', 'Django', 'Flask', 'TensorFlow',
  'PyTorch', 'OpenCV', 'Pandas', 'NumPy', 'MATLAB', 'R', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel',
  'Figma', 'Adobe XD', 'Jenkins', 'CI/CD', 'Terraform', 'Ansible', 'Hibernate', 'Spring Boot',
  'Scala', 'Hadoop', 'Spark', 'Tableau', 'Power BI', 'Splunk', 'ElasticSearch', 'Kafka'
];

const options = skillset.map(skill => ({ value: skill, label: skill }));

const SkillSet = ({ candidateSkills, setCandidateSkills, updateCandidateData }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort skills based on the search query
  const availableSkills = options
    .filter(
      (skill) =>
        !candidateSkills.includes(skill.value) && skill.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Sort based on how closely the skill label matches the search term
      const aMatchIndex = a.label.toLowerCase().indexOf(searchTerm.toLowerCase());
      const bMatchIndex = b.label.toLowerCase().indexOf(searchTerm.toLowerCase());
      
      if (aMatchIndex === bMatchIndex) {
        return a.label.localeCompare(b.label); // If equal, sort alphabetically
      }
      return aMatchIndex - bMatchIndex; // Sort based on the first match position
    });

  const handleChange = (selectedOptions) => {
    // Update selected skills
    setSelectedSkills(selectedOptions || []);
  };

  const handleDelete = (skillToDelete) => {
    // Remove a skill from selectedSkills
    setSelectedSkills((prev) => prev.filter((skill) => skill.value !== skillToDelete.value));
  };

  const handleSkills = async () => {
    const updatedSkills = [...candidateSkills, ...selectedSkills.map((s) => s.value)];
    updateCandidateData({ skills: updatedSkills });
    setCandidateSkills(updatedSkills);
    setSelectedSkills([]); // Clear selected skills after submission
  };

  return (
    <div>
      {/* React Select multi-select component */}
      <Select
        isMulti
        name="skills"
        options={availableSkills}  // Using filtered and sorted availableSkills
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        value={selectedSkills}
        placeholder="Select skills"
        onInputChange={(newValue) => setSearchTerm(newValue)}  // Update search term when user types
      />

      {/* Display selected skills with delete option */}
      <div className="mt-4">
        {selectedSkills.map((skill) => (
          <div key={skill.value} className="flex items-center justify-between">
            <span>{skill.label}</span>
            <button onClick={() => handleDelete(skill)} className="text-red-500 ml-2">
              X
            </button>
          </div>
        ))}
      </div>

      {/* Button to update the skills in the candidate's profile */}
      <button
        onClick={handleSkills}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Update Skills
      </button>
    </div>
  );
};

export default SkillSet;
