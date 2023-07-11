let countdown;

document.addEventListener('DOMContentLoaded', function() {
    populateTimezones();
    preselectDateTimePlus24Hours();
}, false);

function populateTimezones() {
    const timezoneSelect = document.getElementById('timezone');
    const timezones = moment.tz.names();
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    for (const timezone of timezones) {
        const option = document.createElement('option');
        option.value = timezone;
        option.text = timezone;
        if (timezone === currentTimezone) {
            option.selected = true;
        }
        timezoneSelect.add(option);
    }
}

function preselectDateTimePlus24Hours() {
    const datetimeInput = document.getElementById('datetime');
    const currentTimePlus24Hours = moment().add(24, 'hours');
    datetimeInput.value = currentTimePlus24Hours.format('YYYY-MM-DDTHH:mm');
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

    let daysLabel = document.getElementById('days_label').value || "Days";
    let hoursLabel = document.getElementById('hours_label').value || "Hrs";
    let minutesLabel = document.getElementById('minutes_label').value || "Mins";
    let secondsLabel = document.getElementById('seconds_label').value || "Secs";

    const timerElement = document.getElementById('timer');
    const buttonElement = document.getElementById('cta_button');
    buttonElement.textContent = ctaText;


    if (cta === 'button') {
        buttonElement.style.display = 'inline-block';
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
        const days = duration.days().toString().padStart(2, '0');
        const hours = duration.hours().toString().padStart(2, '0');
        const minutes = duration.minutes().toString().padStart(2, '0');
        const seconds = duration.seconds().toString().padStart(2, '0');

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

            document.getElementById('days').innerText = days + ' :';
            document.getElementById('daysLabel').innerText = daysLabel;
            document.getElementById('hours').innerText = hours + ' :';
            document.getElementById('hoursLabel').innerText = hoursLabel;
            document.getElementById('minutes').innerText = minutes + ' :';
            document.getElementById('minutesLabel').innerText = minutesLabel;
            document.getElementById('seconds').innerText = seconds;
            document.getElementById('secondsLabel').innerText = secondsLabel;

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
    
    let daysLabel = document.getElementById('days_label').value || "Days";
    let hoursLabel = document.getElementById('hours_label').value || "Hrs";
    let minutesLabel = document.getElementById('minutes_label').value || "Mins";
    let secondsLabel = document.getElementById('seconds_label').value || "Secs";

    let cursorStyle = cta === 'entire_countdown' ? 'pointer' : 'default';

    let buttonElement = '';
    if (cta === 'button') {
        buttonElement = '<button id="cta_button">' + ctaText + '</button>';
    }

    let htmlElements = `
    <style>
    #countdownWrapper {
        flex-flow: column;
        background: rgb(255, 255, 255);
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 8px;
        border: 0px solid rgb(197, 200, 209);
        text-align: center;
        flex: 1 1 auto;
        align-items: center;
        cursor: ${cursorStyle};
        display: block;
    }
    
    #timerTitle {
    font-weight: bold;
        font-size: 28px;
        color: #202223;
        margin: 0;
        padding: 0;
        line-height: 1.2;
        letter-spacing: normal;
        text-transform: none;
    }
    
    #timerSubheading {
        font-size: 16px;
        color: #202223;
        line-height: 1.2;
        letter-spacing: normal;
        padding: 0;
        padding-top: 2px;
        margin: 0;
        font-weight:500;
    }
    
    #countdown {
        row-gap: 6px;
        justify-items: center;
        align-items: center;
        column-gap: 5px;
        direction: ltr;
        padding-top: 4px;
    }
    
    #cta_button {
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        background: #202223;
        border: 0;
        white-space: nowrap;
        padding: 8px 16px;
        line-height: 1.5;
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        margin-top: 16px;
    }
    .time > .value {
        color: #202223;
        font-weight: bold;
        font-size: 40px;
        line-height: 1;
        font-feature-settings: 'tnum';
        font-variant-numeric: tabular-nums;
        padding-top: 4px;
    }
    .time > .label {
        color: #6d7175;
        font-size: 14px;
        padding-right: 10px;
        grid-column: 2 span;
        line-height: 1;
    }
    </style>
        <div id="countdownWrapper" style="cursor: ${cursorStyle}; display: none;">
            <h1 id="timerTitle">${title}</h1>
            <h2 id="timerSubheading">${subheading}</h2>
            <div id="countdown">
                <div id="days" class="time" style="display: inline-block; text-align: center; margin-right: 10px;">
                    <div class="value" style="font-size: 40px;"></div>
                    <div class="label" style="font-size: 14px;">${daysLabel}</div>
                </div>
                <div id="hours" class="time" style="display: inline-block; text-align: center; margin-right: 10px;">
                    <div class="value" style="font-size: 40px;"></div>
                    <div class="label" style="font-size: 15px;">${hoursLabel}</div>
                </div>
                <div id="minutes" class="time" style="display: inline-block; text-align: center; margin-right: 10px;">
                    <div class="value" style="font-size: 40px;"></div>
                    <div class="label" style="font-size: 14px;">${minutesLabel}</div>
                </div>
                <div id="seconds" class="time" style="display: inline-block; text-align: center;">
                    <div class="value" style="font-size: 40px;"></div>
                    <div class="label" style="font-size: 14px;">${secondsLabel}</div>
                </div>
            </div>
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
    
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
        document.getElementById('days').getElementsByClassName('value')[0].innerHTML = days + ' :';
        document.getElementById('hours').getElementsByClassName('value')[0].innerHTML = hours + ' :';
        document.getElementById('minutes').getElementsByClassName('value')[0].innerHTML = minutes + ' :';
        document.getElementById('seconds').getElementsByClassName('value')[0].innerHTML = seconds;
    
        if ("${cta}" === 'button') {
            document.getElementById('cta_button').setAttribute('onclick', "window.location='${ctaLink}'");
        } else {
            document.getElementById('countdownWrapper').setAttribute('onclick', "window.location='${ctaLink}'");
        }
    
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
