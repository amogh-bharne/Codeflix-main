import React from 'react'

export default function AddFile() {
  return (
    <div>
        {/* <label for="formFileLg" className="form-label text-warning fs-2">Large file input example</label> */}
        <form action="" onSubmit={handleSubmit}>
            <input className="form-control form-control-lg bg-warning" id="formFileLg" type="file" onChange={handleFileChange}  />
            <button className="btn btn-outline-warning">Upload</button>
        </form>
    </div>
  )
}
