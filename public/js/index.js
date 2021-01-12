var auth = firebase.auth();
var google = new firebase.auth.GoogleAuthProvider();
var db = firebase.database();
var user;

auth.onAuthStateChanged(onAuth);
$("#btLogin").click(onLogin);
$("#btLogout").click(onLogout);

function onAdd(r) {
	var html = '<p id="'+r.key+'">'+r.val().title;
	html += '<i onclick="onDelete(this);" class="ml-5"`>`삭제</i></p>';
	$('.wrapper').prepend(html);
}

function onRev(r) {
	console.log(r.key);
	$('#'+r.key).remove();
}

function onDelete(el) {
	var key = $(el).parent().attr("id");
	db.ref('root/sample/'+key).remove();
}

function onSubmit(f) {
	var data = {
		title: f.title.value,
		content: '테스트 입니다.',
		createdAt: new Date().getTime()
	}
	if(f.title.value !== '') db.ref('root/sample').push(data);
	f.title.value = '';
	return false;
}

function dbInit() {
	db.ref('root/sample').on('child_added', onAdd);
	db.ref('root/sample').on('child_removed', onRev);
}

function onAuth(r) {
	user = r;
	if(user) {
		console.log('로그인된 상태');
		$('.header').html('<p>'+user.uid+'</p>');
		dbInit();
	}
	else {
		console.log('로그아웃된 상태');
		$('.header').html('');
		$('.wrapper').html('');
	}
}

function onLogin() {
	auth.signInWithPopup(google);
}

function onLogout() {
	auth.signOut();
}