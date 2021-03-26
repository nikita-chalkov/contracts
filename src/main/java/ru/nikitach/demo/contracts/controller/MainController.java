package ru.nikitach.demo.contracts.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Slf4j
@Controller
public class MainController {
    @RequestMapping(value = {"/"},method = RequestMethod.GET)
    public String welcome() {
        return "index";
    }
}
