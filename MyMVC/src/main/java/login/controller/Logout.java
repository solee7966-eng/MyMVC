package login.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class Logout extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		
		//첫 번째 방법: 세션을 존재하게 두고, 세션에 저장된 어떤 값(현재는 로그인 한 회원객체)을 삭제하기
		//session.removeAttribute("loginUser");
		
		//두 번째 방법: WAS 메모리 상 세션에 저장된 모든 데이터를 삭제하는 방법
		session.invalidate();
		
		super.setRedirect(true);
		super.setViewpage(request.getContextPath()+"/index.up");
	}//end of execute()-----

}
