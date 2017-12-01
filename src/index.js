document.addEventListener('DOMContentLoaded', function() {
  const imageId = 9 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getImage(){
    fetch(imageURL).
    then(res => res.json()).
    then(image => displayImage(image))
  }

  function displayImage(image){
    let imageContainer = document.getElementById('image-card')
    let newImage = document.getElementById('image')
    let imageName = document.getElementById('name')
    let imageLikes = document.getElementById('likes')

    let commentsContainer = document.getElementById('comments')
    let comments = image.comments

    newImage.id = "image-" + image.id
    newImage.src = image.url
    imageName.innerHTML = image.name
    imageLikes.innerText = image.like_count
    comments.forEach(function(comment){
      let newLi = document.createElement('li')
      newLi.innerText = comment.content
      commentsContainer.appendChild(newLi)
    })
  }

  function addLike(){
    let imageLikes = document.getElementById('likes')
    imageLikes.innerText = imageLikes.innerText + 1
  }

  let likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', addLike())



  getImage()
})
