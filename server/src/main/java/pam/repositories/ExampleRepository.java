package pam.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pam.model.ExampleEntity;

@Repository
public interface ExampleRepository extends CrudRepository<ExampleEntity, Long> {
}
