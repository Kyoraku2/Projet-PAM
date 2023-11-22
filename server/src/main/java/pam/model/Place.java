package pam.model;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.geo.Point;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Vector;

@Entity
public class Place {

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

    @Column(name = "coordinates", columnDefinition = "POINT")
    private Point coordinates;

    @Enumerated(EnumType.STRING)
    private CategoryEnum category;

    @ManyToMany
    @JoinTable(
        name= "place_list",
        joinColumns = @JoinColumn(name = "place_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name = "list_id", referencedColumnName="id")
    )
    private Collection<List> lists=new Vector<List>();

    @ManyToMany(mappedBy = "favorites")
    private Collection<User> favorites=new Vector<User>();


    public Place() {
    }

    public Place(User owner, String name, Point coordinates) {
        this.owner = owner;
        this.name = name;

        this.coordinates = coordinates;
    }

    public Place(User owner, String name, String description, String image, Point coordinates, CategoryEnum category) {
        this(owner, name, coordinates);
        this.description = description;
        this.image = image;
        this.category = category;
    }

    public User getOwner() {
        return owner;
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

    public Point getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Point coordinates) {
        this.coordinates = coordinates;
    }

    public CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(CategoryEnum category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }
}
