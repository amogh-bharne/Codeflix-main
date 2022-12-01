const express = require('express');
const Project = require('../models/projectModel');
// express router as we dont have access to app
//const protect = require('../middlewares/authMiddleware');
const router = express.Router();
// importing controller
const {getAllProjects,getProject,deleteProject,createProject,updateProject} = require('../controllers/projectController');

router.get('/hello', (req,res) => {
    res.send('hello');
});

// goes to /api/projects/
// get request handler
// router.get('/',(req,res)=>{
//     res.json({message:'GETS all projects'});
// })
router.get('/',getAllProjects);

// GET a single project
// router.get('/:id',(req,res)=>{
//     res.json({message:'GETS a single project with id: ' + req.params.id});
// });
router.get('/:id',getProject);

// POST request handler
router.post('/',createProject);

// DELETE request handler
// router.delete('/:id',(req,res)=>{
//     res.json({message:'DELETES a project with id: ' + req.params.id});
// });
router.delete('/:id',deleteProject);

// UPDATE request handler
// router.patch('/:id',(req,res)=>{
//     res.json({message:'UPDATES a project with id: ' + req.params.id});
// });
router.patch('/:id',updateProject);

// export router
module.exports = router;