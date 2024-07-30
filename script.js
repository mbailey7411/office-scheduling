document.getElementById('availabilityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const days = document.getElementById('days').value;

    fetch('/api/availability', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, days })
    }).then(response => response.text())
      .then(data => {
          alert(data);
          loadSchedule();
      }).catch(error => {
          console.error('Error:', error);
      });

    document.getElementById('availabilityForm').reset();
});

function loadSchedule() {
    fetch('/api/availability')
        .then(response => response.json())
        .then(data => {
            const scheduleDiv = document.getElementById('schedule');
            scheduleDiv.innerHTML = '';
            data.forEach(entry => {
                const newEntry = document.createElement('p');
                newEntry.textContent = `${entry.name} is available on: ${entry.days}`;
                scheduleDiv.appendChild(newEntry);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', loadSchedule);