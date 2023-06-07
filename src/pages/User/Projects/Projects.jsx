import { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem('authToken')),
      },
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/getprojects`, requestOptions);
    const result = await response.json();

    if (result.data) {
      setProjects(result.data);
    }
  };

  return (
    <div>
      <ul>
        {projects.map((client) => {
          return <li key={project.id}>{project.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Projects;
