document.addEventListener('DOMContentLoaded', function() {
  const imageId = 13 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageElement = document.querySelector("#image")
  const likesCount = document.querySelector("#likes")
  const imageName = document.querySelector("#name")
  const commentList = document.querySelector("#comments")
  const likeButton = document.querySelector("#like_button")
  const commentForm = document.querySelector("#comment_form")
  const commentInput = document.querySelector("#comment_input")
  let commentId = 0

  fetch(imageURL).then(res => res.json()).then(json => populateImageData(json))

  const populateImageData = (json) => {
    imageElement.src = json.url
    likesCount.innerText = json.like_count
    imageName.innerText = json.name
    parseComments(json.comments)

  }

  const parseComments = (commentArray) => {
    commentArray.forEach(comment => {
      commentList.innerHTML += `<li>${comment.content}</li>`
    })
  }

  likeButton.addEventListener('click', function() {
    likesCount.innerText = parseInt(likesCount.innerText) + 1
    incrementLikesPost()
  })

  const incrementLikesPost = () => {
    fetch('https://randopic.herokuapp.com/likes', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        image_id: 13
      })
    })
  }

  commentForm.addEventListener('submit', function() {
    // ++commentId
    event.preventDefault()
    commentList.innerHTML += `<li id = num${commentId}>${commentInput.value}</li>`
    addCommentPost(commentInput.value)
    // createDeleteButton(commentId)
  })


  //   Delete button was in progress, but not complete.  I know there was a better way to do this ;)
  // const createDeleteButton = (commentId) => {
  //   let newComment = document.querySelector(`#num${commentId}`)
  //   let deleteButton = document.createElement('button')
  //   newComment.appendChild(deleteButton)
  //
  // }

  const addCommentPost = (comment) => {
    fetch('https://randopic.herokuapp.com/comments', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        image_id: 13,
        content: comment
      })
    })
  }



})