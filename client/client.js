// Fetch users from the backend
fetch('http://localhost:3001/api/users')
    .then(response => response.json())
    .then(users => {
        // Update UI to display the list of users
        console.log('Users:', users);

        // Emit a Socket.io event to notify connected clients about the fetched users
        socket.emit('usersUpdated', users);
    })
    .catch(error => console.error('Error fetching users:', error));

// Create a room
fetch('http://localhost:3001/api/rooms', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'New Room' })
})
.then(response => response.json())
.then(room => {
    // Update UI to display the newly created room
    console.log('Room created:', room);

    // Emit a Socket.io event to notify connected clients about the newly created room
    socket.emit('roomCreated', room);
})
.catch(error => console.error('Error creating room:', error));

// Add a user to a room
const userId = '66386f6976c58a3981405a76';
const roomId = '65b61d7a8db4edc72edb9362';
fetch(`http://localhost:3001/api/rooms/${roomId}/users`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })
})
.then(response => {
    if (response.ok) {
        console.log('User added to the room successfully');

        // Emit a Socket.io event to notify connected clients about the user added to the room
        socket.emit('userAddedToRoom', { userId, roomId });
    } else {
        console.error('Error adding user to the room:', response.statusText);
    }
})
.catch(error => console.error('Error adding user to the room:', error));

function createRoom() {
    const roomName = document.getElementById('roomName').value;
    if (roomName) {
      fetch('http://localhost:3001/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: roomName })
      })
      .then(response => response.json())
      .then(room => {
        console.log('Room created:', room);
        // Optionally, update the UI to display the newly created room
      })
      .catch(error => console.error('Error creating room:', error));
      document.getElementById('roomName').value = ''; // Clear input field after creating room
    } else {
      alert('Room name cannot be empty');
    }
  }
  