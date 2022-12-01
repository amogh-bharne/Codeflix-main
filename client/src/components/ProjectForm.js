import { useState } from "react"

const ProjectForm = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [language, setLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [addFile, setAddFile] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = {title, file, language, description, addFile};
        console.log(newProject);
        const response = await fetch('http://localhost:8000/api/projects', {
            method: 'POST',
            body: JSON.stringify(newProject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setTitle('');
            setFile('');
            setLanguage('');
            setDescription('');
            setAddFile('');
            setError(null);
            console.log("new project created");
            console.table(json);

        }
    }
    return (
        <div className="conatiner-fluid-md border border-warning bg-dark text-white p-3 m-3 shadow-lg rounded">
            {/* <h2 className="text-center typed-cursor">Add a Project</h2> */}
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <span className="input-group-text bg-warning" id="basic-addon1" style={{width:"7rem"}} >Title</span>
                <input type="text" className="form-control text-input" placeholder="Project Title" aria-label="Title of the Project" aria-describedby="basic-addon1" 
                    onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text bg-warning" id="basic-addon2" style={{width:"7rem"}} >Language</span>
                <input type="text" className="form-control text-input" placeholder="Project Language" aria-label="Language of the Project" aria-describedby="basic-addon2" 
                    onChange={(e) => setLanguage(e.target.value)} value={language} />
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text bg-warning" style={{width:"8rem"}}>Description</span>
                <textarea className="form-control" aria-label="With textarea" placeholder="Add Project Description" 
                    onChange={(e) => setDescription(e.target.value)} value={description} ></textarea>
                </div>
                <div className="input-group mb-3">
                <span className="input-group-text bg-warning" style={{width:"8rem"}}>Code</span>
                <textarea className="form-control" aria-label="With textarea" placeholder="Add Project Code"
                  onChange={(e) => setFile(e.target.value)} value={file} style={{height:"10rem"}} ></textarea>
                </div>
                {/* <button type="submit" class="btn btn-outline-warning align-self-center">Add Project</button> */}
                <div className="d-grid gap-2 d-block mb-4">
                    <button class="btn btn-outline-warning btn-lg" type="submit">
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    &nbsp;  Add Project
                    </button>
                </div>
            </form>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                    <div className="mb-3">
                        <label for="file" className="form-label mt-3 fs-4">Upload Additional File</label>
                        <input className="form-control" name="file" type="file" id="formFile" 
                         onChange={(e) => setAddFile(e.target.files[0].name)}  />
                      </div>   
                      <div className="d-grid gap-2 d-block mb-4">
                        <input type="submit" value="Upload" className="btn btn-outline-warning btn-lg align-self-center" />
                      </div>                   
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    ) 
}
 export default ProjectForm;