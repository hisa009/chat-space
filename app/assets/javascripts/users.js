$(function(){

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
    $('#user-search-result').append(html)
  }
  function noUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`
    $('#user-search-result').append(html)
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
  })
});