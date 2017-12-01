document.addEventListener('DOMContentLoaded', function() {
  const imageId =  `18`
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

//fetch image
function getImage(){
  fetch(imageURL)
      .then(res => res.json())
      .then(image => displayImage(image))
      //need to replace console.log
  }

  getImage()

  //display image --failed moving on
  function displayImage(image){
    console.log(image.url)
    document.getElementById('image').src = image.url
  }


  //add eventlistener to likes button

  let likes = document.getElementById('likes')
  let like_count = parseInt(document.getElementById('likes').innerText)

  //increment num of likes
  let button = document.getElementById("like_button")
    button.addEventListener('click', function(){
      alert('liked!')
      likes.innerText = like_count+=1
      console.log(like_count)
    })

  //post likes to back end ---FAILED
    // fetch(likeURL)
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({image_id: image.id})
    //   .then(res => res.json())
    //   .then(console.log)


      //SAMPLE EVENT LISTENER
      //   document.getElementById("myBtn").addEventListener("click", function(){
      //     document.getElementById("demo").innerHTML = "Hello World";
      // });

//add eventlistener to comments

let comments = document.getElementById('comment_form')
let comment_submit = document.querySelector("input[type='submit']")

  comment_submit.addEventListener('click', function(){
    alert('submitted!')
    let input = document.getElementById('comment_input').value
    console.log(input)
  })


})
