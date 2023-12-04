package pam.controlers;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pam.dataManagementServices.CommentService;
import pam.dataManagementServices.PlaceService;
import pam.dataManagementServices.UserService;
import pam.model.Comment;
import pam.utils.ApiResponse;

import java.util.ArrayList;
import java.util.List;

import static pam.model.Comment.MAX_COMMENT_LENGTH;

@RestController
@RequestMapping("api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PlaceService placeService;

    private static final Logger logger = Logger.getLogger(CommentController.class);

    public CommentController(){
        super();
        logger.info("Initialize comment controller...");
    }

    private void verifyContent(String content, List<String> errors){
        // Check content length
        if(content.length() > MAX_COMMENT_LENGTH){
            errors.add("Comment must be less than " + MAX_COMMENT_LENGTH + " characters.");
        }
    }

    private void verifyUserID(Integer userID, List<String> errors){
        // Check userID
        if(userID == null){
            errors.add("Missing userID");
        }else{
            if(userService.getUser(userID) == null || userID < 0){
                errors.add("Invalid userID");
            }
        }
    }

    private void verifyPlaceID(Integer placeID, List<String> errors){
        // Check placeID
        if(placeID == null){
            errors.add("Missing placeID");
        }else{
            if(placeService.getPlace(placeID) == null || placeID < 0){
                errors.add("Invalid placeID");
            }
        }
    }

    @RequestMapping("all")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> list(){
        return ApiResponse.ok(commentService.getAllComments());
    }

    @RequestMapping("details")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getOneComment(
            @RequestParam(value="id", required = false) Integer id
    ){
        if(id == null){
            return ApiResponse.badRequest("Missing id");
        }
        Comment comment = commentService.getComment(id);
        if(id < 0 || comment == null){
            return ApiResponse.badRequest("Invalid id");
        }
        return ApiResponse.ok(comment);
    }

    @RequestMapping("create")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> create(
            @RequestParam(value="userID") Integer userID,
            @RequestParam(value="placeID") Integer placeID,
            @RequestParam(value="content") String content
    ){
        List<String> errors = new ArrayList<>();

        // Check userID
        verifyUserID(userID, errors);

        // Check placeID
        verifyPlaceID(placeID, errors);

        // Check content
        verifyContent(content, errors);

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
                commentService.addComment(userID,placeID,content)
        );
    }

    @RequestMapping("update")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> update(
            @RequestParam(value="id") Integer id,
            @RequestParam(value="content", required = false) String content
    ){
        List<String> errors = new ArrayList<>();

        // Check id
        if(id == null){
            errors.add("Missing id");
        }else{
            if(commentService.getComment(id) == null || id < 0){
                errors.add("Invalid id");
            }
        }

        // Check content
        if(content != null){
            verifyContent(content, errors);
        }else{
            content = "<Empty comment>";
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
                commentService.updateComment(id,content)
        );
    }

    @RequestMapping("delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> delete(
            @RequestParam(value="id") Integer id
    ){
        List<String> errors = new ArrayList<>();

        // Check id
        if(id == null){
            errors.add("Missing id");
        }else{
            if(commentService.getComment(id) == null || id < 0){
                errors.add("Invalid id");
            }
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        commentService.deleteComment(id);
        return ApiResponse.ok("Comment deleted");
    }

    @RequestMapping("user")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getCommentsByUser(
            @RequestParam(value="id") Integer userID
    ){
        List<String> errors = new ArrayList<>();

        // Check id
        if(userID == null){
            errors.add("Missing id");
        }else{
            if(userService.getUser(userID) == null || userID < 0){
                errors.add("Invalid id");
            }
        }

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
                commentService.getCommentsByUser(userID)
        );
    }

    @RequestMapping("place")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Object> getCommentsByPlace(
            @RequestParam(value="id") Integer placeID
    ){
        List<String> errors = new ArrayList<>();

        // Check id
        verifyPlaceID(placeID, errors);

        if(!errors.isEmpty()){
            return ApiResponse.badRequest(errors);
        }

        return ApiResponse.ok(
                commentService.getCommentsByPlace(placeID)
        );
    }




    // list : OK
    // details : OK
    // create : OK
    // update : OK
    // delete : OK
    // get all comments of one place : OK
    // get all comments of one user : OK
}
