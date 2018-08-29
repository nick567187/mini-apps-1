$('document').ready(function() {
  $('#submitButton').click(function(event) {
    event.preventDefault();
    $('#cv').empty();
    var data = $('#textBox').val();
    $httpPost(data);
    $('#textBox').val('');
  });
});

var view = {
  renderCV: function(array) {
    var $filter = $('#filter').val();
    $filter.toLowerCase();
    if($filter !== '') {
      array.filter((elem) => {
        return !elem.toLowerCase().includes($filter);
      }).forEach((word) => {
        $('#cv').append(`<p>${word}</p>`);
        $('#cv').append('<br>');
      });
    } else {
      array.forEach((elem) => {
        $('#cv').append(`<p>${elem}</p>`);
        $('#cv').append('<br>');
      });
    }
  }
}

var $httpPost = function(data) {
  data = {result: data};
  $.post('/', data, function(result) {
    var results = result.split('\n');
    view.renderCV(results);
  });
}
