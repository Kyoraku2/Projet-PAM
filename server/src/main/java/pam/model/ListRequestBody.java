package pam.model;

import com.google.gson.Gson;
import java.util.Collection;

public class ListRequestBody {
    public class ReducedPlace {
        private Long id;
        private String name;    

        public ReducedPlace(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() {
            return id;
        }
        
        public String getName() {
            return name;
        }
    }
    private Long id;
    private String name;
    private String description;
    private Long ownerID;
    private String ownerName;
    private boolean isShared;
    private Collection<ReducedPlace> placesResp;

    public ListRequestBody() {
    }

    public ListRequestBody(List list) {
        this.name = list.getName();
        this.description = list.getDescription();
        this.ownerID = list.getOwner().getUserID();
        this.isShared = list.isShared();
        this.ownerName = list.getOwner().getUsername();
        this.id = list.getId();
        if(list.getPlaces() != null){
            placesResp = new java.util.ArrayList<>();
            for(Place place : list.getPlaces()){
                placesResp.add(new ReducedPlace(place.getId(), place.getName()));
            }
        }
    }

    public ListRequestBody(String name, String description, Long ownerID, String ownerName, boolean isShared) {
        this.name = name;
        this.description = description;
        this.ownerID = ownerID;
        this.ownerName = ownerName;
        this.isShared = isShared;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Long getOwnerID() {
        return ownerID;
    }
    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public boolean isShared() {
        return isShared;
    }

    public void setShared(boolean shared) {
        isShared = shared;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public static Iterable<ListRequestBody> convert(Iterable<List> lists){
        java.util.List<ListRequestBody> listRequestBodies = new java.util.ArrayList<>();
        for(List list : lists){
            listRequestBodies.add(new ListRequestBody(list));
        }
        return listRequestBodies;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Collection<ReducedPlace> getPlaces() {
        return placesResp;
    }

    public void setPlaces(Collection<ReducedPlace> places) {
        this.placesResp = places;
    }

    public String toString(){
        return "ListRequestBody: " + this.name + " " + this.description + " " + this.ownerID + " " + this.ownerName + " " + this.isShared + " " + this.id + " " + this.placesResp;
    }

    public static ListRequestBody fromJSON(String json){
        return new Gson().fromJson(json, ListRequestBody.class);
    }

}
