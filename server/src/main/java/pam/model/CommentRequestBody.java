package pam.model;

import com.google.gson.Gson;

public class CommentRequestBody{
    private Long id;
    private String content;
    private Long ownerID;
    private String ownerName;
    private Long placeID;
    private String placeName;

    public CommentRequestBody() {
    }

    public CommentRequestBody(Comment comment) {
        this.content = comment.getContent();
        this.ownerID = comment.getOwner().getUserID();
        this.ownerName = comment.getOwner().getUsername();
        this.placeID = comment.getPlace().getId();
        this.placeName = comment.getPlace().getName();
        this.id = comment.getId();
    }

    public CommentRequestBody(String content, Long ownerID, String ownerName, Long placeID, String placeName) {
        this.content = content;
        this.ownerID = ownerID;
        this.ownerName = ownerName;
        this.placeID = placeID;
        this.placeName = placeName;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public Long getOwnerID() {
        return ownerID;
    }
    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public Long getPlaceID() {
        return placeID;
    }
    public void setPlaceID(Long placeID) {
        this.placeID = placeID;
    }

    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPlaceName() {
        return placeName;
    }
    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String toString(){
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    public static CommentRequestBody fromJson(String json){
        Gson gson = new Gson();
        return gson.fromJson(json, CommentRequestBody.class);
    }
}
