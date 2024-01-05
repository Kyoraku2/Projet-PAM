package pam.dataManagementServices;

import pam.model.List;
import pam.model.ListRequestBody;
import pam.model.Place;
import pam.model.User;

public interface ListService {
    Iterable<List> getAllLists();
    Iterable<List> getListsByOwner(User owner);
    Iterable<List> getListsByOwnerID(long ownerID);

    List getList(long listID);
    List getList(List list);

    List createList(User owner, String name, String description, boolean isShared);
    List createList(List list);
    List createList(ListRequestBody listRequestBody);

    List updateList(List list);
    List updateList(long listID, String name, String description, boolean isShared);
    List updateList(long listID, ListRequestBody listRequestBody);

    void deleteList(List list);
    void deleteList(long listID);

    List removePlace(List list, Place place);
    List removePlace(long listID, long placeID);

    List addPlace(List list, Place place);
    List addPlace(long listID, long placeID);
}
