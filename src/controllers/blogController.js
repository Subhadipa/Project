const mongoose = require('mongoose')
const authorModel= require("../models/authorModel")
const blogModel= require("../models/blogModel")

const createBlog = async function (req, res) {
    const Id = req.body.id

    const validId = await authorModel.findById(Id)

    const blogData = req.body;
     
    if (validId){
        const newBlog = await blogModel.create(blogData)
        res.status(201).send({status: true, msg: 'New blog created successfully', data: newBlog})
     }else {
        res.status(400).send({status: false, msg: 'Invalid Request'})
     }    
}

const getBlog=async function(req,res)
{
    const blogData=await blogModel.find({isDeleted:false,isPublished:true})
    if(blogData)
    {
        res.status(200).send({status: true,data: blogData})
    }
    else
    {
        res.status(404).send({status: false,msg:"No documents found!"})
    }  
}
const getFilterBlog=async function(req,res)
{
    const authorId=req.query.authorId
    const category=req.query.category
    const tag=req.query.tag
    const subcategory=req.query.subcategory
    const blogData=await blogModel.find({authorId:authorId,category:category,tag:tag,subcategory:subcategory})
    if(blogData)
    {
        res.status(200).send({status: true,data: blogData})
    }
    else
    {
        res.status(404).send({status: false,msg:"No documents found!"})
    }  
}

module.exports.createBlog= createBlog
module.exports.getBlog=getBlog
module.exports.getFilterBlog=getFilterBlog

