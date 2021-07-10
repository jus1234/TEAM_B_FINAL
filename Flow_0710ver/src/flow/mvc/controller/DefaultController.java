package flow.mvc.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

	@RequestMapping(value = { "/", "/index" })
	public String defaultMain(Model m) throws FileNotFoundException, IOException {
		System.out.println("defaultMain ¡¯¿‘");
		return "index/index";
	}
}
