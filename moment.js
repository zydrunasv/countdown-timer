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
