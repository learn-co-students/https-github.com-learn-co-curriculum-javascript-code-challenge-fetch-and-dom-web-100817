let placeToAppend = document.getElementById("image")
let image = document.getElementById("image_content")
let LikeButton = document.getElementById("like_button")
const imageId = 5 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
let likes =  document.getElementById("likes")
let submitButton = document.querySelector("submit")
let commentForm = document.getElementById("comment_form")
document.addEventListener('DOMContentLoaded', function() {

  fetch('https://randopic.herokuapp.com/images/5').then(res => res.json()).then(pics => addPics(pics))


  function addPics(pics) {
    let z = document.createElement('IMG')
    placeToAppend.src = pics.url

    let comments = pics.comments[0].content
    image.append(comments)
    likePic(pics)
    commentFeature()

  }

  function likePic(pics) {
    LikeButton.addEventListener("click", function(event) {
      likes.innerText +=1
    })
  }

  function persistLikes(pics) {
    fetch(imageURL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({like_count: pics.like_count})
    }).then(res => res.json()).then(res => console.log(res))
  }

  function commentFeature(pics) {
    let li = document.createElement('li')
    let commentBox = document.getElementById("comment_input")
    let comments = document.getElementById("comments")
    let commentText = commentBox.innerText
    submitButton.addEventListener('click', function(event) {
      comments.append(li)
      li.append(commentText)
    })
  }

  function persistComments() {
    etch(commentsURL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comments:})
    }).then(res => res.json()).then(res => console.log(res))
  }

})

// the image url
// the image name
// the number of likes
// any comments in an unordered list
