package member.controller;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class IdDuplicateCheck extends AbstractController {
	private MemberDAO mbDao = new MemberDAO_imple(); 
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
		//System.out.println("idDuplicateCheck");
		
		if("POST".equalsIgnoreCase(method)) {
			String userid = request.getParameter("userid");
			boolean isExists = mbDao.idDuplicateCheck(userid);
			//System.out.println("확인 isExists: " +isExists);
			
			JSONObject jsonObj = new JSONObject(); // 생성된 빈 객체 {}
			jsonObj.put("isExists", isExists); // 생성된 객체 {"isExists":true} 또는 {"isExists":false}
			
			String json = jsonObj.toString(); // "{'isExists':true}" 또는 "{'isExists':false}" 의 문자열로 바꿔주기
			
			request.setAttribute("json", json);
			super.setRedirect(false);
			super.setViewpage("/WEB-INF/jsonview.jsp");
		}
		
	}//end of execute()-----

}
