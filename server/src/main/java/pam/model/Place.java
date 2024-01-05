package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Vector;

@Entity
public class Place {
    public static final int MAX_NAME_LENGTH = 32;
    public static final int MIN_NAME_LENGTH = 4;

    public static final int MAX_DESCRIPTION_LENGTH = 255;

    public static final CategoryEnum DEFAULT_CATEGORY = CategoryEnum.OTHER;

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

    private double latitude;

    private double longitude;

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

    public Place(User owner, String name, double latitude, double longitude) {
        this.owner = owner;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Place(User owner, String name, String description, String image, double latitude, double longitude, CategoryEnum category) {
        this(owner, name, latitude, longitude);
        this.description = description;
        this.image = image;
        if(category != null){
            this.category = category;
        }else{
            this.category = DEFAULT_CATEGORY;
        }
    }

    public Place(User owner, String name, String description, double latitude, double longitude, CategoryEnum category) {
        this(owner, name, description, null, latitude, longitude, category);
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

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }
}
