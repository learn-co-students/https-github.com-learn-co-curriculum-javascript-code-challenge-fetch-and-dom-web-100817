document.addEventListener('DOMContentLoaded', function() {
  const imageId = 19 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const img = new Image(imageURL, likeURL)
  // const cmt = new Comment(img, commentsURL)
})
