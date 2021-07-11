package flow.mvc.controller.member;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import flow.mvc.dao.MemberDaoInter;
import flow.mvc.vo.MemberVO;

@Controller
public class MemberController {
	@Autowired
	private MemberDaoInter memberDaoInter;

	@RequestMapping("/login")
	public String loginPage(Model m) throws FileNotFoundException, IOException {
		System.out.println("MemberController  - login 진입");
		return "member/login/login";
	}
	
	// session에서 ID 불러오게 만들어야함
	@RequestMapping("/selectUserInfoView")
	public ModelAndView userInfo() {
		System.out.println("회원정보수정 진입");
		ModelAndView mav = new ModelAndView();
		MemberVO vo = new MemberVO();
		String userID = "admin";
		vo = memberDaoInter.detailMem(userID);
		System.out.println(vo.getM_ID());
		System.out.println(vo.getM_NAME());
		//m.addAttribute("vo",vo);
		mav.addObject("vo",vo);
		mav.setViewName("mng/selectUserInfoView");
		return mav;
	}
}
