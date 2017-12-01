
document.addEventListener('DOMContentLoaded', function() {
  const imageId = 2 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getImage() {
    fetch('https://randopic.herokuapp.com/images/2')
    .then(res => res.json())
    .then(image => displayImage(image))
  }
  function displayImage(image) {
    let image1 = document.getElementById('image')
    image1.innerHTML = `<img src='${image.url}'>`
    document.appendChild(image1)
  }

  function getLikes() {
    fetch(likeURL)
      .then(res => res.json())
      .then(image => displayLikes())
  }

  function displayLikes(image) {
    let allLikes = document.getElementById('likes')
    let myLikes = document.createElement('p')

    let myLikes.innerText = image["like_count"]
  }

  function getComments() {
    fetch(commentsURL)
      .then(res => res.json())
      .then(comment => displayComment(comment))
  }


    function displayComments(comment) {
      let allComments = document.getElementById('comments')
      let ul = document.createElement('ul')

      allComments.forEach((comment) => {
        let newLi = document.createElement('li')
        newLi.innterText = comment[0]
        ul.appendChild(newLi)
      })
      allComments.appendChild(ul)
    }

  function displayName(image) {
    let listp = document.getElementById("name")
    let p = document.createElement('p')
    p.innerText = image.name
    listp.appendChild(p)
    }

  function getName(){
    fetch('https://randopic.herokuapp.com/images/2')
    .then(res => res.json())
    .then(name => displayName(name))
  }

  function displayName(name) {
    let namePlace = getElementById('name')
    let h1 = document.createElement('h1')
    h1.innterText = name.name
    namePlace.appendChild(h1)
  }
getName()
})
