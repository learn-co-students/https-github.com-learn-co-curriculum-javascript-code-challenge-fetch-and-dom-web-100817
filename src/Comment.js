class Comment {
  constructor(img, path){
    this.img = img;
    this.path = path;
    this.startUp();
  }

  startUp(){
    let cmts = document.querySelector('#comments')
    this.img.comments.forEach(c => {
      this.make(c.content)
    })
    let cButton = document.querySelector('form').children[1]
    cButton.addEventListener('click',(e) => { e.preventDefault();this.commenter();})
  }

  make(text){
    let cmts = document.querySelector('#comments')
    let cmt = document.createElement('li');
    cmt.innerHTML = `<p>${text}</p>`
    cmts.appendChild(cmt);
  }


  commenter(){
    let newC = document.querySelector('#comment_input')
    this.make(newC.value);


    let options = {method: "POST",
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({image_id: this.img.id, content: newC.value})
    }
    fetch(`${this.path}`, options)
    newC.value = ''
  }


}
