const imageId = 21 //Enter your assigned imageId here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const name = document.querySelector('#name')
const image = document.querySelector('#image')
const likes = document.querySelector('#likes')
const comments = document.querySelector('#comments')
const commentForm = document.querySelector('#comment_form')
let currentImageId;

document.addEventListener('DOMContentLoaded', function() {
  fetch(imageURL)
    .then(res => res.json())
    .then(json => {
      currentImageId = json.id
      name.innerHTML = json.name;
      image.src = json.url;
      likes.innerHTML = json.like_count;
      json.comments.forEach(comment => {
        comments.innerHTML += `
        <li id=${comment.id}>
          ${comment.content}
          <input type="checkbox" onchange="deleteComment(this)">
        </li>`
      })
    })  
})
  
const likeButtonClick = e => {
  const numLikes = parseInt(likes.innerHTML)
  likes.innerHTML = numLikes + 1;
  fetch(likeURL, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: currentImageId
    })
  })
}

const deleteComment = target => {
  commentID = target.parentElement.id;
  fetch(`https://randopic.herokuapp.com/comments/${commentID}`, {
    method: 'delete'
  })
  target.parentElement.remove();
}

commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const input = document.querySelector('#comment_input')
  fetch(commentsURL, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: currentImageId,
      content: input.value
    })
  }).then(res => res.json())
  .then(json => {
    comments.innerHTML += `
    <li id=${json.id}>
      ${json.content}
      <input type="checkbox" onchange="deleteComment(this)">
    </li>`
  })
  input.value = null;
})