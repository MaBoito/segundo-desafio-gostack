import React, {useState, useEffect} from 'react';

import api from './services/api';

import "./styles.css";

import Header from './components/Header';


function App() {

  const [projects, setProjects]= useState([]);

  useEffect(()=> {
      api.get('projects').then(response =>{
          setProjects(response.data);
      });
  },[]);
  
  async function handleAddRepository() {
    const response = await api.post('projects',{
        title: `Novo projeto`/* ${Date.now()}*/,
        owner: "Matheus Boito"
    });

    const project = response.data;

    setProjects([...projects, project]);  
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/projects/${id}`);

  const projectIndex = projects.findIndex(project => project.id === id);

  const newProjects = [...projects];
  newProjects.splice(projectIndex, 1);
  setProjects(newProjects);
  
  }

  return (  
    
    <div>
          <Header title='projects'/>
      <ul data-testid="repository-list">
      {projects.map(project =>
      <li key={project.id}> {project.title}

          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
