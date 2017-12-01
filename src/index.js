document.addEventListener('DOMContentLoaded', function() {
  const imageId = 6 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const dataFetch = fetch(imageURL).then(res=> res.json()).then(json => newImage(json))

})


function newImage(json){
  header = document.getElementById("name")
  image.src = json.url
  header.innerText = json.name
  likes.innerText = json.like_count
  like_button.addEventListener("click",(event)=>{
  likes.innerText = parseInt(likes.innerText) + 1;
  // debugger;
  fetch("https://randopic.herokuapp.com/likes",{method: "POST",
      header: {"Content-Type": "application/json"},
      body: JSON.stringify({image_id: json.id})}).then(res=> res.json()).then(console.log)
  })
  comments.innerHTML = ""
    json.comments.forEach((comment)=>{
      listElement = `
      <li id="imageComments-${comment.id}">${comment.content}</li>`
      comments.innerHTML += listElement
    })
}
