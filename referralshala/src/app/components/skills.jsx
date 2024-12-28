import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

// Expanded array of technical skills
const skills = [
  'JavaScript',
  'Python',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'MongoDB',
  'SQL',
  'Git',
  'Tailwind CSS',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud Platform',
  'Java',
  'C++',
  'C#',
  'HTML',
  'CSS',
  'Bootstrap',
  'PostgreSQL',
  'MySQL',
  'GraphQL',
  'REST API',
  'Express.js',
  'Redux',
  'Vue.js',
  'Angular',
  'Flutter',
  'Swift',
  'Django',
  'Flask',
  'TensorFlow',
  'PyTorch',
  'OpenCV',
  'Pandas',
  'NumPy',
  'MATLAB',
  'R',
  'Ruby',
  'Ruby on Rails',
  'PHP',
  'Laravel',
  'Figma',
  'Adobe XD',
  'Jenkins',
  'CI/CD',
  'Terraform',
  'Ansible',
  'Hibernate',
  'Spring Boot',
  'Scala',
  'Hadoop',
  'Spark',
  'Tableau',
  'Power BI',
  'Splunk',
  'ElasticSearch',
  'Kafka',
];

function getStyles(skill, selectedSkills, theme) {
  return {
    fontWeight: selectedSkills.includes(skill)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDelete = (skillToDelete) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill !== skillToDelete));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="technical-skills-label">Skills</InputLabel>
        <Select
          labelId="technical-skills-label"
          id="technical-skills"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Skills" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(value)}
                  onMouseDown={(event) => event.stopPropagation()} // Prevents dropdown toggle
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {skills.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
              style={getStyles(skill, selectedSkills, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
