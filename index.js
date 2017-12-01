
let image_likes = document.getElementById("likes");






fetch("https://randopic.herokuapp.com/images/3")
.then((res) => res.json())
.then(function(object) {

  console.log(object)
  console.log(object.comments[0])
  image_loc = document.getElementById("image");
  image_loc.src = object.url

  image_name = document.getElementById("name");
  image_name.innerText = `Title: ${object.name}`


  image_likes.innerText = object.like_count

comments_container = document.getElementById("comments");
let newComment = document.createElement("li");
  newComment.innerHTML = object.comments[0].content
  comments_container.appendChild(newComment)

})


let like_button = document.getElementById("like_button");
like_button.addEventListener("click", addLike)



function addLike() {

  oldLikes = parseInt(image_likes.innerText);
  newLikes = oldLikes + 1;

  fetch("https://randopic.herokuapp.com/likes",
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newLikes)
    }).then(function(response) {
        console.log(response.json());
      })

  // })
  // .then(function(res){ console.log(res) })
  // .catch(function(res){ console.log(res) })
  image_likes.innerText = newLikes;
}


let submitCmtBtn = document.getElementById('comment_submit');
submitCmtBtn.addEventListener('click', createCmt);




function createCmt() {
  let comments_container = document.getElementById("comments");
  let inpt = document.getElementById('comment_input').value;
  let addCmt = document.createElement("li");
  addCmt.innerText = inpt
  comments_container.appendChild(addCmt)

  console.log(inpt);

//   fetch('https://randopic.herokuapp.com/comments', {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify(inpt)
//   }).then(function(inpt) {
//       console.log(response.json());
//     })
}


// function submitCmt() {
//
//   console.log(inpt)

  // if (inpt) {
  //   createCmt({
  //     content: `${inpt}`,
  //   })
  //   }
  //  else {
  //   consoles.log('Please enter in content ');
  // }
// }
