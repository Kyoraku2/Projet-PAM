package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Collection;
import java.util.Vector;

@Entity
public class User {
    public static final String DEFAULT_DESCRIPTION = "Hello everyone!";

    public static final int USERNAME_MIN_LENGTH = 4;
    public static final int USERNAME_MAX_LENGTH = 32;

    public static final int DESCRIPTION_MIN_LENGTH = 0;
    public static final int DESCRIPTION_MAX_LENGTH = 255;

    @Id
    @GeneratedValue
    private long id;

    @NotBlank(message = "Username may not be empty")
    @Column(unique=true, length = USERNAME_MAX_LENGTH)
    @Size(min = USERNAME_MIN_LENGTH, max = USERNAME_MAX_LENGTH)
    private String username;

    @NotBlank(message = "Password may not be empty")
    private String password;

    private String image;

    @Column(length = DESCRIPTION_MAX_LENGTH)
    @Size(min = DESCRIPTION_MIN_LENGTH, max = DESCRIPTION_MAX_LENGTH)
    private String description;

    @NotBlank(message = "Mail may not be empty")
    @Column(unique=true)
    private String email;

    private Date signInDate;

    private double latitude;
    private double longitude;

    @Enumerated(EnumType.STRING)
    private RoleEnum role;

    @ManyToMany
    @JoinTable(
        name= "favorites",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName="id")
    )
    private Collection<Place> favorites=new Vector<>();

    @ManyToMany
    @JoinTable(
            name= "contributors",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name = "list_id", referencedColumnName="id")
    )
    private Collection<List> contributors=new Vector<>();


    // Self referencing many to many relationship
    // Share my position with other users
    @ManyToMany
    @JoinTable(
            name = "shared_position",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id", referencedColumnName="id")
    )
    private Collection<User> sharedPositionWith=new Vector<>();

    // Self referencing many to many relationship
    // Share other users position with me
    @ManyToMany
    @JoinTable(
            name = "shared_position",
            joinColumns = @JoinColumn(name = "friend_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName="id")
    )
    private Collection<User> sharedPositionBy=new Vector<>();

    public User(){}

    public User(String username, String mail, String password) {
        super();
        this.username = username;
        this.email = mail;
        this.role = RoleEnum.USER;
        this.password = password;
        this.signInDate = new Date(System.currentTimeMillis());
        this.description = DEFAULT_DESCRIPTION;
        this.latitude = 0;
        this.longitude = 0;
    }

    public User(String username, String mail, String password, String image, String description) {
        this(username, mail, password);
        this.image = image;
        this.description = description;
    }

    public long getUserID() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getSignInDate() {
        return signInDate;
    }

    public Collection<Place> getFavorites() {
        return favorites;
    }

    public void setFavorites(Collection<Place> favorites) {
        this.favorites = favorites;
    }

    public RoleEnum getRole() {
        return role;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public void setSignInDate(Date signInDate) {
        this.signInDate = signInDate;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Collection<List> getContributedLists() {
        return contributors;
    }

    public void setContributedLists(Collection<List> contributors) {
        this.contributors = contributors;
    }

    public Collection<User> getSharedPositionWith() {
        return sharedPositionWith;
    }

    public void setSharedPositionWith(Collection<User> sharedPositionWith) {
        this.sharedPositionWith = sharedPositionWith;
    }

    public Collection<User> getSharedPositionBy() {
        return sharedPositionBy;
    }

    public void setSharedPositionBy(Collection<User> sharedPositionBy) {
        this.sharedPositionBy = sharedPositionBy;
    }
}
