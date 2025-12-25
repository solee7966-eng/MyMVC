package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.domain.MemberDTO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberRegister extends AbstractController {
	private MemberDAO mbDao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
		
		if("GET".equalsIgnoreCase(method)) {
			//GET으로 들어오면 원래 페이지로 돌려보낸다.
			super.setRedirect(false);
			super.setViewpage("/WEB-INF/member/memberRegister.jsp");
		} else {
			String name = request.getParameter("name");
			String userid = request.getParameter("userid");
			String pwd = request.getParameter("pwd");
			String email = request.getParameter("email");
			String hp1 = request.getParameter("hp1");
			String hp2 = request.getParameter("hp2");
			String hp3 = request.getParameter("hp3");
			String postcode = request.getParameter("postcode");
			String address = request.getParameter("address");
			String detailaddress = request.getParameter("detailaddress");
			String extraaddress = request.getParameter("extraaddress");
			String gender = request.getParameter("gender");
			String birthday = request.getParameter("birthday");
			
			String mobile = hp1+hp2+hp3;
			
			MemberDTO member = new MemberDTO();
			member.setUserid(userid);
			member.setPwd(pwd);
			member.setName(name);
			member.setEmail(email);
			member.setMobile(mobile);
			member.setPostcode(postcode);
			member.setAddress(address);
			member.setDetailaddress(detailaddress);
			member.setExtraaddress(extraaddress);
			member.setGender(gender);
			member.setBirthday(birthday);
			
			// 회원가입 성공 또는 실패 메시지
			String message = "";
			// 회원가입 성공/실패에 따른 페이지 경로
			String loc = "";
			
			try {
				int n = mbDao.registerMember(member);
				if(n == 1) {
					message = "회원가입 성공!";
					loc = request.getContextPath() + "/index.up"; //시작페이지로 돌아가기
				}
			} catch (Exception e) {
				e.printStackTrace();
				message = "회원가입 실패..";
				// 자바스크립트를 이용한 이전페이지로 이동하기
				loc = "javascript:history.back()";
			}
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
			
			super.setRedirect(false);
			super.setViewpage("/WEB-INF/msg.jsp");
		}//end of if()-----

	}//end of execute()-----

}
