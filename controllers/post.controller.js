const BlogPost = require("../models/post.model");

const createPost = async (req, res) => {
  const postData = {
    username: req.body.username,
    title: req.body.title,
    body: req.body.body,
    like: req.body.like,
    share: req.body.share,
    comment: req.body.comment
  }

  try {

    const createdPost = await BlogPost.create(postData)

    const newPost = {
      username: createdPost.username,
      title: createdPost.title,
      body: createdPost.body,
      securitymoney: createdPost.securitymoney,
      like: createdPost.like,
      share: createdPost.share,
      comment: createdPost.comment
    }


    await createdPost.save()

    res.status(201).send({
      success: true,
      status: 201,
      message: `${createdPost._id}, Added Successfully !`,
      post: newPost,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Internal Server Error , while Adding POST !',
    })
  }
}

const getAllPost  = async (req, res) =>{
    try {
        const post = await BlogPost.find()
        return res.status(201).send({
            success : true,
            status : 201,
            message : `Fetched all the posts successfully !`,
            posts : response.postResponse(post)
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error , while getting all POSTS !"
        })
    }
}

const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    console.log('Post : ', post)
    if (!post) {
      return res.status(403).send({
        success: false,
        message: 'Post does not found',
      })
    }
    if (post.username === req.body.username) {
      console.log('Post UserId : ', post.username)
      await post.deleteOne()
      res.status(201).send({
        success: true,
        status: 201,
        message: `The post has been deleted successfully !`,
      })
    } else {
      console.log('Post UserId : ', 'Error')
      res.status(403).send({
        success: false,
        message: 'You can delete only your posts !',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      message: `Error While deleting the post`,
    })
  }
}



module.exports = { createPost, getAllPost, deletePost }