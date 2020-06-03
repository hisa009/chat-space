$(function(){

  function appendUser(user){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
    $('#user-search-result').append(html)
  }
  function noUser(){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    $('#user-search-result').append(html)
  }

  function  addGroup(userName, userId){
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html)
  }

  $('#user-search-field').on('keyup', function(){
    let input = $(this).val()
  $.ajax({
    type:'GET',
    url: '/users',
    dataType: 'json',
    data: { keyword: input }
  })
  .done(function(users){
    $('#user-search-result').empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      })
    } else if(input.length == 0) {
      return false;
    } else {
      noUser()
    }
    })
  .fail(function() {
    alert('ユーザーの検索に失敗しました');
  })
  })
  $('body').on('click', '.chat-group-user__btn--add', function() { 
    let id = $(this).attr('data-user-id')
    let name = $(this).attr('data-user-name')
    $(this).parent().remove()
    addGroup(name, id)
  })

  $('body').on('click', '.chat-group-user__btn--remove', function() { 
    $(this).parent().remove()
  })
});