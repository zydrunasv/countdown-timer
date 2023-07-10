let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let timezoneSelect = document.getElementById('timezone');

let timerCode = 
`<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone-with-data.min.js"></script>
<div id="countdown"></div>
<script>
let endDateTime = moment.tz("${datetime}", "${timezone}");

let interval = setInterval(function() {
    let now = moment();
    let distance = endDateTime.diff(now);

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 'EXPIRED';
        clearInterval(interval);
        return;
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

}, 1000);
</script>`;

// Get all the timezones using moment-timezone
let allTimeZones = moment.tz.names();

allTimeZones.forEach(timezone => {
    let option = document.createElement('option');
    option.value = timezone;
    option.text = timezone;
    timezoneSelect.appendChild(option);
});

let interval = null;

function generateTimer() {
    let timezone = document.getElementById('timezone').value;
    let endDateTime = moment.tz(document.getElementById('datetime').value, timezone);

    // Clear the previous interval, if there is one
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(function() {
        let now = moment();
        let distance = endDateTime.diff(now);

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = 'EXPIRED';
            clearInterval(interval);
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    }, 1000);
}

function copyTimer() {
    let datetime = document.getElementById('datetime').value;
    let timezone = document.getElementById('timezone').value;

    let timerCode = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone-with-data.min.js"></script>
<div id="countdown"></div>
<script>
let endDateTime = moment.tz("${datetime}", "${timezone}");

let interval = setInterval(function() {
    let now = moment();
    let distance = endDateTime.diff(now);

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = 'EXPIRED';
        clearInterval(interval);
        return;
    }

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

}, 1000);
</script>`;

    let textarea = document.createElement('textarea');
    textarea.value = timerCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
