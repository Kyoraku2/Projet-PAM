package pam.model;

import com.google.gson.Gson;
import org.springframework.web.multipart.MultipartFile;

public class PlaceRequestBody {
    private Long id;
    private String name;
    private String description;
    private Double latitude;
    private Double longitude;
    private String category;
    private Long ownerID;
    private String ownerName;

    public PlaceRequestBody() {
    }

    public PlaceRequestBody(Place place) {
        this.name = place.getName();
        this.description = place.getDescription();
        this.latitude = place.getLatitude();
        this.longitude = place.getLongitude();
        this.category = place.getCategory().toString();
        this.ownerID = place.getOwner().getUserID();
        this.ownerName = place.getOwner().getUsername();
        this.id = place.getId();
    }

    public PlaceRequestBody(String name, String description, Double latitude, Double longitude, String category, Long ownerID, String ownerName, MultipartFile image) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.category = category;
        this.ownerID = ownerID;
        this.ownerName = ownerName;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public CategoryEnum getCategory() {
        return CategoryEnum.getCategory(category);
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public static Iterable<PlaceRequestBody> convert(Iterable<Place> places){
        java.util.List<PlaceRequestBody> list = new java.util.ArrayList<>();
        for(Place place : places){
            list.add(new PlaceRequestBody(place));
        }
        return list;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String toString(){
        return "PlaceRequestBody{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", category='" + category + '\'' +
                ", ownerID=" + ownerID +
                ", ownerName='" + ownerName + '\'' +
                '}';
    }

    public static PlaceRequestBody fromJSON(String json){
        return new Gson().fromJson(json, PlaceRequestBody.class);
    }
}
