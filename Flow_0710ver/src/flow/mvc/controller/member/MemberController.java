package flow.mvc.controller.member;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MemberController {

	@RequestMapping("/login")
	public String loginPage(Model m) throws FileNotFoundException, IOException {
		System.out.println("MemberController  - login 진입");
		return "member/login/login";
	}
	
	@RequestMapping("/signup")
	public String signupPage(Model m) throws FileNotFoundException, IOException {
		System.out.println("MemberController  - signup 진입");
		return "member/signup/signup";
	}
}
