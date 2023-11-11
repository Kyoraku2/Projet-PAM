package pam.dataManagementServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pam.model.ExampleEntity;
import pam.repositories.ExampleRepository;

@Component
public class ExampleDataLoader implements CommandLineRunner {
    @Autowired
    private ExampleRepository exampleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Populate your repository with initial data
        ExampleEntity entity1 = new ExampleEntity("Example 1", "Example description 1");
        ExampleEntity entity2 = new ExampleEntity("Example 2", "Example description 2");
        ExampleEntity entity3 = new ExampleEntity("Example 3", "Example description 3");

        exampleRepository.save(entity1);
        exampleRepository.save(entity2);
        exampleRepository.save(entity3);
    }
}