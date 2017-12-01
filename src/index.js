document.addEventListener('DOMContentLoaded', function() {
  const imageId = 7 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch('https://randopic.herokuapp.com/images/7').then(req=>req.json()).then(json=>populateIndex(json))

  let randopic = document.getElementById('image')
  let picTitle = document.getElementById('name')
  let likeCount = document.getElementById('likes')
  let commentList = document.getElementById('comments')
  let commentForm = document.getElementById('comment_form')
  let commentInput = document.getElementById('comment_input')
  let likeButton = document.getElementById('like_button')
  let deleteButton = document.createElement("button")
  deleteButton.innerText='Remove'


  const populateIndex = (json) => {
    randopic.setAttribute('src', json['url'])
    picTitle.innerText = json['name']
    likeCount.innerText = json['like_count']
    json['comments'].forEach( comment =>{
      let commentLi = document.createElement('li')
      commentLi.innerText = comment['content']
      commentList.appendChild(commentLi)
    })
  }

  likeButton.addEventListener('click', function(){
    likeCount.innerText = parseInt(likeCount.innerText) + 1
    let object = {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 7, like_count:likeCount.innerText})
    }
    fetch(likeURL, object).then((res) => res.json()).then(console.log)
  })

  commentForm.addEventListener('submit', function(){
    event.preventDefault()
    let commentLi = document.createElement('li')
    commentLi.innerText = commentInput.value
    commentInput.value = ""
    commentList.appendChild(commentLi)
    commentLi.appendChild(deleteButton, "Remove")
    let object = {
      method : "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 7, content: commentLi.innerText})
    }
    fetch(commentsURL, object).then((res) => res.json()).then(console.log)
  })

  deleteButton.addEventListener('click', function(){
    event.target.parentElement.remove()
    location.reload()
  })

})
