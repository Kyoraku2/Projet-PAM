package pam.model;

import org.hibernate.validator.constraints.NotBlank;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Date;
import java.util.Collection;
import java.util.Vector;

@Entity
public class User {

    @Id
    @GeneratedValue
    long id;

    @NotBlank(message = "Pseudo may not be empty")
    @Column(unique=true, length = 32)
    @Size(min = 4, max = 32)
    String pseudo;

    @NotBlank(message = "Password may not be empty")
    @Column(length = 32)
    @Size(min = 8, max = 32)
    String password;

    String image;

    @Column(length = 255)
    @Size(min = 0, max = 255)
    String description;

    @NotBlank(message = "Mail may not be empty")
    @Column(unique=true)
    String email;

    Date signInDate;

    @ManyToMany
    @JoinTable(
        name= "favorites",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name = "place_id", referencedColumnName="id")
    )
    private Collection<Place> favorites=new Vector<Place>();

    public User(){}

    public User(String pseudo, String mail, String password) {
        super();
        this.pseudo = pseudo;
        this.email = mail;
        this.password = password;
        this.signInDate = new Date(System.currentTimeMillis());
    }

    public User(String pseudo, String mail, String password, String image, String description) {
        this(pseudo, mail, password);
        this.image = image;
        this.description = description;
    }

    public long getUserID() {
        return id;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
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
}
