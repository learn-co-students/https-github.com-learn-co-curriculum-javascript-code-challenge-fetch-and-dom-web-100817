document.addEventListener('DOMContentLoaded', function() {
  const imageId = 16 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  addContent();

  // Event Handlers
  const likeButtonTag = document.getElementById("like_button");
  const likeHandler = likeButtonTag.addEventListener("click", addLike);

  const commentFormTag = document.getElementById("comment_form");
  const commentHandler = commentFormTag.addEventListener("submit", addNewComment);

  function addContent() {
    fetch(imageURL)
      .then(response => response.json())
      .then(json => {
        const imageTag = document.getElementById("image");
        imageTag.src = json["url"];

        const imageNameTag = document.getElementById("name");
        imageNameTag.innerText = json["name"]

        const numberOfLikesTag = document.getElementById("likes");
        numberOfLikesTag.innerText = json["like_count"];

        addComments(json["comments"]);
      });
  }

  function addComments(comments) {
    const commentTag = document.getElementById("comments");
    const commentsArray = comments.map(comment => comment["content"]);
    const commentListForHTML = "<ul><li>" + commentsArray.join("</li><li>") + "</li></ul>";
    commentTag.innerHTML = commentListForHTML;
  }

  function addLike() {
    addLikeFrontend();
    addLikeBackend();

    function addLikeFrontend() {
      const likesTag = document.getElementById("likes");
      likesTag.innerText = parseInt(likesTag.innerText) + 1
    }

    function addLikeBackend() {
      const likesTag = document.getElementById("likes");
      fetch(likeURL, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: imageId})
      });
    }

  }

  function addNewComment() {

    const comment = document.getElementById("comment_input").value;

    addNewCommentFrontend(comment);
    addNewCommentBackend(comment);

    function addNewCommentFrontend(comment) {
      const commentsTag = document.getElementById("comments");
      //create element and append to list
    }

    function addNewCommentBackend(comment) {
      // make a post request to the backend
    }
  }

});
