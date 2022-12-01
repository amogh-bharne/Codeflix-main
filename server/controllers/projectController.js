const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// get all projects
const getAllProjects = async (req,res) => {
    try {
        const projects = await Project.find({}).sort({createdAt: -1});
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// get a single project
const getProject = async (req,res) => {
    // id must be a valid mongo id
    const {id} = req.params;
    // try {
    //     const project = await Project.findById(id);
    //     res.status(200).json(project);
    // } catch (error) {
    //     res.status(404).json({message: error.message});
    // }
    // if id is not a valid mongo id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }

    const project = await Project.findById(id);

    if(!project) {
        return res.status(404).json({error: 'Project not found'});
    }
    return res.status(200).json(project);
}

// post a new project
const createProject = async (req,res) => {
    const {title, language, description, file, addFile} = req.body;

    let emptyFields = [];
    if(!title) {
        emptyFields.push('title');
    }
    if(!language) {
        emptyFields.push('language');
    }
    if(!description) {
        emptyFields.push('description');
    }
    if(!file) {
        emptyFields.push('file');
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields});
    }
    // sending doc to db
    try {
        // using the project model to create a new project
        const project = await Project.create({title, language, description, file, addFile});
        res.status(200).json({project});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a project
const deleteProject = async (req,res) => {
    const {id} = req.params;
    // if id is not a valid mongo id
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: 'Invalid ID'});
    // }
    // delete project
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }
    // const project = await Project.findByIdAndDelete(id);
    const project = await Project.findOneAndDelete({_id: id});

    if(!project) {
        return res.status(400).json({error: 'Project not found'});
    }
    return res.status(200).json({message: 'Project deleted successfully'});
}

// update a project
const updateProject = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'});
    }
    const project = await Project.findOneAndUpdate({_id: id},{...req.body});
    if(!project) {
        return res.status(400).json({error: 'Project not found'});
    }
    return res.status(200).json({message: 'Project updated successfully'});
}

// export controller
module.exports = {
    getAllProjects,
    getProject,
    deleteProject,
    createProject,
    updateProject
}