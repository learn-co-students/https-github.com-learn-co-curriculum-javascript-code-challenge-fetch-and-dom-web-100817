document.addEventListener('DOMContentLoaded', function() {
  const imageId = 12 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function getData(){
    fetch(imageURL).then(res => res.json()).then(json => displayData(json))
  }

  function displayData(json){
    let imageContainer = document.getElementById('image')
    let likes = document.getElementById('likes')
    let comments = document.getElementById('comments')

    likes.innerText = ''
    comments.innerHTML = ""

    imageContainer.src = json.url
    likes.innerText = json.like_count

    json.comments.forEach(comment => {
      let newLi = document.createElement('li')
      newLi.innerText = comment.content
      let button = document.createElement('button')
      button.style = "margin-left:10px"
      button.innerText = "Delete"
      // button.addEventListener('click', function(){
      //   fetch(commentsURL+)
      // })
      newLi.append(button)
      comments.append(newLi)
    })

    const likeButton = document.getElementById('like_button')

    likeButton.addEventListener('click', function(){
      let obj = {
        method:'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: imageId})
      }
      fetch(likeURL, obj)
    })
  }

  const form = document.getElementById('comment_form')

  form.addEventListener('submit', function(){
    let comment = document.getElementById('comment_input').value
    let obj = {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: comment})
    }
    fetch(commentsURL, obj)
    })

  getData()

})
