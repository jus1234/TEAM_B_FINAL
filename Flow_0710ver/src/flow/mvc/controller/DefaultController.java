package flow.mvc.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Member;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import flow.mvc.dao.MemberDaoInter;
import flow.mvc.dao.MemberDao;
import flow.mvc.vo.MemberVO;

@Controller
public class DefaultController {
	
	
	@RequestMapping(value = { "/", "/index" })
	public String defaultMain(Model m) throws FileNotFoundException, IOException {
		System.out.println("defaultMain ¡¯¿‘");
		return "index/index";
	}

}
