package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pam.model.Comment;
import pam.model.Place;
import pam.model.User;
import pam.repositories.CommentRepository;
import pam.repositories.PlaceRepository;
import pam.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public Comment getComment(long commentID) {
        return commentRepository.findOne(commentID);
    }

    @Override
    public Iterable<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Iterable<Comment> getCommentsByUser(long userID) {
        return commentRepository.findByOwner(
                userRepository.findOne(userID)
        );
    }

    @Override
    public Iterable<Comment> getCommentsByPlace(long placeID) {
        return commentRepository.findByPlace(
                placeRepository.findOne(placeID)
        );
    }

    @Override
    public Comment addComment(long userID, long placeID, String content) {
        User user = userRepository.findOne(userID);
        Place place = placeRepository.findOne(placeID);
        Comment newComment = new Comment(user, place, content);
        return commentRepository.save(newComment);
    }

    @Override
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(long commentID, String content) {
        Comment commentFromDB = commentRepository.findOne(commentID);
        commentFromDB.setContent(content);
        return commentRepository.save(commentFromDB);
    }

    @Override
    public void deleteComment(long commentID) {
        commentRepository.delete(commentID);
    }
}
