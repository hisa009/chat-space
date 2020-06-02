$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="chat-main__main__contents">
                    <div class="chat-main__main__contents__user">
                      <a class="chat-main__main__contents__user__name"> 
                        ${message.user_name}
                      </a>
                      <a class="chat-main__main__contents__user__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="chat-main__main__contents__message">
                      <a class="chat-main__main__contents__message__content">
                        ${message.text}
                      </a>
                      <img src="${message.picture}" class="chat-main__main__contents__message__image" >
                    </div>
                  </div>`
    } else {
      var html = `<div class="chat-main__main__contents">
                    <div class="chat-main__main__contents__user">
                      <a class="chat-main__main__contents__user__name"> 
                        ${message.user_name}
                      </a>
                      <a class="chat-main__main__contents__user__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="chat-main__main__contents__message">
                      <a class="chat-main__main__contents__message__content">
                        ${message.text}
                      </a>
                    </div>
                  </div>`
    };
    return html;
  }


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});