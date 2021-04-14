function myFunction() {
    const sendbutton = document.getElementById('sendbtn');
    const messageinp = document.getElementById('messageInput');

    var r = confirm("Do you really want to exit chat box?");
    if (r == true) {
        sendbutton.disabled = true;
        messageinp.disabled = true;
        alert(`you can't reply to these conversation anymore xD`);
    }
}

function closeWin() {
    var res = confirm("Do you really want to leave this page?");
    if (res == true) {
        var s = window.opener();
        s.close();
    }
}



