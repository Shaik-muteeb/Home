// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar, Table, Modal, Button, Form } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      empId: 'VTS2025148',
      name: 'Shaik Muteeb',
      emailId: 'muteebshaik123@gmail.com',
      start: '2024-07-19',
      task: 'Data Management Table',
      progress: 70,
      picture: 'muteeb.jpg',
    },
    {
      id: 2,
      empId: 'VTS2025150',
      name: 'Nimmala Pavan',
      emailId: 'pavannimmala3003@gmail.com',
      start: '2024-07-19',
      task: 'Advance Firewall',
      progress: 50,
      picture: 'pavan.jpg',
    },
    {
      id: 3,
      empId: 'VTS2025149',
      name: 'Kopuru Manoj',
      emailId: 'kopurumanoj224@gmail.com',
      start: '2024-07-19',
      task: 'Landing Page',
      progress: 60,
      picture: 'manoj.jpg',
    },
    {
      id: 4,
      empId: 'VTS2025145',
      name: 'Chilaka Narendra',
      emailId: 'narendraboby9390@gmail.com',
      start: '2024-07-19',
      task: 'Car Pool',
      progress: 50,
      picture: 'Narendra.jpg',
    },
    {
      id: 5,
      empId: 'VTS2025049',
      name: 'Dharama Teja',
      emailId: 'dharmatejamurala@gmail.com',
      start: '2024-07-19',
      task: 'Photography Website',
      progress: 60,
      picture: 'teja.jpg',
    },
    {
      id: 6,
      empId: 'VTS2025047',
      name: 'Satti Satya',
      emailId: 'ssnarayanareddy1126@gmail.com',
      start: '2024-07-19',
      task: 'Ecommers website',
      progress: 50,
      picture: 'satya.jpg',
    },
    {
      id: 7,
      empId: 'VTS2025151',
      name: 'Boyanapalli Kalyani',
      emailId: 'kalyaniboyanapalli14@gmail.com',
      start: '2024-07-19',
      task: 'Treasure hunt game',
      progress: 60,
      picture: 'kalyani.jpg',
    },
    {
      id: 8,
      empId: 'VTS2025147',
      name: 'Dhulipalla Aaradhya',
      emailId: 'aradhya2369@gmail.com',
      start: '2024-07-19',
      task: 'Home services',
      progress: 50,
      picture: 'aaradhya.jpg',
    },
    
  ]);

  const [show, setShow] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [newProject, setNewProject] = useState({
    id: projects.length + 1,
    empId: '',
    name: '',
    emailId: '',
    start: '',
    task: '',
    progress: 0,
    picture: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = (project) => {
    setCurrentProject(project);
    setShow(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleEditSave = () => {
    if (validateProject(currentProject)) {
      setProjects(projects.map((project) =>
        project.id === currentProject.id ? currentProject : project
      ));
      handleClose();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleNewProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleNewProjectSubmit = () => {
    if (validateProject(newProject)) {
      setProjects([...projects, newProject]);
      setNewProject({
        id: projects.length + 1,
        empId: '',
        name: '',
        emailId: '',
        start: '',
        task: '',
        progress: 0,
        picture: '',
      });
    }
  };

  const validateProject = (project) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const empIdRegex = /^VTS\d{7}$/;
    const errors = [];

    if (!empIdRegex.test(project.empId)) errors.push('Invalid EMP-Id. It should be in format VTS followed by 7 digits.');
    if (project.name.trim() === '') errors.push('Name cannot be empty.');
    if (!emailRegex.test(project.emailId)) errors.push('Invalid Email-Id.');
    if (project.start.trim() === '') errors.push('Start date cannot be empty.');
    if (project.task.trim() === '') errors.push('Task cannot be empty.');
    if (project.progress < 0 || project.progress > 100) errors.push('Progress should be between 0 and 100.');
    if (project.picture.trim() === '') errors.push('Picture URL cannot be empty.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }

    return true;
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(projects, {
      header: ["id", "empId", "name", "emailId", "start", "task", "progress", "picture"],
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(file, 'projects.xlsx');
  };

  return (
    <div className="container mt-5">
      <h2>
        <img src="/vts.jpg" alt="vts.jpg" style={{ height: '2.0em', verticalAlign: 'middle', marginRight: '8px' }} />
        Employee Data Management Table Of VTS
      </h2>

      {/* Export to Excel Button */}
      <div className="export-button-container">
        <Button className="export-button" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>

      {/* Form to add new project */}
      <div className="row">
        <Form className="form-inline">
          <Form.Control 
            type="text" 
            name="empId" 
            value={newProject.empId} 
            onChange={handleNewProjectChange} 
            placeholder="EMP-Id" 
          />
          <Form.Control 
            type="text" 
            name="name" 
            value={newProject.name} 
            onChange={handleNewProjectChange} 
            placeholder="Name" 
          />
          <Form.Control 
            type="email" 
            name="emailId" 
            value={newProject.emailId} 
            onChange={handleNewProjectChange} 
            placeholder="Email-Id" 
          />
          <Form.Control 
            type="date" 
            name="start" 
            value={newProject.start} 
            onChange={handleNewProjectChange} 
          />
          <Form.Control 
            type="text" 
            name="task" 
            value={newProject.task} 
            onChange={handleNewProjectChange} 
            placeholder="Task" 
          />
          <Form.Control 
            type="number" 
            name="progress" 
            value={newProject.progress} 
            onChange={handleNewProjectChange} 
            placeholder="Progress" 
            min="0" 
            max="100" 
          />
          <Form.Control 
            type="text" 
            name="picture" 
            value={newProject.picture} 
            onChange={handleNewProjectChange} 
            placeholder="Picture URL" 
          />
          <Button onClick={handleNewProjectSubmit}>Enter</Button>
        </Form>
      </div>

      {/* Data Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>EMP-Id</th>
            <th>Name</th>
            <th>Email-Id</th>
            <th>Start</th>
            <th>Task</th>
            <th>Progress</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.empId}</td>
              <td>{project.name}</td>
              <td>{project.emailId}</td>
              <td>{project.start}</td>
              <td>{project.task}</td>
              <td>
                <ProgressBar now={project.progress} label={`${project.progress}%`} />
              </td>
              <td>
                <img src={project.picture} alt="team" className="rounded-circle" width="30" />
              </td>
              <td>
                <Button className="btn btn-primary mr-2" onClick={() => handleShow(project)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button className="btn btn-danger" onClick={() => handleDelete(project.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      {currentProject && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Row</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmpId">
                <Form.Control 
                  type="text" 
                  name="empId" 
                  value={currentProject.empId} 
                  onChange={handleEditChange} 
                  disabled 
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={currentProject.name} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
              <Form.Group controlId="formEmailId">
                <Form.Control 
                  type="email" 
                  name="emailId" 
                  value={currentProject.emailId} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
              <Form.Group controlId="formStart">
                <Form.Control 
                  type="text" 
                  name="start" 
                  value={currentProject.start} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
              <Form.Group controlId="formTask">
                <Form.Control 
                  type="text" 
                  name="task" 
                  value={currentProject.task} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
              <Form.Group controlId="formProgress">
                <Form.Control 
                  type="number" 
                  name="progress" 
                  value={currentProject.progress} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
              <Form.Group controlId="formPicture">
                <Form.Control 
                  type="text" 
                  name="picture" 
                  value={currentProject.picture} 
                  onChange={handleEditChange} 
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default App;
