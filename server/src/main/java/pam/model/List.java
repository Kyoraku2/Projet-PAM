package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Vector;

@Entity
public class List {
    public static final int MAX_NAME_LENGTH = 32;
    public static final int MIN_NAME_LENGTH = 4;

    public static final int MAX_DESCRIPTION_LENGTH = 255;

    public static final String DEFAULT_DESCRIPTION = "No description";

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User owner;

    @NotBlank(message = "Name may not be empty")
    @Column(length = MAX_NAME_LENGTH)
    @Size(min = MIN_NAME_LENGTH, max = MAX_NAME_LENGTH)
    private String name;

    @Column(length = 255)
    @Size(min = 0, max = MAX_DESCRIPTION_LENGTH)
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
        this.description = DEFAULT_DESCRIPTION;
        this.image = null;
    }

    public List(User owner, String name, String description, String image, boolean isShared) {
        this(owner, name);
        if(description != null){
            this.description = description;
        }else{
            this.description = DEFAULT_DESCRIPTION;
        }
        this.image = image;
        this.isShared = isShared;
    }

    public List(User owner, String name, String description, boolean isShared) {
        this(owner, name, description, null, isShared);
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

    public String toString(){
        return "List: " + this.name + " " + this.description + " " + this.image + " " + this.isShared + " " + this.owner + " " + this.places + " " + this.id;
    }
}
