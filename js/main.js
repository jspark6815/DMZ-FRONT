var name = prompt('닉네임을 설정해주세요')

let socket = io.connect('http://13.209.19.68:8080');

socket.on('connect', () => {
    console.log(`[on] connent`);
    socket.emit('nickname',name);
    
})
socket.on('userList', (arr) => {
    console.log(`[on] userList`);
    let user = document.getElementById('user');
   
    while(user.firstChild) {
        user.removeChild(user.firstChild);
    }
    for(var i in arr){
        a(arr[i].nickname, arr[i].score, arr[i].turn)
    }
})
socket.on('userEvent', function(obj) {
    console.log(`[on] userEvent`);
    //console.log(JSON.stringify(obj));
    //a(obj.event + " " + obj.userData.nickname)
})
socket.on('chat',function(obj){
    console.log(`[on] chat`);
    console.log(obj);
    console.log(obj.msg);
    floating(obj.userData.nickname, obj.msg);
    //a(obj.event + " " + obj.)
})
socket.on('question',function(obj){
    console.log(`[on] question`);
    alert(obj.word)
})


function txt() {
    let put = document.getElementById('put');
    let txt_data = put.value;
    put.value = '';
    console.log(txt_data + " " + txt_data.indexOf('/nick'));
    if(txt_data.indexOf('/nick') == 0) {
        socket.emit('nickname',txt_data.slice(6));
    } else {
        socket.emit('chat', txt_data);
    }
}

function enter(e) {
    if(e.keyCode == 13) {
        txt();
    }
}

function a(nick, score, turn) {
    var para = document.createElement("LI");
    var t = document.createTextNode(nick+": "+score);
    para.appendChild(t);
    if(turn) {
        para.setAttribute('class', 'turn_on');
    } else {
        para.setAttribute('class', 'turn_off');
    }
    document.getElementById("user").appendChild(para);
}
function floating(nick, text) {
    var para = document.createElement("P");
    var t = document.createTextNode(nick + " : " + text);
    para.appendChild(t);
    document.getElementById("chat").appendChild(para);
}