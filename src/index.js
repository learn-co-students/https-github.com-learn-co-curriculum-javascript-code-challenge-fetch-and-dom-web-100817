document.addEventListener('DOMContentLoaded', function() {
  const imageId = 14 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTag = document.getElementById('image')
  const likesTag = document.getElementById('likes')
  const commentsUl = document.getElementById('comments')

  const getImageContent = () => (
    fetch(imageURL)
    .then(res => res.json())
    .then(imageObj => displayImage(imageObj))
  )

  const addDeleteButton = (comment, element) => {
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'

    deleteButton.addEventListener('click', (event) => {
      event.preventDefault()
      fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {method: "DELETE"})
      element.remove()
    })

    element.innerHTML += "  "
    element.append(deleteButton)
  }


  const displayImage = (imageObj) => {
    imgTag.src = imageObj.url
    likesTag.innerHTML = imageObj.like_count
    imageObj.comments.forEach( com => {
      let newLi = document.createElement('li')
      newLi.innerHTML = com.content
      commentsUl.append(newLi)
      addDeleteButton(com,newLi)

    })
  }

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', (event) => {
    likesTag.innerHTML = parseInt(likesTag.innerHTML) + 1

    fetch(likeURL, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({'image_id': imageId})
    })
  })

  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const commentInput = document.getElementById('comment_input')
    const newLi = document.createElement('li')

    newLi.innerHTML = commentInput.value
    commentsUl.append(newLi)

    fetch(commentsURL, {
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      method: "POST",
      body: JSON.stringify({'image_id': imageId, 'content': commentInput.value})
    }).then(res => res.json())
      .then(obj => addDeleteButton(obj, newLi))

    commentInput.value = ""
  })

  getImageContent()

})
