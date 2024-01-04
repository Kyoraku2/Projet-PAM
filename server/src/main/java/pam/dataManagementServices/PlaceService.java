package pam.dataManagementServices;

import pam.model.Place;
import pam.model.PlaceRequestBody;
import pam.model.User;

public interface PlaceService {
    Iterable<Place> getAllPlaces();
    Iterable<Place> getPlacesOfUser(long userId);
    Iterable<Place> getFavorites(long userId);
    Iterable<Place> getPlacesOfList(long listId);

    Place getPlace(long id);

    Place createPlace(String name, String description, double latitude, double longitude, String category , User owner);
    Place createPlace(Place place);
    Place createPlace(PlaceRequestBody placeRequestBody);

    Place updatePlace(long placeID, long ownerID, String name, String description, double latitude, double longitude, String category);
    Place updatePlace(Place place);
    Place updatePlace(PlaceRequestBody placeRequestBody);

    void deletePlace(long id);

    Place addToFavorite(long userId, long placeId);
    Place addToFavorite(User user, Place place);
    Place removeFromFavorite(long userId, long placeId);
    Place removeFromFavorite(User user, Place place);

}
