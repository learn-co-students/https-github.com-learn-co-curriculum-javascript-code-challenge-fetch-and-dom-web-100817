document.addEventListener('DOMContentLoaded', function() {
  const imageId = 1 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getPics(){
    fetch('https://randopic.herokuapp.com/images/1')
    .then(res => res.json())
    .then(pic => displayPic())
  } // I can't get a reponse here, but I know that I want to use this as a callback in a display function
    // function displayPic(pic){
    //   let image = document.getElementById("image") // I am grabbing the element by id where I think it belongs from the HTML file
    //   let newHead = document.createElement("heading")
    //
    //   newHead.innerHTML = `
    //   <h1>${pic.name}</h1>
    //   `
    // }

  let like = document.getElementById("like_button")
  let likes= document.getElementById("likes")
  let likesCount = 0
  like.addEventListener("click", (event) => {
    likesCount+= 1
    likes.innerHTML = `${likesCount}` // I know this isnt much, but honestly I am so happy this at least works right now...
  })

})

let comment = document.getElementById("comment_input")
let comments = document.getElementById("comments")
let submit = document.getElementById("submit_button")

submit.addEventListener("click", (event) => {
  comments.innerHTML= // i know that i need to display the comments, and right now i am showing the object
  `<li>${comment}<li>`
})
