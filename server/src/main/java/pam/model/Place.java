package pam.model;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.geo.Point;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Vector;

@Entity
public class Place {
    public static final int MAX_NAME_LENGTH = 32;
    public static final int MIN_NAME_LENGTH = 4;

    public static final int MAX_DESCRIPTION_LENGTH = 255;

    public static final String DEFAULT_IMAGE = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";

    public static final String DEFAULT_CATEGORY = CategoryEnum.OTHER.toString();

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

    @Column(length = MAX_DESCRIPTION_LENGTH)
    @Size(min = 0, max = MAX_DESCRIPTION_LENGTH)
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

    public Collection<User> getFavorites() {
        return favorites;
    }

    public void setFavorites(Collection<User> favorites) {
        this.favorites = favorites;
    }

    public Collection<List> getLists() {
        return lists;
    }

    public void setLists(Collection<List> lists) {
        this.lists = lists;
    }
}
