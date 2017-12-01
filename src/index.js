document.addEventListener('DOMContentLoaded', function() {
  const imageId = 1 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${43}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  function getInfo() {
    fetch(`${imageURL}`)
    .then(res => res.json())

    .then(imageObj => bigFunc(imageObj.url))

  }

  function bigFunc(imageObj){

    let imageContainer = document.getElementById("image")
    imageContainer.setAttribute('src', `${imageObj}`);
    let imageCard = document.getElementById("image_card")

    imageCard.appendChild(imageContainer)
      let newCom = document.getElementById('comment_form')
      let input = newCom.value
      let newLi = document.createElement('li')
      newLi.innerHTML = input

      let list = document.getElementById('comments')
      list.appendChild(newLi)


      }


      getInfo()
    })
