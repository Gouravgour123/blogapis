const { blogmodel } = require("../Models/blogModel")
const path = require("path");

const CreateBlog = async (req, res) => {
    const { bid, title, description, likes, blogpic, userId, category } = req.body
  
    console.log(req.body)
    try {
      let blog = new blogmodel({
        ...req.body,
        bid: bid,
        title: title,
        description: description,
        category: category,
        likes: likes,
        blogpic:"http://localhost:5000/uploads/"+req.file.filename, 
        userId: userId
      })
      await blog.save()
      res.status(200).send({ succes: true, message: "blog added", data: blog })
    } catch (error) {
      res.status(500).send({ succes: false, message: error.message })
    }
  }

  const updateBlog = async (req, res) => {
    const { title, description, likes, blogpic, userId, category } = req.body
    // console.log(req.body)
    const blog = await blogmodel.findById({bid:req.params.bid})
    if(!blog){res.status(400).send({succes:false,message:"blog not found"})}
      const newBlog = await blogmodel.updateMany({bid:bid},{$set:{description:description,category:category}})
      res.status(200).send({ succes: true, message: "blog updated", data: newBlog })
    }
  


  const deleteBlog = async (req, res) => {
    const { bid } = req.body
    // console.log(bid)
    const blog = await blogmodel.findById(req.params.id);
    if (!blog) {return res.status(400).send({ success: false, message: 'blog dosent exist' })};
    await blogmodel.deleteOne({ bid: bid })
      res.status(200).send({ succes: true, message: "blog deleted", data: blog })
  }


  const allblog = async (req,res)=>{

    const allblog = await blogmodel.find()
    if (allblog.length == 0) {return res.status(404).send({ success: false, message: "no blog found" })}
    res.status(200).send({success: true, message: "all blog", total_blog: allblog.length, data: allblog})

  }
  const singleblog = async (req,res)=>{

  }

  // const search = async (req,res)=>{
  //   console.log(req.params.key)
  //   const data = await blogmodel.find({"$or":[
  //  {bid:{$regex:req.params.key}},   
  //  {title:{$regex:req.params.key}}, 
  //  {description:{$regex:req.params.key}}, 
  //  {category:{$regex:req.params.key}}, 
     

  //   ]
  // })
  // res.send(data)
  // }


  
  const search = async(req,res)=>{
    let obj = {}
    try{

    //  let {companyName,location,city,founded}= req.query;
     let {bid,title,description,category}= req.params;
     console.log(req.params)
     if(bid){
       obj.bid = bid
      }
     else if(title){
        obj.title = title
      }
     else if(description){
        obj.description = description
      }
      else if(category){
        obj.category = category
      }
      
    let blog = await blogmodel.find(obj)
     if(blog.length==0){res.status(404).send({success:false,message:"No blog found"})}
     res.status(200).send({success:true,message:"All result",Total:blog.length,data:blog})
    }
    catch{

      res.status(500).send({success:false,message:"Server Crashed"})
    }
  }

  const likes = async (req,res)=>{
    try {
        const post = await blogmodel.findById(req.params.id)
        console.log(post)
       if(!post.likes.includes(req.body.userId)){
           await blogmodel.updateOne({$push:{likes:req.body.userId}});
           res.status(200).send("the post has been liked")
       }
       else{
           await blogmodel.updateOne({$pull:{likes:req.body.userId}});
           res.status(200).send("the post has been dislike")
       }
    } catch (error) {
       res.status(500).send(error);
    }
   }
   

module.exports ={CreateBlog,updateBlog,deleteBlog,allblog,singleblog,search,likes}