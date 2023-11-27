package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Set;
import java.util.Vector;

@Entity
public class List {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User owner;

    @NotBlank(message = "Name may not be empty")
    @Column(length = 32)
    @Size(min = 4, max = 32)
    private String name;

    @Column(length = 255)
    @Size(min = 0, max = 255)
    private String description;

    private String image;

    @ManyToMany(mappedBy = "lists")
    private Collection<Place> places=new Vector<Place>();


    public List() {
    }



    public List(User owner, String name) {
        this.owner = owner;
        this.name = name;
        this.isShared = false;
    }

    public List(User owner, String name, String description, String image, boolean isShared) {
        this(owner, name);
        this.description = description;
        this.image = image;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isShared() {
        return isShared;
    }

    public void setShared(boolean shared) {
        isShared = shared;
    }

    private boolean isShared;

    public Long getId() {
        return id;
    }

    public Collection<Place> getPlaces() {
        return places;
    }

    public void setPlaces(Collection<Place> places) {
        this.places = places;
    }
}