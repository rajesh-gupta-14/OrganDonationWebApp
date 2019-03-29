function activate_create(){
        if (document.getElementById('submit').disabled == true){
                document.getElementById('submit').disabled = false;
        }
	}

function setName(val){
        var fileName = val.split('\\').pop();
        $('#customfield').html(fileName);
	}