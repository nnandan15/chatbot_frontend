var $ = jQuery;

    
var uniq_id =  Math.random().toString(36).substring(2) +(new Date()).getTime().toString(36);
console.log(uniq_id)



// Initiate the conversation when user clicks on language
function lang_sel(val){
    language = val;
    if(language==="en"){
        lang_ = "en-IN";
    }else if(language==="te"){
        lang_ = "te-IN";
    }else if(language==="ta"){
        lang_ = "ta-IN";
    }
    $('.chat__wrapper').append('<div id="lang_selected">'+lang_+'</div>');
    data = {"query":"start","Id":uniq_id,"lang_code":lang_,"dt_field":null,"audio_file":null}
    fetch('http://3.138.189.39:5001/bot', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        var question = data.question_text;
        $('.chat__wrapper').append('<div id="bot_chat" class="chat__message chat__message-bot">'+'<div>'+question+'</div>'+'</div>');
        var audiofl = data.audio_file;
        var a = new Audio(audiofl);
        a.play();
        dt_f = data.dt_field;
        $('.chat__wrapper').append('<div id="dt_field">'+dt_f+'</div>');
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function send_mes(){

    $('#chat__form').on('submit', function(e) {
        e.preventDefault();
        var message = $('#text-message').val();
        var x; var y;
        x = document.getElementById("dt_field").innerHTML;
        y = document.getElementById("lang_selected").innerHTML;
        $('#text-message').val('');
        if (message!=''){
            console.log(message);
            $('.chat__wrapper').append('<div class="chat__message chat__message-own"><div>' + message + '</div></div>');
            data = {"query":null,"Id":uniq_id,"lang_code":y,"dt_field":x,"audio_file":message};
            console.log(data);
            fetch('http://3.138.189.39:5001/bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                var question = data.question_text;
                $('.chat__wrapper').append('<div id="bot_chat" class="chat__message chat__message-bot">'+'<div>'+question+'</div>'+'</div>');
                var audiofl = data.audio_file;
                var a = new Audio(audiofl);
                a.play();
                dt_f = data.dt_field;
                $("#dt_field").html(dt_f);
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    })
}

$(document).ready(function(){
    $('.chat_icon').click(function(event) {
        $('.chat_box').toggleClass('active');
    });
})