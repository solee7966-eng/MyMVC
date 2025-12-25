package member.model;

import java.sql.SQLException;
import java.util.Map;

import member.domain.MemberDTO;

public interface MemberDAO {
	// 회원가입을 해주는 추상메서드
	int registerMember(MemberDTO member) throws SQLException;

	// 입력받은 아이디가 DB에 존재하는지 조회하는 추상메서드(ID 중복검사)
	boolean idDuplicateCheck(String userid) throws SQLException;

	// 입력받은 이메일이 DB에 존재하는지 조회하는 추상메서드(Email 중복검사)
	boolean emailDuplicateCheck(String email) throws SQLException;

	// 입력받은 아이디, 비밀번호에 해당하는 회원정보 조회하기
	MemberDTO login(Map<String, String> paraMap) throws SQLException;

}
