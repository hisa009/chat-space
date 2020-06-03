$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.chat-main__main__contents:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__main').append(insertHTML);
        $('.chat-main__main').animate({ scrollTop: $('.chat-main__main')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  }
  function buildHTML(message) {
    if (message.picture) {
      var html = `<div class="chat-main__main__contents" data-message-id=${message.id}>
                    <div class="chat-main__main__contents__user">
                      <a class="chat-main__main__contents__user__name"> 
                        ${message.user_name}
                      </a>
                      <a class="chat-main__main__contents__user__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="chat-main__main__contents__message">
                      <p class="chat-main__main__contents__message__content">
                        ${message.text}
                      </p>
                      <img src="${message.picture}" class="chat-main__main__contents__message__image" >
                    </div>
                  </div>`
    } else {
      var html = `<div class="chat-main__main__contents" data-message-id=${message.id}>
                    <div class="chat-main__main__contents__user">
                      <a class="chat-main__main__contents__user__name"> 
                        ${message.user_name}
                      </a>
                      <a class="chat-main__main__contents__user__date">
                        ${message.created_at}
                      </a>
                    </div>
                    <div class="chat-main__main__contents__message">
                      <p class="chat-main__main__contents__message__content">
                        ${message.text}
                      </p>
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__main').append(html);
      $('.chat-main__main').animate({ scrollTop: $('.chat-main__main')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.chat-main__type-message__btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.chat-main__type-message__btn').prop('disabled', false);
    });
  })
  setInterval(reloadMessages, 7000);
});