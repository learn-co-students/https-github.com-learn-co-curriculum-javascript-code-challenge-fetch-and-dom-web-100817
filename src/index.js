document.addEventListener('DOMContentLoaded', function() {
  const imageId = 15 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

document.addEventListener('DOMContentLoaded', loadImage)
document.getElementById('comment_form').addEventListener('submit', postComment)


const imageUrl = document.getElementById('image')
const imageName = document.getElementById('name')
const imageLikes = document.getElementById('likes')
const likeButton = document.getElementById('like_button')
const commentUl = document.getElementById('comments')

function loadImage() {
  fetch(`https://randopic.herokuapp.com/images/15`)
    .then(res => res.json())
    .then(json => imageDetails([json]))
}

function imageDetails(json) {
  json.forEach(image => {
    imageUrl.appendChild(`<img src=${image.url}></src>`)
    imageName.innerHTML = image.name
    imageLikes.innertext = `${image.like_count}`
  })
}

function getComments() {
  fetch('https://randopic.herokuapp.com/comments/')
    .then(res => res.json())
    .then(json => commentDetails(json))
}

function commentDetails(json) {
  json.forEach(comment => {
    let commentContent = comment.content
    commentUl.appendChild(commentContent)
  })
}

function postComment () {
  commentUl.preventDefault();
  fetch('https://randopic.herokuapp.com/comments/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.simplify(content: document.getElementById('comment_input').value)
  })
    .then(res => res.json())
    .then(json => commentDetails([json]))
}
