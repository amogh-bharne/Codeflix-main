import React from 'react'
// import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import copy from '../assets/copy.png'
import {useProjectsContext} from '../hooks/useProjectsContext';
// date-fns is used to format the date we receive from MongoDB
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ProjectDetails({project}) {
  let text = project.file
  const { dispatch } = useProjectsContext();
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate('/workspace', {state: project})
  }
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/api/projects/${project._id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    const data = await response.json()
    if (response.ok) {
        dispatch({type: 'DELETE_PROJECT', payload: data})
        // window.location.reload(false);
    }
  }
  return (
    <div className="card text-white bg-dark border-warning m-3 col-8 shadow rounded" style={{maxWidth: "20rem"}}>
        <div className="card-header bg-warning text-dark fs-5 g-0 row">
        <div className="col-8 m-2">{project.title}</div>
        <button type="button" className="btn col-2 ml-3" onClick={copyContent}>
          <img src={copy} alt="copy" style={{height:"30px",width:"30px"}} />
        </button>
        </div>
        <div className="card-body">
            {/* <h5 className="card-title" id={project._id}>{project.file}</h5> */}
            <p className="card-text">Language: {project.language}</p>
            <p className="card-text mb-2" style={{height:'5rem'}}>Description: {project.description}</p>
            <p className="card-text">Additional Files: {project.addFile}</p>
            <p className="card-text mb-3">Created: {formatDistanceToNow(new Date(project.createdAt),{addSuffix: true})}</p>
            {/* <div className="d-grid gap-2 d-block  mt-2">
                <input type="button" value="Edit" onClick={()=> {handleEdit()}} className="btn btn-outline-warning btn-lg align-self-center" />
            </div>   */}
            <div className="row justify-content-center">
            <button className='btn btn-outline-warning btn-sm col-4 m-2' onClick={()=> {handleEdit()}} >
              <span className='material-symbols-outlined'>Edit</span>
            </button>
            <button className='btn btn-outline-danger btn-sm col-4 m-2' onClick={handleDelete} >
              <span className='material-symbols-outlined'>delete</span>
            </button>
            </div>
        </div>
        
    </div>
  )
}