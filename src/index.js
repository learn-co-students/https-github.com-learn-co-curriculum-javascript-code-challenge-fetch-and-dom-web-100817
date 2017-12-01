document.addEventListener('DOMContentLoaded', function() {
  const imageId = 22 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const deleteURL = `https://randopic.herokuapp.com/comments/` //+comment_id
  const img = document.getElementById('image');
  const likes = document.getElementById('likes');
  const commentsUl = document.getElementById('comments');
  const likeButton = document.getElementById('like_button');
  const commentSubmit = document.querySelector('input[type=submit]');
  const commentInput = document.getElementById('comment_input');

 //fetching image and adding image
  function getImage() {
    fetch(imageURL)
      .then(res => res.json())
      .then(json => showImage(json))
  }

  function showImage(json) {
    img.src = json.url;
    likes.innerText = json.like_count;
    //take the array of comments and add each to the DOM
    json.comments.forEach(comment => {
      let newLi = document.createElement('li');
      newLi.id = `comment-li-${comment.id}`
      newLi.innerText = comment.content;
      newLi.innerHTML += `<br><button id="comment-${comment.id}" class="btn btn-danger btn-sm">Delete</button>`
      commentsUl.append(newLi);
      //add event listener for each delete button
      document.getElementById(`comment-${comment.id}`).addEventListener('click', function(event) {
        newLi.remove();
        //post a delete request
        fetch(deleteURL + comment.id, {
          method: 'delete'
        })
      })

    })
  }

  //liking an image
  likeButton.addEventListener('click', function(event) {
    //updating the DOM to reflect a new like
    likes.innerText = (parseInt(likes.innerText)+1)
    //posting the like to our database
    fetch(likeURL, {
      method: 'post',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId})
    })

  })

  //posting a new comment
  commentSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    //get the value
    let newCommentText = commentInput.value;
    //post the comment to the database
    fetch(commentsURL, {
      method: 'post',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id: imageId, content: newCommentText})
    })
    .then(res => res.json())
    .then(json => {
      //add it to our page with the returned info, so we have an id
      let newLi = document.createElement('li');
      newLi.innerText = json.content;
      newLi.innerHTML += `<br><button id="comment-${json.id}" class="btn btn-danger btn-sm">Delete</button>`
      commentsUl.append(newLi);
      //add event listener for new delete button
      document.getElementById(`comment-${json.id}`).addEventListener('click', function(event) {
        newLi.remove();
        //post a delete request
        fetch(deleteURL + json.id, {
          method: 'delete'
        })
      })
    })
    //set it back so it mocks a refresh
    commentInput.value = ""
  })

  //calling this so it runs upon load
  getImage();

})
