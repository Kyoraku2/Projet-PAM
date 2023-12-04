package pam.dataManagementServices;

import org.springframework.data.geo.Point;
import pam.model.Place;
import pam.model.User;

public interface PlaceService {
    Iterable<Place> getAllPlaces();
    Iterable<Place> getPlacesOfUser(long userId);
    Iterable<Place> getFavorites(long userId);

    Place getPlace(long id);

    Place createPlace(String name, String description, String image, Point location, String category , User owner);
    Place createPlace(Place place);

    Place updatePlace(long placeID, long ownerID, String name, String description, String image, Point location, String category);
    Place updatePlace(Place place);

    void deletePlace(long id);

    Place addToFavorite(long userId, long placeId);
    Place addToFavorite(User user, Place place);
    Place removeFromFavorite(long userId, long placeId);
    Place removeFromFavorite(User user, Place place);

}
