package pam.model;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "owner_id", "place_id" }) })
public class Comment {
    public static final int MAX_COMMENT_LENGTH = 255;
    public static final int MIN_CONTENT_LENGTH = 0;

    @Id
    @GeneratedValue
    long id;

    @ManyToOne
    private User owner;
    @ManyToOne
    private Place place;

    @NotBlank(message = "Comment may not be empty")
    @Column(length = MAX_COMMENT_LENGTH)
    @Size(min = MIN_CONTENT_LENGTH, max = MAX_COMMENT_LENGTH)
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
