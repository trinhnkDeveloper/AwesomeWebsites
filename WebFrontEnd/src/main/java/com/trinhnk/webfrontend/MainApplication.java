package com.trinhnk.webfrontend;

import com.trinhnk.webfrontend.person.Persons;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 *
 * @author trinhnk
 */
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args){
        Persons.createPersons("C:\\Users\\trinhnk\\WebFrontEnd\\src\\main\\resources\\jsonfile\\persons.json");
        SpringApplication.run(MainApplication.class, args);
    }
}
