/* QUICK CHAT DEMO */

// Delete this file once you've seen how the demo works

function append(message, clazz) {
  var html = ss.tmpl['chat-message'].render({
    message: message,
    time: function() { return timestamp(); },
    clazz: clazz
  });
  return $(html).hide().appendTo('#chatlog').slideDown();
}

// Listen out for newMessage events coming from the server
ss.event.on('chat:browser', function (message) {
  append(message, 'browser');
});
ss.event.on('chat:message', function (obj) {
  // this assumes obj structure { message: "content" }
  append(obj.message, 'webservice');
});

$('ul.nav li').on('click', function (e) {
  var $link = $(e.currentTarget);
  // hide all divs under #content
  $('#content > div').hide();
  // remove all active classes
  $('ul.nav li').removeClass('active');
  // add active class, and show div link href => #id
  $link.addClass('active');
  $($('a', $link).attr('href')).show();
});

// Show the chat form and bind to the submit action
$('#demo').on('submit', function() {

  // Grab the message from the text box
  var text = $('#myMessage').val();

  // Call the 'send' funtion (below) to ensure it's valid before sending to the server
  return exports.send(text, function(success) {
    if (success) {
      return $('#myMessage').val('');
    } else {
      return alert('Oops! Unable to send message');
    }
  });
});

// Demonstrates sharing code between modules by exporting function
exports.send = function(text, cb) {
  if (valid(text)) {
    return ss.rpc('demo.sendMessage', text, cb);
  } else {
    return cb(false);
  }
};


// Private functions

var timestamp = function() {
  var d = new Date();
  return d.getHours() + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
};

var pad2 = function(number) {
  return (number < 10 ? '0' : '') + number;
};

var valid = function(text) {
  return text && text.length > 0;
};