document.addEventListener('DOMContentLoaded', function() {
  const imageId = 4 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL).then(img => img.json()).then(json => showImage([json]))

  const showImage = (json) => {
    json.forEach(img => {
      //debugger;
      let imagePlace = document.querySelector('#image')
      imagePlace.src = img.url
    })

  }

  const likeButton = document.querySelector('#like_button').addEventListener('click', event =>{
    event.preventDefault();
    let like = document.querySelector('#likes')
    let likes = like.innerHTML++

    fetch(likeURL, {method: "post", headers: {'Accept': 'application/json',
    'Content-Type': 'application/json'}, body: {image_id: imageId}})
    .then(res => res.json())
    .then(json =>{})
    })

  //   function addLike(likes){
  //     fetch(likeURL, {method: "post", headers: {'Accept': 'application/json',
  // 'Content-Type': 'application/json'}, body: {id: likes, image_id: imageId}}).then(res => res.json()).then(json =>{
  //   debugger;
  // })
  //   }

    const commentForm = document.querySelector('#comment_form').addEventListener('submit',event => {
      event.preventDefault()
      let comment = document.querySelector('#comment_input').value
      fetch(commentsURL, {method: "POST",
       headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
       body: {content: comment, image_id: imageId}})
      .then(res => res.json()).then(json => showComments([json]))
    })

    const showComments = (json) => {
      let commentPlace = document.querySelector('#comments')

      json.forEach(comment => {
        let item = document.createElement('li')
        item.innerHTML = comment
        commentPlace.appendChild(item)
      })
    }
})
