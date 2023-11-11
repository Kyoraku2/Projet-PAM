package pam.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ExampleEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    public ExampleEntity() {
    }

    public ExampleEntity(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name= name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
