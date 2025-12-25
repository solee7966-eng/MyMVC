package common.controller;

public abstract class AbstractController implements InterCommand {
	// 페이지 이동 방법을 설정하는 필드
	// isRedirect가 false 라면 forword 방식: view단 페이지(.jsp) 파일로 이동,
	// isRedirect가 true 라면 sendRedirect 방식: url 경로를 이용한 이동
	private boolean isRedirect = true;
	
	// 이동할 경로 혹은 페이지 필드
	private String viewpage;

	public boolean isRedirect() {
		return isRedirect;
	}

	public void setRedirect(boolean isRedirect) {
		this.isRedirect = isRedirect;
	}

	public String getViewpage() {
		return viewpage;
	}

	public void setViewpage(String viewpage) {
		this.viewpage = viewpage;
	}
}
