

$(function() {
	$("button#btnSubmit").click(e => {
		//goLogin_cookies(); // 로그인 처리(아이디 저장은 Cookie 를 사용)
		goLogin_LocalStorage()
	});
	
	$("input#loginPwd").keydown(e => {
		if(e.keyCode == 13) {
			//goLogin_cookies(); // 로그인 처리(아이디 저장은 Cookie 를 사용)
			goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 Localstorage 를 사용)
		}
	});
});//end of $(function()-----



//Function Declaration
//=== 로그인 처리 함수(아이디 저장은 쿠키를 사용) ===//
function goLogin_cookies() {
	//아이디처리
	if($("input#loginUserid").val().trim() == "") {
		alert("아이디를 입력하세요");
		$("input#loginUserid").val("").focus();
		return; // goLogin_cookies() 함수 종료!
	};
	
	//비밀번호처리
	if($("input#loginPwd").val().trim() == "") {
		alert("비밀번호를 입력하세요");
		$("input#loginPwd").val("").focus();
		return; // goLogin_cookies() 함수 종료!
	};
	
	const frm = document.loginFrm;
	/*frm.action = "";
	frm.method = "post"; 
	위 값들은 JSP 파일에서 미리 정의해놓음! */
	frm.submit();
};//end of function goLogin_cookies()-----



// ====== 로그인 처리 함수(아이디 저장은 LocalStorage 를 사용함) ====== // 
function goLogin_LocalStorage() {
	//아이디처리
	if($("input#loginUserid").val().trim() == "") {
		alert("아이디를 입력하세요");
		$("input#loginUserid").val("").focus();
		return; // goLogin_cookies() 함수 종료!
	};

	//비밀번호처리
	if($("input#loginPwd").val().trim() == "") {
		alert("비밀번호를 입력하세요");
		$("input#loginPwd").val("").focus();
		return; // goLogin_cookies() 함수 종료!
	};
	
	//아이디저장 체크박스에 체크가 된 경우로 로그인했을 경우
	if($("input:checkbox[id='saveid']").prop("checked")) {
		localStorage.setItem("saveid", $("input#loginUserid").val());
	} else {
		localStorage.removeItem("saveid");
	}
	const frm = document.loginFrm;
	frm.submit();
}


//=== 로그아웃 처리 함수 ===//
function goLogOut(ctx_Path) {
	// 로그아웃을 처리해주는 페이지로 이동
	//location.href = ctx_Path+"/login/logout.up";
	location.href = `${ctx_Path}/login/logout.up`;
}