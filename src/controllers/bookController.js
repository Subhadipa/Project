const bookModel = require("../models/bookModel");
const validation = require("../validation/validation");
const redis = require("redis");
const { promisify } = require("util");



//Connect to redis
const redisClient = redis.createClient
(
    16386,
    "redis-16386.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
  redisClient.auth("B3F19MMVhCYyVFD7xGAxfuFtXWUcTb8g", function (err) 
  {
    if (err) throw err;
  });
  
  redisClient.on("connect", async function () 
  {
    console.log("Connected to Redis..");
  });
const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
//------------------------1.Create Book---------------------------------------------------------

const createBook = async function (req, res) 
{   
    try 
    {
         userData=req.body
      if (!validation.isValidReqBody(userData)) 
        {    
           
            return res.status(400).send({ status: false, message: "Body data is missing" });
        }

        if (!validation.isValid(req.body.name)) 
        {  
            return res.status(400).send({ status: false, message: "Please provide  name" })
        }
        if (!validation.isValid(req.body.author)) 
        {  
            return res.status(400).send({ status: false, message: "Please provide author" })
        }
        if (!validation.isValid(req.body.category)) 
        {  
            return res.status(400).send({ status: false, message: "Please provide category" })
        }
        const Userdetails = await bookModel.create(userData);
        res.status(201).json({ status: true, msg: "New Book Created", data: Userdetails })
        }
    catch (error) 
    {

        return res.status(500).send({ status: false, message: error.message })
    }
 
}



//----------------------------------------2.Get Book---------------------------------------------------------------
const  getBook = async function (req, res) 
{
    try
    {
        const bookId = req.params.bookId;
        //console.log(urlCode)
        let cahcedBookData = await GET_ASYNC(`${req.params.bookId}`)
     
        if(cahcedBookData) 
        {
            let cahcedBookData1=JSON.parse(cahcedBookData)
            //if(res==4)
            //{
            return res.status(200).send({ status: true, msg: "Data from cache",data:cahcedBookData1})
            //}
          
        }
         else
        {
         let bookDetails = await bookModel.findOne({_id:req.params.bookId});
      
             if (!bookDetails) 
             {
                 return res.status(400).send({ status: false, message: "Book Not Found!!" })
             }
             else
             {
                await SET_ASYNC(`${req.params.bookId}`,JSON.stringify(bookDetails))//redis take argument as string
               
                return res.status(200).send({ status: true, msg: "Data from db",data:bookDetails})
             }
         }
    }
    catch (error) 
    {
        res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createBook, getBook }
