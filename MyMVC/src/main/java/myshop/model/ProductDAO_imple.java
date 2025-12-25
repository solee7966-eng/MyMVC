package myshop.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import myshop.domain.ProductDTO;

public class ProductDAO_imple implements ProductDAO {
	private DataSource ds;
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	public ProductDAO_imple() {
		try {
			Context initContext = new InitialContext();
			Context 	envContext = (Context)initContext.lookup("java:/comp/env");
			ds = (DataSource)envContext.lookup("jdbc/myoracle");
		} catch (NamingException e) {e.printStackTrace();}
	}
	
	// 사용한 자원을 반납하는 close() 메소드 생성하기
	private void close() {
		try {
			if(rs    != null) {rs.close();     rs=null;}
		    if(pstmt != null) {pstmt.close(); pstmt=null;}
		    if(conn  != null) {conn.close();  conn=null;} // DBCP는 자원반납을 해주어야지만 다른 사용자가 사용할 수 있음
		} catch(SQLException e) {e.printStackTrace();}
	}// end of private void close()---------------
	
	
	//메인페이지에 보여지는 상품이미지파일명을 모두 조회(select)하는 메소드
	@Override
	public List<ProductDTO> prodectSelectAll() throws SQLException {
		List <ProductDTO> ProList = new ArrayList<ProductDTO>();
		
		try {
			conn = ds.getConnection();
			String sql = " select imgno, imgname, imgfilename "
					+" from tbl_main_page "
					+" order by imgno asc ";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				ProductDTO pdDto = new ProductDTO();
				pdDto.setImgno(rs.getInt("imgno"));
				pdDto.setImgname(rs.getString("imgname"));
				pdDto.setImgfilename(rs.getString("imgfilename"));
				
				ProList.add(pdDto);
			}
		} finally {close();}
		
		return ProList;
	}//end of public List<ProductDTO> prodectSelectAll() throws SQLException-----

}
