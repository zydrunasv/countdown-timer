let countdown;

document.addEventListener('DOMContentLoaded', function() {
    populateTimezones();
}, false);

function populateTimezones() {
    const timezoneSelect = document.getElementById('timezone');
    const timezones = moment.tz.names();
    for (const timezone of timezones) {
        const option = document.createElement('option');
        option.value = timezone;
        option.text = timezone;
        timezoneSelect.add(option);
    }
}

function updateCtaFields() {
    const cta = document.getElementById('cta').value;
    if (cta === 'button') {
        document.getElementById('cta_text_div').style.display = 'block';
        document.getElementById('cta_link_div').style.display = 'block';
    } else {
        document.getElementById('cta_text_div').style.display = 'none';
        if (cta === 'timer') {
            document.getElementById('cta_link_div').style.display = 'block';
        } else {
            document.getElementById('cta_link_div').style.display = 'none';
        }
    }
}

function updateEndActionFields() {
    const endAction = document.getElementById('end_action').value;
    document.getElementById('end_text_div').style.display = endAction === 'custom_text' ? 'block' : 'none';
}

function generateTimer() {
    clearInterval(countdown);

    const endDateTime = moment.tz(document.getElementById('datetime').value, document.getElementById('timezone').value);
    const timerTitle = document.getElementById('title').value;
    const timerSubheading = document.getElementById('subheading').value;
    const endAction = document.getElementById('end_action').value;
    const endText = document.getElementById('end_text').value;

    const cta = document.getElementById('cta').value;
    const ctaText = document.getElementById('cta_text').value;
    const ctaLink = document.getElementById('cta_link').value;

    let daysLabel = document.getElementById('days').value || "d";
    let hoursLabel = document.getElementById('hours').value || "h";
    let minutesLabel = document.getElementById('minutes').value || "m";
    let secondsLabel = document.getElementById('seconds').value || "s";

    const timerElement = document.getElementById('timer');
    const buttonElement = document.getElementById('cta_button');
    buttonElement.textContent = ctaText;

    if (cta === 'button') {
        buttonElement.style.display = 'block';
        document.getElementById('timer').style.cursor = 'default';
        buttonElement.onclick = function() { window.location = ctaLink };
    } else if (cta === 'timer') {
        buttonElement.style.display = 'none';
        document.getElementById('timer').style.cursor = 'pointer';
        timerElement.onclick = function() { window.location = ctaLink };
    } else if (cta === 'entire_countdown') {
        buttonElement.style.display = 'none';
        document.getElementById('timer').style.cursor = 'pointer';
        timerElement.onclick = function() { window.location = ctaLink };
    } else {
        buttonElement.style.display = 'none';
        document.getElementById('timer').style.cursor = 'default';
    }

    countdown = setInterval(function() {
        const now = moment();
        const duration = moment.duration(endDateTime.diff(now));
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        if (duration <= 0) {
            clearInterval(countdown);
            if (endAction === 'unpublish') {
                document.getElementById('timer').style.display = 'none';
            } else if (endAction === 'custom_text') {
                document.getElementById('countdown').innerText = endText;
            }
        } else {
            document.getElementById('timerTitle').innerText = timerTitle;
            document.getElementById('timerSubheading').innerText = timerSubheading;
            document.getElementById('countdown').innerText = `${days}${daysLabel} ${hours}${hoursLabel} ${minutes}${minutesLabel} ${seconds}${secondsLabel}`;
            document.getElementById('timer').style.display = 'block';
        }
    }, 1000);
}

function copyTimer() {
    let datetime = document.getElementById('datetime').value;
    let timezone = document.getElementById('timezone').value;
    let title = document.getElementById('title').value;
    let subheading = document.getElementById('subheading').value;
    let endAction = document.getElementById('end_action').value;
    let endText = document.getElementById('end_text').value;

    let cta = document.getElementById('cta').value;
    let ctaText = document.getElementById('cta_text').value;
    let ctaLink = document.getElementById('cta_link').value;
    
    let daysLabel = document.getElementById('days').value || "d";
    let hoursLabel = document.getElementById('hours').value || "h";
    let minutesLabel = document.getElementById('minutes').value || "m";
    let secondsLabel = document.getElementById('seconds').value || "s";

    let buttonElement = '';
    if (cta === 'button') {
        buttonElement = '<button id="cta_button">' + ctaText + '</button>';
    }

    let htmlElements = `
        <div id="countdownWrapper" style="cursor: pointer; display: none;">
            <h1 id="timerTitle">${title}</h1>
            <h2 id="timerSubheading">${subheading}</h2>
            <div id="countdown"></div>
            ${buttonElement}
        </div>
    `;

    let scriptCode = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone-with-data.min.js"></script>
<script>
let endDateTime = moment.tz("${datetime}", "${timezone}");

let interval = setInterval(function() {
    let now = moment();
    let distance = endDateTime.diff(now);

    if (distance < 0) {
        clearInterval(interval);
        if ("${endAction}" === 'unpublish') {
            document.getElementById('countdownWrapper').style.display = 'none';
        } else if ("${endAction}" === 'custom_text') {
            document.getElementById('countdown').innerText = "${endText}";
        }
        return;
    }

    document.getElementById('countdownWrapper').style.display = "block";

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = days + '${daysLabel} ' + hours + '${hoursLabel} ' + minutes + '${minutesLabel} ' + seconds + '${secondsLabel} ';
    document.getElementById('countdownWrapper').setAttribute('onclick', "window.location='${ctaLink}'");

}, 1000);
</script>
`;

    let timerCode = htmlElements + scriptCode;

    let textarea = document.createElement('textarea');
    textarea.value = timerCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
