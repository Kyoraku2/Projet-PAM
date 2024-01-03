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
    long id;

    @NotBlank(message = "Username may not be empty")
    @Column(unique=true, length = USERNAME_MAX_LENGTH)
    @Size(min = USERNAME_MIN_LENGTH, max = USERNAME_MAX_LENGTH)
    String username;

    @NotBlank(message = "Password may not be empty")
    //@Column(length = PASSWORD_MAX_LENGTH)
    //@Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    String password;

    String image;

    @Column(length = DESCRIPTION_MAX_LENGTH)
    @Size(min = DESCRIPTION_MIN_LENGTH, max = DESCRIPTION_MAX_LENGTH)
    String description;

    @NotBlank(message = "Mail may not be empty")
    @Column(unique=true)
    String email;

    Date signInDate;

    @Enumerated(EnumType.STRING)
    RoleEnum role;

    @ManyToMany
    @JoinTable(
        name= "favorites",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName="id")
    )
    private Collection<Place> favorites=new Vector<Place>();

    public User(){}

    public User(String username, String mail, String password) {
        super();
        this.username = username;
        this.email = mail;
        this.role = RoleEnum.USER;
        this.password = password;
        this.signInDate = new Date(System.currentTimeMillis());
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
}
