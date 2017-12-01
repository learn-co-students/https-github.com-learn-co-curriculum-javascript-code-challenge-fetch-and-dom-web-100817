class Image {
  constructor(url, likeUrl, commentsURL){
    this.url = url;
    // this.likeUrl = likeUrl;
    // const lurl = likeUrl
    this.curl = `https://randopic.herokuapp.com/comments/`;
    this.comments;
    this.src;
    this.id;
    this.name;
    this.likes;
    this.fetchImg();
    this.likeStart();
  }


  fetchImg(){
    fetch(this.url).then(res => res.json()).then(json => this.saveSelf(json))
  }

  saveSelf(json){
    this.name = json.name
    this.likes = json.like_count
    this.id = json.id
    this.src = json.url
    this.comments = json.comments;
    this.addSelf()
    const cmt = new Comment(this, this.curl)
  }

  addSelf(){
    console.log(this);
    let img = document.querySelector('#image');
    let name = document.querySelector('#name');
    let likes = document.querySelector('#likes');

    img.setAttribute('src', this.src);
    name.innerText = this.name;
    likes.innerText = this.likes;
  }

  // likeStart(){
  //   let likeButton = document.getElementById('like_button')
  //   likeButton.addEventListener('click', this.liker)
  // }

  // likeStart(){
  //   let likeButton = document.getElementById('like_button')
  //   likeButton.addEventListener('click', function() {
  //     let likes = document.querySelector('#likes')
  //     likes.innerText = Number.parseInt(likes.innerText) + 1;
  //     let options = {method: "POST",
  //       headers: {'Accept': 'application/json','Content-Type': 'application/json'},
  //       body: JSON.stringify({image_id: 19})
  //     }
  //     fetch(`https://randopic.herokuapp.com/likes/`, options).then(res => res.json()).then(json => console.log(json))
  //   })
  // }

  likeStart(){
    let likeButton = document.getElementById('like_button')
    likeButton.addEventListener('click', this.liker.bind(this))
  }

  liker(){
    let likes = document.querySelector('#likes')
    likes.innerText = Number.parseInt(likes.innerText) + 1;
    let options = {method: "POST",
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({image_id: this.id})
    }
    fetch(`https://randopic.herokuapp.com/likes/`, options).then(res => res.json()).then(json => console.log(json))
  }

}
