import {useEffect, useState, useCallback} from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';
import ProjectDetails from '../components/ProjectDetails';
// import ProjectForm from '../components/ProjectForm';

const server = 'http://localhost:8000';
const Home = () => {
    // States initialized to empty array
    // const [projects, setProjects] = useState(null);

    // using global context
    const { projects, dispatch } = useProjectsContext();
    // will only run once when the component is mounted
    const fetchProjects = useCallback(async () => {
        const response = await fetch(`${server}/api/projects`);
        const data = await response.json();
        if (response.ok) {
            // setProjects(data);
            dispatch({type: 'SET_PROJECTS', payload: data})
        }
    }, [dispatch]);
    useEffect(() => {
        // console.log('useEffect ran');
        // async function fetchProjects() {
        //     const response = await fetch(server + '/api/projects',{
        //         method: 'GET',
        //         mode: 'cors',
        //     }).catch((err) => {console.log(err)});
        //     const json = await response.json();
        //     if(response.ok) {
        //         // setProjects(json);
        //         dispatch({type: 'SET_PROJECTS', payload: json});
        //     } 
        //     // console.log(json);
        // }
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
        <div className="container-fluid-md m-3 px-4">
                <h2 className='text-center text-warning'><span className="typed display-6">My Projects</span> <span className="typed-cursor">|</span> </h2>
                <div className="row g-0">
                {projects ? projects.Length===0 ? (<h3 className="text-center text-warning">No Projects</h3>) : projects.map((project) => 
                    (
                            <ProjectDetails key={project._id} project={project} />
                    )) :
                    <div className="d-flex align-items-center text-warning mt-5">
                    <h1 className='mx-auto typed-cursor'>Loading Projects &nbsp;
                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </h1>
                    </div> 
                    }
                </div>
            </div>
        </>
    );
};

export default Home;