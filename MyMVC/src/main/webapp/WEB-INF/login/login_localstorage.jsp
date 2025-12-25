<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>    

<%
    String ctx_Path = request.getContextPath(); //    /MyMVC
    //앞선 header1과 request.getContextPath(); 를 담는 변수명을 다르게 해야
    //서로 경로가 곂치지 않고 잘 작동함!!
    //무언가 경로를 설정할 때 라이브러리는 한 번만 호출하도록 한다!! 그렇지 않으면 삑난다
%>
<link rel="stylesheet" type="text/css" href="<%= ctx_Path%>/css/login/login.css">

<!-- 직접 만든 JS -->
<script type="text/javascript" src="<%= ctx_Path%>/js/login/login.js"></script>
	
<script type="text/javascript">
	$(function() {
		if(${empty sessionScope.loginUser}) {
			const loginUserid = localStorage.getItem("saveid");
			if(loginUserid != null) {
				$("input#loginUserid").val("loginUserid");
				$("input:checkbox[id='saveid']").prop("checked", true);
			}
		}
		
		
	});
</script>


<%------------ 로그인을 하기 위한 form 태그 생성하기 시작, [로그인 하기 전 form 태그]------------%>
<%-- sessionScope. => session 저장소! 이것은 생략할 수 없고 반드시 명시해주어야 함! --%>
<%-- <c:if test=" ${empty sessionScope.loginuser} "> 와 같이 test="" 에 test=" " 와 같이 공백을 넣어주면 꽝이다.!!! --%>
<c:if test="${empty sessionScope.loginUser}">
	<form name="loginFrm" action="<%= ctx_Path%>/login/login.up" method="post">
		<table id="loginTbl">
          <thead>
              <tr>
                 <th colspan="2">LOGIN</th>
              </tr>
          </thead>
          
          <tbody> 
          	  <tr>
          	     <td>ID</td>
          	     <td><input type="text" name="userid" id="loginUserid" size="20" autocomplete="off" /></td>
          	  </tr>
          	  <tr>
                 <td>암호</td>
                 <td><input type="password" name="pwd" id="loginPwd" size="20" /></td>
              </tr>
              
              <tr> <%-- ==== 아이디 찾기, 비밀번호 찾기 ==== --%>
                  <td colspan="2">
                     <a style="cursor: pointer;" data-toggle="modal" data-target="#userIdfind" data-dismiss="modal">아이디찾기</a> / 
                     <a style="cursor: pointer;" data-toggle="modal" data-target="#passwdFind" data-dismiss="modal" data-backdrop="static">비밀번호찾기</a>
                  </td>
              </tr>
              
              <tr> <%-- ==== 아이디 저장 체크박스 ==== --%>
                  <td colspan="2">
                  	 <%-- "아이디저장" 체크박스에 로컬스토리지 값을 읽어올 때 자바 스크립트를 이용하는 경우 --%>
                     <input type="checkbox" id="saveid" name="saveid" />&nbsp;<label for="saveid">아이디저장</label>
                     <button type="button" id="btnSubmit" class="btn btn-primary btn-sm ml-3">로그인</button> 
                  </td>
              </tr>
          </tbody>
        </table>
	</form>


<%-- ****** 아이디 찾기 Modal 시작 ****** --%>
<%-- <div class="modal fade" id="userIdfind"> --%> 
<%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%> 
  <div class="modal fade" id="userIdfind" data-backdrop="static"> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%>  
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal header -->
        <div class="modal-header">
          <h4 class="modal-title">아이디 찾기</h4>
          <button type="button" class="close idFindClose" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <div id="idFind">
             <%-- <iframe id="iframe_idFind" style="border: none; width: 100%; height: 350px;" src="<%= ctx_Path%>/login/idFind.up"> 
             </iframe> --%>
          </div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger idFindClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
<%-- ****** 아이디 찾기 Modal 끝 ****** --%>


<%-- ****** 비밀번호 찾기 Modal 시작 ****** --%>
  <div class="modal fade" id="passwdFind"> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%>
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal header -->
        <div class="modal-header">
          <h4 class="modal-title">비밀번호 찾기</h4>
          <button type="button" class="close passwdFindClose" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <div id="pwFind">
             <%-- <iframe style="border: none; width: 100%; height: 350px;" src="<%= ctx_Path%>/login/pwdFind.up">  
             </iframe> --%>
          </div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger passwdFindClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div> 
<%-- ****** 비밀번호 찾기 Modal 끝 ****** --%>
</c:if>



<%------------ 로그인을 한 이후에 보여주는 form 태그 생성하기 시작 ------------%>
<c:if test="${not empty sessionScope.loginUser}">
	<table style="width: 95%; height: 130px; margin: 0 auto;">
       <tr style="background-color: #f2f2f2;">
           <td style="text-align: center; padding: 20px;">
               <span style="color: blue; font-weight: bold;">${sessionScope.loginUser.name}</span> 
               [<span style="color: red; font-weight: bold;">${sessionScope.loginUser.userid}</span>]님
               <br><br>
               <div style="text-align: left; line-height: 150%; padding-left: 20px;">
                  <span style="font-weight: bold;">코인액&nbsp;:</span>
                  &nbsp;&nbsp;<fmt:formatNumber value="${sessionScope.loginUser.coin}" pattern="###,###"/>&nbsp;원
                  <br>
                  <span style="font-weight: bold;">포인트&nbsp;:</span>
                  &nbsp;&nbsp;<fmt:formatNumber value="${sessionScope.loginUser.point}" pattern="###,###"/>&nbsp;POINT  
               </div>
               <br>로그인 중...<br><br>
               [<a href="">내정보수정하기</a>]&nbsp;&nbsp;
               [<a href="">코인충전</a>] 
               <br><br>
               						<%-- contextPath는 변경될 수 있으므로 js에서 정의하는 것보단 jsp 파일에서 받아오는 것이 낫다! --%>
               <button type="button" class="btn btn-danger btn-sm" onclick="goLogOut('<%=ctx_Path%>')">로그아웃</button>
           </td>
       </tr>
   </table> 
</c:if>


