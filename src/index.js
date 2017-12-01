document.addEventListener('DOMContentLoaded', function() {
  const imageId = 10
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getImage() {
    fetch("https://randopic.herokuapp.com/images/10")
      .then(res => res.json())
      .then(obj => showAll(obj))
  }

  function showAll(obj){
    //divs
    let picture = document.getElementById('image')
    let name = document.getElementById('name')
    let likes = document.getElementById('likes')
    let comments = document.getElementById('comments')
    //comment comment input
    let userInput = document.getElementById('comment_input')
    //button
    let likeButton = document.getElementById('like_button')
    let commentButton = document.getElementById('comment_button')

    //update page with fetched data
    picture.src = obj.url
    name.innerText = obj.name
    likes.innerText = obj.like_count

    //display all fetched comments
    obj.comments.forEach(c => {
      let oldContent = document.createElement('p')
      oldContent.innerText = c.content
      comments.appendChild(oldContent)
    })

    //listen to like button, add likes front and back end
    likeButton.addEventListener('click', () => {
      let newLikeVal = parseInt(likes.innerText) + 1
      likes.innerText = newLikeVal

      fetch('https://randopic.herokuapp.com/likes', {
        method: "POST",
        headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({image_id: 10})
      })
        .then(res => res.json())
    })
    // listen to comment button, add likes front and back
    //won't stop refreshing. WHY YOU DO DIS MAX!!!!!
    commentButton.addEventListener('submit', (event) => {
      event.preventDefault()
      let contentToInsert = userInput.value
      let newContent = document.createElement('p')
      newContent.innerText = contentToInsert
      comments.appendChild(newContent)
    })

  }

  getImage()
})
//Content-Type: application/json
