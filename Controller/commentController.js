const { blogmodel } = require("../Models/blogModel");

const commentController = async (req, res) => {
    const { user, text } = req.body;
    const blogId = req.params.id; 
    try {
        const updatedBlog = await blogmodel.findByIdAndUpdate(blogId,{ $push: { comments: { user, text } } },{ new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.send(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// const commentController = async (req, res) => {
//     const blogId = req.params.id;
//     const { user, text } = req.body;
  
//     try {
//       const updatedBlog = await blogModal.findByIdAndUpdate(blogId, { $push: { comments: { user, text } } }, { new: true })
//       res.json(updatedBlog);
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   }
  const updateCommment = async (req, res) => {
    try {
  
      const blogId = req.params.BlogId;
      const comentId = req.params.comentId.toString()
      // console.log(comentId)
      let newText = "data is unset"
      let blog = await blogmodel.findOneAndUpdate({ _id: blogId, 'comments._id': comentId, }, { $set: { 'comments.$.text': newText } }, { new: true })
      // console.log(update:${blog})
      res.status(200).send(blog)
  
    } catch (error) {
      res.status(500).send({ succes: false, message: error.message })
  
    }
  }
  const deleteComment = async (req, res) => {
    try {
      const blogId = req.params.BlogId;
      const commentId = req.params.comentId
      const updatedBlog = await blogmodel.updateOne({ blogId, 'comments._id': commentId },{ $pull: { comments: { _id: commentId } } })
      res.status(200).send(updatedBlog)
    } catch (error) {
      res.status(500).send({ succes: false, message: error.message })
    }
  }

module.exports = { commentController,updateCommment,deleteComment };