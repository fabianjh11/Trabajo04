//Connection

var socket = io.connect('https://fabian-jimenez.onrender.com/');

const handle = document.getElementById('handle');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emitir eventos
btn.addEventListener('click', function()
{
  if(message.value !== '')
  {
    if(handle.value === '')
    {
      handle.value = 'User';
    }
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = '';
  }
});

document.addEventListener('keypress', function(keypressed)
{
  if(keypressed.key === 'Enter' && message.value !== '')
  {
    if(handle.value === '')
    {
      handle.value = 'User';
    }
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = '';
  }
});

message.addEventListener('keypress', function()
{
  if(handle.value === '')
  {
    handle.value = 'User';
  }
  socket.emit('typing', handle.value);
});

//Escuchar eventos y emitir el mensaje a todos los clientes
socket.on('chat', function(data)
{
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
})

socket.on('typing', function(data)
{
  feedback.innerHTML = '<p><em> ' + data + ' está escribiendo...</em></p>';
});
