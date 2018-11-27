package com.trinhnk.webfrontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author trinhnk
 */
@Controller
public class Home {
    @RequestMapping("/home")
    public String home(){
        return "view/index.html";
    }
}
