package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "owner_id", "place_id" }) })
public class Comment {

    @Id
    @GeneratedValue
    long id;

    @ManyToOne
    private User owner;
    @ManyToOne
    private Place place;

    @NotBlank(message = "Comment may not be empty")
    @Column(length = 255)
    @Size(min = 0, max = 255)
    private String content;

    public Comment() {
    }

    public Comment(User owner, Place place, String content) {
        this.owner = owner;
        this.place = place;
        this.content = content;
    }

    public User getOwner() {
        return owner;
    }

    public Place getPlace() {
        return place;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
