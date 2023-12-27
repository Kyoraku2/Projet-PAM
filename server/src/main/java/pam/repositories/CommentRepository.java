package pam.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pam.model.Comment;
import pam.model.Place;
import pam.model.User;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
    Iterable<Comment> findByOwner(User user);
    Iterable<Comment> findByPlace(Place place);
}
