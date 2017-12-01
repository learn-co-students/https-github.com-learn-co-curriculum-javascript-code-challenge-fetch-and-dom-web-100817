class Image {
  function getImage() {
    fetch(`https://randopic.herokuapp.com/images/11`).then(res => res.json()).then(json => document.getElementById('img').src = json.url())
  }

  function likeMe() {
    let likes = 0
    document.getElementById('likes').innerHTML = (likes ++);
  }
}
