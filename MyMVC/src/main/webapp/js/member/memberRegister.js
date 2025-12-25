

let b_idcheck_click = false;
// "아이디중복확인" 을 클릭했는지 클릭을 안 했는지 여부를 알아오기 위한 용도

let b_emailcheck_click = false;
// "이메일중복확인" 을 클릭했는지 클릭을 안 했는지 여부를 알아오기 위한 용도

let b_zipcodeSearch_click = false;
// "우편번호찾기" 를 클릭했는지 클릭을 안 했는지 여부를 알아오기 위한 용도


$(function() {
	$("span.error").hide();
	
	$("input#name").focus();
	
	// 이름 태그 이벤트
	$("input#name").blur((e)=> {
		//이름태그에 입력받은 값의 공백을 제거한 후 아래 if조건 검사
		const name = $(e.target).val().trim();
		
		if(name == "") {
			//입력받은 이름이 공백만 있거나, 입력되지 않았을 경우
			
			// 테이블 내 모든 input 태그를 비활성화 해주기
			$("table#tblMemberRegister :input").prop("disabled", true);
			// 이벤트가 발생한 요소만 다시 활성화 해주기
			$(e.target).prop("disabled", false).val("").focus();
			// 현재 태그의 부모 태그로 올라가서 그 자식의 class가 error인 태그를 보여주기
			$(e.target).parent().find("span.error").show();
		} else {
			//입력받은 이름이 공백이 아니거나, 제대로 입력받았을 경우
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 name 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료-----
	
	
	// 아이디 태그 이벤트
	$("input#userid").blur((e)=>{
		const userid = $(e.target).val().trim();
		if(userid == "") {
			//입력받은 아이디가 공백이거나 입력받지 않았을 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 userid 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	
	// 비밀번호 태그 이벤트
	$("input#pwd").blur((e)=>{
		// 비밀번호 정규표현식
		const regExp_pwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g;
		
		// 입력바든 비밀번호가 정규표현식에 부합하는지 검사, 부합하면 true
		const bool = regExp_pwd.test($(e.target).val());
		
		if(!bool) {
			//입력받은 비밀번호가 정규표현식을 위반했을 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 pwd 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	// 비밀번호확인 태그 이벤트
	$("input#pwdcheck").blur((e)=>{
		// 비밀번호 정규표현식
		const pwdcheck = $(e.target).val();
		
		if(pwdcheck != $("input#pwd").val()) {
			//입력받은 비밀번호확인 값이 위의 비밀번호와 다를 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			
			$("input#pwd").prop("disable", false).val(""); //비밀번호 입력칸 활성화 및 초기화
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			//입력받은 비밀번호확인 값이 비밀번호와 같은 경우
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 pwdcheck 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	
	// 이메일 태그 이벤트
	$("input#email").blur((e)=> {
		const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		
		const bool = regExp_email.test($(e.target).val());
		if(!bool) {
			// 입력받은 이메일이 정규표현식에 위배된 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 email 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	
	// hp2 태그 이벤트
	$("input#hp2").blur((e)=> {
		const regExp_hp2 = /^[1-9][0-9]{3}$/;  
		const bool = regExp_hp2.test($(e.target).val());
		if(!bool) {
			// 입력받은 연락처가 정규표현식에 위배된 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 hp2 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	// hp3 태그 이벤트
	$("input#hp3").blur((e)=> {
		const regExp_hp3 = /^[0-9]{4}$/;
		const bool = regExp_hp3.test($(e.target).val());
		if(!bool) {
			// 입력받은 연락처가 정규표현식에 위배된 경우
			$("table#tblMemberRegister :input").prop("disabled", true);
			$(e.target).prop("disabled", false).val("").focus();
			$(e.target).parent().find("span.error").show();
		} else {
			$("table#tblMemberRegister :input").prop("disabled", false);
			$(e.target).parent().find("span.error").hide();
		}
	});//id가 hp3 인 태그에서 포커스를 잃어버렸을 경우 블러처리 해주는 이벤트 종료 -----
	
	
	
	// =============================================================== //
/*	
	>>>> .prop() 와 .attr() 의 차이 <<<<	         
    .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
    .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
*/
	// 우편번호를 읽기전용(readonly)로 만들기
	$('input#postcode').attr('readonly', true);

	// 주소를 읽기전용(readonly)로 만들기
	$('input#address').attr('readonly', true);
		
	// 참고항목을 읽기전용(readonly)로 만들기
	$('input#extraAddress').attr('readonly', true);
			
	// ===== "우편번호찾기"를 클릭했을 때 이벤트 처리하기 시작 ====== //
	$('img#zipcodeSearch').click(()=> {
		b_zipcodeSearch_click = true; // "우편번호찾기"를 클릭했다는 증빙.
		new daum.Postcode({
	           oncomplete: function(data) {
	               // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	   
	               // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	               // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	               let addr = ''; // 주소 변수
	               let extraAddr = ''; // 참고항목 변수
	   
	               //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	               if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                   addr = data.roadAddress;
	               } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                   addr = data.jibunAddress;
	               }
	   
	               // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	               if(data.userSelectedType === 'R'){
	                   // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                   // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                   if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	                       extraAddr += data.bname;
	                   }
	                   // 건물명이 있고, 공동주택일 경우 추가한다.
	                   if(data.buildingName !== '' && data.apartment === 'Y'){
	                       extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                   }
	                   // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                   if(extraAddr !== ''){
	                       extraAddr = ' (' + extraAddr + ')';
	                   }
	                   // 조합된 참고항목을 해당 필드에 넣는다.
	                   document.getElementById("extraAddress").value = extraAddr;
	               } else {
	                   document.getElementById("extraAddress").value = '';
	               }
	               // 우편번호와 주소 정보를 해당 필드에 넣는다.
	               document.getElementById('postcode').value = data.zonecode;
	               document.getElementById("address").value = addr;
	               // 커서를 상세주소 필드로 이동한다.
	               document.getElementById("detailAddress").focus();
	           }
	       }).open();
		
		// ==== 참고 ==== //
		// 주소를 비활성화로 만들기
	//	$('input#address').prop('disabled', true);

	    // 주소를 활성화로 만들기
	//	$('input#address').removeAttr('disabled');

	    // 주소를 쓰기가능으로 만들기
	//	$('input#address').removeAttr('readonly');

	    // 주소를 읽기전용(readonly)로 만들기
	//	$('input#address').attr('readonly', true);
	});
	// ============ "우편번호찾기"를 클릭했을 때 이벤트 처리하기 끝 =========== //

		// === jQuery UI 의 datepicker === //
	    $('input#datepicker').datepicker({
	        dateFormat: 'yy-mm-dd'  //Input Display Format 변경
	       ,showOtherMonths: true   //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	       ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
	       ,changeYear: true        //콤보박스에서 년 선택 가능
	       ,changeMonth: true       //콤보박스에서 월 선택 가능                
	   //  ,showOn: "both"          //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
	   //  ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
	   //  ,buttonImageOnly: true   //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
	   //  ,buttonText: "선택"       //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
	       ,yearSuffix: "년"         //달력의 년도 부분 뒤에 붙는 텍스트
	       ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
	       ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
	       ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
	       ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	   //  ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
	   //  ,maxDate: "+1M" //최대 선택일자(+1D:하루후, +1M:한달후, +1Y:일년후)                
	   });
	   
	   // 초기값을 오늘 날짜로 설정
	   // $('input#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)  

	   // === 전체 datepicker 옵션 일괄 설정하기 ===  
	   //     한번의 설정으로 $("input#fromDate"), $('input#toDate')의 옵션을 모두 설정할 수 있다.
	$(function() {
	       //모든 datepicker에 대한 공통 옵션 설정
	       $.datepicker.setDefaults({
	            dateFormat: 'yy-mm-dd' //Input Display Format 변경
	           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
	           ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
	           ,changeYear: true //콤보박스에서 년 선택 가능
	           ,changeMonth: true //콤보박스에서 월 선택 가능                
	        // ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
	        // ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
	        // ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
	        // ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
	           ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
	           ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
	           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
	           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
	           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	        // ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
	        // ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
	       });
	       // input을 datepicker로 선언
	       $("input#fromDate").datepicker();                    
	       $("input#toDate").datepicker();
	       
	       // From의 초기값을 오늘 날짜로 설정
	       $('input#fromDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
	       
	       // To의 초기값을 3일후로 설정
	       $('input#toDate').datepicker('setDate', '+3D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
	});
	 
	 
	 // 생년월일에 키보드로 값을 직접 입력할 경우 입력하지 못 하도록 하겠다. //
	 $("input#datepicker").bind("keyup", function(e){
		// $(e.target) ==> $("input#datepicker") 태그를 의미! 즉, 이벤트가 발생한 태그
		$(e.target).val("").next().show();
	 });
	 
	 // ===== 생년월일에 마우스로 값을 변경하는 경우 ===== //
	 $("input#datepicker").bind("change", e => {
		if($(e.target).val() != "") { // 날짜에 들어온 값이 뭐라도 있는 경우라면
			$(e.target).next().hide();
		}
	});
	
	
// ================================================================================//
	// -- "아이디중복확인" 을 클릭했을 때 이벤트 처리하기 시작 -- //
	$("img#idcheck").click(()=>{
		b_idcheck_click = true;
		
		if($("input#userid").val().trim() != "") {
			$.ajax({
				url: "idDuplicateCheck.up",
				data: {"userid":$("input#userid").val()},
				type: "post",
				async: true,
				success: function(text) {
					console.log("확인용 text: ",text);
					console.log("확인용 text의 데이터 타입은? ", typeof text);
					
					const json = JSON.parse(text);
					console.log("id_json", json);
					
					// 이 값이 true라면 이미 사용중인 아이디라는 것!
					if(json.isExists) {
						$("span#idcheckResult").html($("input#userid").val()+"은(는) 이미 사용중인 아이디입니다.").css({"color":"red"});
						$("input#userid").val("");
					} else {
						$("span#idcheckResult").html($("input#userid").val()+"은(는) 사용 가능한 아이디입니다.").css({"color":"green"});
					}
				},
				error: function(request, status, error) {
					alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
				}
			});
		}
	});// "아이디중복확인" 을 클릭했을 때 이벤트 끝
	
	// 아이디 값을 이후에 다시 변경했다면 "아이디중복확인" 버튼을 클릭하게 하기 위한 조건
	$("input#userid").bind("change", function() {
		b_idcheck_click = false;
	});
	
	
	
	
	// -- "이메일중복확인" 을 클릭했을 때 이벤트 처리하기 시작 -- //
	$("span#emailcheck").click(()=>{
		b_emailcheck_click = true;
		
		if($("input#email").val().trim() != "") {
			$.ajax({
				url: "emailDuplicateCheck.up",
				data: {"email":$("input#email").val()},
				type: "post",
				dataType: "json",
				success: function(json) {
					console.log("확인용 json: ", json);
					console.log("확인용 json 의 데이터 타입 => ", typeof json);
					
					if(json.isExists) {
						// 입력한 email 이 이미 사용중이라면 
						$('span#emailCheckResult').html($('input#email').val() + "은 이미 사용중 이므로 다른 이메일을 입력하세요").css({"color":"red"});                 
						$('input#email').val("");       
					}
					else {
						// 입력한 email 이 존재하지 않는 경우라면 
						$('span#emailCheckResult').html($('input#email').val() + "은 사용가능 합니다").css({"color":"green"}); 
					}
				},
				error: function(request, status, error) {
					alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
				}
			});
		}
	});// "이메일중복확인" 을 클릭했을 때 이벤트 끝

	// 이메일 값을 이후에 다시 변경했다면 "이메일중복확인" 버튼을 클릭하게 하기 위한 조건
	$("input#eamil").bind("change", function() {
		b_emailcheck_click = false;
	});
// ================================================================================//
});//end of $(function()-----





// "가입하기" 버튼 클릭 시 호출되는 함수
function goRegister() {
	let b_requiredInfo = true;
	
	// 입력받는 항목에 모든 값을 입력했는지 확인
	$("input.requiredInfo").each((index, elmt) => {
		const val = $(elmt).val().trim();
		if(val == "") {
			alert("*표시된 필수입력사항은 모두 입력하셔야 합니다.");
			b_requiredInfo = false;
			return false; // break; 라는 뜻이다.
		}
	});
	if(!b_requiredInfo) {
		return; //goRegister() 함수를 종료
	};
	// 회원가입 항목의 입력받는 항목에 모든 값을 입력했는지 확인하기 종료 -----
	
	
	// *** "아이디중복확인" 을 클릭했는지 검사
	if(!b_idcheck_click) {
		alert("아이디중복확인을 클릭하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	}
	
	
	// *** "이메일중복확인" 을 클릭했는지 확인 *** //
	if(!b_emailcheck_click) { // 이 값이 false라면 클릭하지 않았다는 것임!
		alert("이메일중복확인을 클릭하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	}
	
	
	// 우편번호찾기 버튼을 클릭했는지 검사
	if(!b_zipcodeSearch_click) {
		alert("우편번호 찾기를 클릭하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	} else {
		// 우편번호찾기를 클릭했지만 주소가 제대로 입력되지 않은 경우
		if($("input#postcode").val().trim() == "" ||
		   $("input#address").val().trim() == "" ||
	   	   $("input#detailAddress").val().trim() == "") {
			alert("우편번호 및 주소를 입력하셔야 합니다.");
			return;  // goRegister() 함수를 종료한다.
		}
	}
	
	
	// 성별을 선택했는지 검사
	const radio_checked_length = $("input:radio[name='gender']:checked").length;
	if(radio_checked_length == 0) {
		alert("성별을 선택하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	}
	
	
	// 생년월일에 값을 입력했는지 검사
	const birthday = $("input#datepicker").val().trim();
	if(birthday == "") {
		alert("생년월일을 입력하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	}
	
	
	// 이용약관에 동의했는지 검사
	const checkbox_checked_length = $('input:checkbox[id="agree"]:checked').length;
	if(checkbox_checked_length == 0) {
		alert("이용약관에 동의하셔야 합니다.");
		return;  // goRegister() 함수를 종료한다.
	}
	
	
	const frm = document.registerFrm
	frm.action = "memberRegister.up";
	frm.method = "post";
	frm.submit();
}//end of function goRegister()----- 


function goReset() {
	$("span.error").hide();
	$("span#idcheckResult").empty();
	$("span#emailCheckResult").empty();
}//end of function goReset()-----