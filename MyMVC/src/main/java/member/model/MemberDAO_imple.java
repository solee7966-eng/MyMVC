package member.model;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import member.domain.MemberDTO;
import util.security.AES256;
import util.security.SecretMyKey;
import util.security.Sha256;

public class MemberDAO_imple implements MemberDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private AES256 aes;
	
	public MemberDAO_imple() {
		try {
			Context initContext = new InitialContext();
			Context 	envContext = (Context)initContext.lookup("java:/comp/env");
			ds = (DataSource)envContext.lookup("jdbc/myoracle");
			aes = new AES256(SecretMyKey.KEY);
		} 
		catch (NamingException e) {e.printStackTrace();} 
		catch (UnsupportedEncodingException e) {e.printStackTrace();}
	}
	
	// 사용한 자원을 반납하는 close() 메소드 생성하기
	private void close() {
		try {
			if(rs    != null) {rs.close();     rs=null;}
		    if(pstmt != null) {pstmt.close(); pstmt=null;}
		    if(conn  != null) {conn.close();  conn=null;} // DBCP는 자원반납을 해주어야지만 다른 사용자가 사용할 수 있음
		} catch(SQLException e) {e.printStackTrace();}
	}// end of private void close()---------------
	
	
	// 회원가입을 해주는 메서드
	@Override
	public int registerMember(MemberDTO member) throws SQLException {
		int result = 0;
		
		try {
			conn = ds.getConnection();
			String sql = " insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) "  
		  		     + " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, member.getUserid());
			pstmt.setString(2, Sha256.encrypt(member.getPwd()));
			pstmt.setString(3, member.getName());
			pstmt.setString(4, aes.encrypt(member.getEmail()));
			pstmt.setString(5, aes.encrypt(member.getMobile()));
			pstmt.setString(6, member.getPostcode());
			pstmt.setString(7, member.getAddress());
			pstmt.setString(8, member.getDetailaddress());
			pstmt.setString(9, member.getExtraaddress());
			pstmt.setString(10, member.getGender());
			pstmt.setString(11, member.getBirthday());
			
			result = pstmt.executeUpdate();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		} finally {close();}
		
		return result;
	}//end of public int registerMember(MemberDTO member) throws SQLException-----

	
	// 입력받은 아이디가 DB에 존재하는지 조회하는 메서드(ID 중복검사)
	@Override
	public boolean idDuplicateCheck(String userid) throws SQLException {
		boolean isExists = true;
		try {
			conn = ds.getConnection();
			String sql = " select userid "
						+" from tbl_member "
						+" where userid = ? ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userid);
			rs = pstmt.executeQuery();
			
			isExists = rs.next();
		} finally {close();}
		
		return isExists;
	}//end of public boolean idDuplicateCheck(String userid) throws SQLException-----

	
	// 입력받은 이메일이 DB에 존재하는지 조회하는 메서드(Email 중복검사)
	@Override
	public boolean emailDuplicateCheck(String email) throws SQLException {
		boolean isExists = true;
		try {
			conn = ds.getConnection();
			String sql = " select email "
						+" from tbl_member "
						+" where email = ? ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, aes.encrypt(email));
			rs = pstmt.executeQuery();
			
			//System.out.println("암호화된 이메일: " +aes.encrypt(email));
			
			isExists = rs.next();
		} catch (UnsupportedEncodingException | GeneralSecurityException e) {
			e.printStackTrace();
		} finally {close();}
		
		return isExists;
	}//end of public boolean emailDuplicateCheck(String email) throws SQLException-----

	
	// 입력받은 아이디, 비밀번호에 해당하는 회원정보 조회하기 메서드
	@Override
	public MemberDTO login(Map<String, String> paraMap) throws SQLException {
		MemberDTO member = null;
		
		try {
			conn = ds.getConnection();
			String sql = " WITH "
						+" M AS ( "
						+"  SELECT userid, name, coin, point, "
						+"      trunc( months_between(sysdate, lastpwdchangedate) ) AS pwdchangegap, "
						+"      to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') as registerday, idle, email, mobile, postcode, address, detailaddress, extraaddress "
						+"  FROM tbl_member "
						+"  WHERE status = 1 AND userid = ? and pwd = ? "
						+" ) "
						+" , H AS ( "
						+"  select trunc( months_between(sysdate, MAX(LOGINDATE)) ) AS LAST_LOGINDATE_GAP "
						+"  FROM tbl_loginhistory "
						+"  where fk_userid = ? "
						+" ) "
						+" SELECT userid, name, coin, point, pwdchangegap, registerday, idle, email, mobile "
						+"       ,postcode, address, detailaddress, extraaddress, LAST_LOGINDATE_GAP "
						+" FROM M CROSS JOIN H ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, paraMap.get("userid"));
			pstmt.setString(2, Sha256.encrypt(paraMap.get("pwd")));
			pstmt.setString(3, paraMap.get("userid"));
			
			rs = pstmt.executeQuery();
			if(rs.next()) {
				member = new MemberDTO();
				member.setUserid(rs.getString("userid"));
				member.setName(rs.getString("name"));
				member.setCoin(rs.getInt("coin"));
				member.setPoint(rs.getInt("point"));
				
				// 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지났으면 true
                // 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지나지 않았으면 false
				if(rs.getInt("pwdchangegap") >= 3) {
					System.out.println("pwdchangegap" + rs.getInt("pwdchangegap"));
					member.setRequirePwdChange(true);
				}
				
				member.setRegisterday(rs.getString("registerday"));
				member.setIdle(rs.getInt("idle"));
				member.setEmail(aes.decrypt(rs.getString("email"))); // 이메일은 암호화된 것으로 DB에 저장됐으므로 복호화하여 가져온다.
				member.setMobile(aes.decrypt(rs.getString("mobile"))); // 이메일 또한 복호화하여 DB에서 가져온다.
				member.setPostcode(rs.getString("postcode"));
				member.setAddress(rs.getString("address"));
				member.setDetailaddress(rs.getString("detailaddress"));
				member.setExtraaddress(rs.getString("extraaddress"));
				
				//휴면 회원이 아니면서, 마지막 로그인 일자가 12개월 이전인 경우
				if(member.getIdle()==0 && rs.getInt("LAST_LOGINDATE_GAP")<12) {
					//로그인 테이블에 로그인기록을 삽입하기
					sql = " insert into tbl_loginhistory(historyno, fk_userid, clientip)"
						 +"	values(seq_historyno.nextval, ?, ?) ";
					pstmt = conn.prepareStatement(sql);
					pstmt.setString(1, paraMap.get("userid"));
					pstmt.setString(2, paraMap.get("clientip"));
					pstmt.executeUpdate();
				} else {
					member.setIdle(1); //휴면회원 값을 1로 바꿔주기
					
					if(rs.getInt("idle") == 1) {
						//휴면회원이고, 마지막 로그인 일자가 12개월 이상인 경우에서 
						sql = " update tbl_member set idle = 1 "
							 +"	where userid = ? ";
						pstmt = conn.prepareStatement(sql);
						pstmt.setString(1, paraMap.get("userid"));
						pstmt.executeUpdate();
					}
				}
			}//end of if(rs.next())-----
		} 
		catch (UnsupportedEncodingException | GeneralSecurityException e) {e.printStackTrace();} 
		finally {close();}
		
		return member;
	}//end of public MemberDTO login(Map<String, String> paraMap) throws SQLException00000

	
	
	
	
	
	
}
