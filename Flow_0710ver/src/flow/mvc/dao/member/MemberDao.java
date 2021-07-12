package flow.mvc.dao.member;



import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import flow.mvc.vo.MemberVO;

@Repository
public class MemberDao implements MemberDaoInter {

	@Autowired
	private SqlSessionTemplate ss;
	
	@Override
	public MemberVO loginCheck (MemberVO mvo) {
		System.out.println("MemberDao : loginCheck");
		System.out.println(mvo.getM_id());
		System.out.println(mvo.getM_pwd());
 
		
		return ss.selectOne("member.loginChk", mvo);
		 
	}
	
	
}
