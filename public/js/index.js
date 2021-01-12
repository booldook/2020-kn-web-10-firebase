var auth = firebase.auth();
var google = new firebase.auth.GoogleAuthProvider();
var user;

auth.onAuthStateChanged(onAuth);
$("#btLogin").click(onLogin);
$("#btLogout").click(onLogout);


function onAuth(r) {
	user = r;
	if(user) {
		console.log('로그인된 상태');
		$('.header').html('<p>'+user.uid+'</p>');
	}
	else {
		console.log('로그아웃된 상태');
	}
}

function onLogin() {
	auth.signInWithPopup(google);
}

function onLogout() {
	auth.signOut();
}