import React from 'react'
import { useLocation } from 'react-router-dom';
import AceEditor from 'react-ace';
// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
export default function Workspace() {
    const { state } = useLocation();
    const [file, setFile] = React.useState('No file selected');
    React.useEffect(() => {
        if (state) {
            setFile(state.file);
        }
    }, [state]);
    const [error, setError] = React.useState(null);
    const handleEdit = async (e) => {
        e.preventDefault();
        const newFile = {file};
        console.log(newFile);
        const response = await fetch('http://localhost:8000/api/projects/' + state._id , {
            method: 'PATCH',
            body: JSON.stringify(newFile),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            alert('File saved successfully');
            setFile(response.file);
            setError(null);
            console.log("new project created");
            console.table(json);
        }
    }
  return (
    <>
    <h2 className='display-5 typed-cursor text-center m-3'>Editing File</h2>
    <div className="container-md border border-warning mt-3 bg-dark p-3 shadow-lg rounded">
        {
            state ? (
                <>
                <h3 className="text-center text-white">{state.title}</h3>
                <p className="text-white ml-3">File Type: &nbsp; {state.language}</p>
                <div className='container-fluid-md m-3 rounded bg-white align-self-center'>
                    {/* <pre className='view' style={{overflow:"auto",maxHeight:'25rem'}}>{state.file}</pre> */}
                    <AceEditor
                      style={{width:"100%",maxheight:"50rem"}}
                        mode="javascript"
                        theme="monokai"
                        name="editor"
                        fontSize={18}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={file}
                        onChange={setFile}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 4,
                        }} />
                      <div className="d-grid gap-2 d-block mb-4">
                        <input type="submit" value="Save" className="btn btn-warning btn-lg align-self-center" onClick={handleEdit} />
                      </div> 
                </div>
                <p className='text-center text-danger'>{error}</p>
                </>) : 
                    <h3 className="text-center display-6 text-white">No File Selected!</h3>
        }
    </div>
    </>
  )
}
