package pam.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pam.model.List;
import pam.model.User;

@Repository
public interface ListRepository extends CrudRepository<List, Long> {
    Iterable<List> findByOwner(User owner);
    Iterable<List> findByContributors(User contributor);
    Iterable<List> findByOwnerAndIsShared(User owner, boolean shared);
}
