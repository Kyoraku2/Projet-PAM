package pam.dataManagementServices;

import pam.model.Comment;

public interface CommentService {
    Comment getComment(long commentID);

    Iterable<Comment> getAllComments();
    Iterable<Comment> getCommentsByUser(long userID);
    Iterable<Comment> getCommentsByPlace(long placeID);

    Comment addComment(long userID, long placeID, String content);
    Comment addComment(Comment comment);

    Comment updateComment(long commentID, String content);

    void deleteComment(long commentID);
}
