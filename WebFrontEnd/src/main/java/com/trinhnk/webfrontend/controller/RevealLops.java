package com.trinhnk.webfrontend.controller;

import com.trinhnk.webfrontend.person.Person;
import com.trinhnk.webfrontend.person.Persons;
import java.util.List;
import java.util.Set;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author trinhnk
 */
@RestController
public class RevealLops {

    @GetMapping("/lops")
    @ResponseBody
    public Set<String> getLops() {
        return Persons.getMapPersons().keySet();
    }

    @GetMapping("/persons")
    @ResponseBody
    public List<Person> getPersons(@RequestParam("tenLop") String tenLop) {
        List<Person> persons = Persons.getMapPersons().get(tenLop);
        return persons;
    }
}
