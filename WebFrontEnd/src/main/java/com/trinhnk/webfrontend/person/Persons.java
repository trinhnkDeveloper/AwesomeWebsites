package com.trinhnk.webfrontend.person;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author trinhnk
 */
public class Persons {

    private static Map<String, List<Person>> mapPersons = new LinkedHashMap<>();

    /**
     * Load danh sach Persons tu mot file
     *
     * @param fileName
     */
    public static void createPersons(String fileName) {
        try {

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(new FileInputStream(fileName));
            Iterator<String> fields = rootNode.fieldNames();
            while (fields.hasNext()) {
                String field = fields.next();
                List<Person> listPersons = new ArrayList<>();
                JsonNode node = rootNode.get(field);
                for (int i = 0; i < node.size(); i++) {
                    Person person = mapper.readValue(node.get(i).toString(), Person.class);
                    listPersons.add(person);
                }
                mapPersons.put(field, listPersons);
            }

        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * tra ve mot map co key la lop cua nguoi hoc sinh va value la list hocsinh
     * do.
     *
     * @return
     */
    public static Map<String, List<Person>> getMapPersons() {
        return mapPersons;
    }

}
