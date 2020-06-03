$(function(){
  $('#user-search-field').on('keyup', function(){
    let input = $(this).val()
  $.ajax({
    type:'GET',
    url: '/users',
    dataType: 'json',
    data: { keyword: input }
  })
  })
});