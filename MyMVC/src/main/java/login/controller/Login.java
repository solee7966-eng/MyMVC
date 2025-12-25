package login.controller;

import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberDTO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class Login extends AbstractController {
	private MemberDAO mbDao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
		if("GET".equalsIgnoreCase(method)) {
			//GET 방식으로 들어온 경우
			String message = "비정상적 접근입니다!";
			String loc = "javascript:history.back()"; //이전페이지로 돌아가기
			
			request.setAttribute("message", message);
			request.setAttribute("log", loc);
			
			super.setRedirect(false);
			super.setViewpage("WEP-INF/msg.jsp");
			return;
		}
		String userid = request.getParameter("userid");
		String pwd = request.getParameter("pwd");
		
		//"아이디저장"을 쿠키를 사용해 처리하기 시작//
		String saveid = request.getParameter("saveid");
		//System.out.println("saveid: " +saveid);
		//"아이디저장"을 쿠키를 사용해 처리하기 끝//
		
		//클라이언트 IP 주소를 알아오는 것//
		String clientip = request.getRemoteAddr(); //내 서버로 들어온 IP를 알아오는 명령어
		//JSP 파일 실행시켰을 때 IP 주소
		
		//System.out.println("확인용 userid: " + userid);  //=> 확인용 userid: solee7966
		//System.out.println("확인용 pwd: " + pwd);   //=> 확인용 pwd: qwer1234!
		//System.out.println("확인용 clientip: " + clientip);  //=> 확인용 clientIp: 127.0.0.1 (내 IP 주소)
		
		Map<String, String> paraMap = new HashMap<>();
		paraMap.put("userid", userid);
		paraMap.put("pwd", pwd);
		paraMap.put("clientip", clientip);
	/*
	 	세션이라는 저장소에 로그인된 loginUser 를 저장시켜두어야 한다.
	 	세션이란? WAS 컴퓨터의 메모리 일부분을 사용하는 것으로 접속한 클라이언트 컴퓨터에서 보내온 정보를 저장하는 용도로 사용
	 	클라이언트 컴퓨터가 WAS 컴퓨터에 웹으로 접속하면 자동으로 WAS 컴퓨터의 메모리 일부분에 세션이 생성된다.
	 	세션은 클라이언트 컴퓨터 웹브라우저당 1개씩 생성된다.
	 	예를 들어 클라이언트 컴퓨터가 크롬웹브라우저로 WAS에 웹으로 연결하면 세션이 하나 생성되고,
	 	이어서 동일 클라이언트 컴퓨터가 엣지웹브라우저로 WAS에 웹으로 연결하면 또 하나의 새로운 세션이 생성된다.
	 	
	 	   -------------
           | 클라이언트    |            ---------------------
           | A 웹브라우저  | -----------|   WAS 서버         |
           -------------             |                   |
                                     |  RAM (A session)  |
           --------------            |      (B session)  | 
           | 클라이언트     |           |                   |
           | B 웹브라우저   | ----------|                   |
           ---------------           --------------------
           
         세션이라는 저장 영역에 loginUser를 저장시켜두면 Command.properties 파일에 기술된
          모든 클래스 및 모든 JSP 페이지에서 세션에 저장된 loginUser 정보를 사용할 수 있게 됨
         따라서 어떤 정보를 여러 클래스 또는 여러 JSP 페이지에서 공통적으로 사용한다면 세션에 저장하면 됨
	 */
		
		MemberDTO loginUser = mbDao.login(paraMap);
		if(loginUser != null) {
			// WAS 메모리에 저장되어 있는 세션을 불러오기 //
			//세션은 직접 설정하는 것이 아닌, 연결되기만 하면 알아서 생성된다!
			HttpSession session = request.getSession();
			
			//session에 로그인된 사용자 정보인 loginUser 데이터를 키값 "loginUser"로 저장시켜 두기
			session.setAttribute("loginUser", loginUser);
			
			
			//마지막으로 로그인 한 시점이 1년 이상 지난 경우(즉, 휴면회원인 경우)
			if(loginUser.getIdle() == 1) {
				String message = "로그인을 한지 1년이 지나서 휴면상태로 되었습니다.\\n휴면을 풀어주는 페이지로 이동합니다!!";
				String loc = request.getContextPath()+"/index.up";
				//원래는 위와같이 index.up 이 아니라 휴면인 계정을 풀어주는 페이지로 URL을 잡아주어야 한다.!!
				
				request.setAttribute("message", message);
				request.setAttribute("loc", loc);
				super.setRedirect(false);
				super.setViewpage("/WEB-INF/msg.jsp");
				return;
			}
			
			
			//비밀번호를 변경한 지 3개월 이상이 된 경우(즉, 비밀번호를 변경해야 하는 경우)//
			if(loginUser.isRequirePwdChange()) {
				String message = "비밀번호를 변경하신지 3개월이 지났습니다.\\n암호 변경 페이지로 이동합니다.";
				String loc = request.getContextPath()+"/index.up";
				//원래는 위와같이 index.up 이 아니라 휴면인 계정을 풀어주는 페이지로 URL을 잡아주어야 한다.!!
				
				request.setAttribute("message", message);
				request.setAttribute("loc", loc);
				super.setRedirect(false);
				super.setViewpage("/WEB-INF/msg.jsp");
				return;
			}
			
			//~~~아이디저장을 쿠키를 사용해 처리하기 위한 것 시작~~~//
			if(saveid != null) {
				//아이디저장 체크박스를 체크했을 때 실행
				Cookie cookie = new Cookie("saveid", userid);
				cookie.setMaxAge(24*60*60); //쿠키 수명을 하루로 설정
				cookie.setPath("/"); //쿠키가 브라우저에서 전송될 URL 경로 범위를 지정
				response.addCookie(cookie); //접속한 클라이언트 PC의 웹브라우저로 쿠키를 전송
//			 	경로를 "/" 로 설정한 경우
//			  => /, /login, /user/profile, /admin 등 모든 서브경로에 대해 이 쿠키가 브라우저에서 자동으로 전송
//			  
//			  	경로는 "/login" 으로 설정한 경우
//			  => /login, /login/check, /login/form 등 /login으로 시작하는 경로에서만 쿠기가 전송
			} else {
				//아이디저장 체크박스에 체크게 해제된 경우
				Cookie cookie = new Cookie("saveid", null);
				cookie.setMaxAge(0); //쿠기수명을 즉시만료
				cookie.setPath("/");
				response.addCookie(cookie);
			}
			//~~~아이디저장을 쿠키를 사용해 처리하기 위한 것 끝~~~//
			
			super.setRedirect(true);
			super.setViewpage(request.getContextPath()+"/index.up");
		} else {
			String message = "로그인 실패!";
			String loc = "javascript:history.back()";
			
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
			super.setRedirect(false);
			super.setViewpage("/WEB-INF/msg.jsp");
		}
	}//end of execute()-----
}
