document.addEventListener('DOMContentLoaded', function() {
  const imageId = 17
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
    .then(data => data.json())
    .then(image => {
      let imageBox = document.querySelector('#image_card img')
      let namePlace = document.getElementById('name')
      let likesCount = document.getElementById('likes')
      let likes = image.like_count
      let commentBox = document.getElementById('comments')
      let likeButton = document.getElementById('like_button')
      let commentInput = document.getElementById('comment_input')
      let commentForm = document.getElementById('comment_form')
      imageBox.src = image.url
      namePlace.innerText = image.name
      likesCount.innerText = likes
      image.comments.forEach(comment => {
        let newComment = document.createElement('li')
        newComment.innerText = `${comment.content}`
        newComment.id = `comment-${comment.id}`
        commentBox.appendChild(newComment)
      })
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(commentsURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
          body: JSON.stringify({content: commentInput.value, image_id: image.id})
        }).then(comment => {
          let newestComment = document.createElement('li')
          newestComment.innerText = commentInput.value
          commentBox.appendChild(newestComment)
        })
        likeButton.addEventListener('click', (e) => {
          e.preventDefault();
          fetch(likeURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({image_id: image.id})
          }).then(() => { likesCount.innerText = image.like_count += 1})
        })
      })
    })
})
