package pgfsd.testapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pgfsd.testapp.entities.Test;

public interface TestRepository extends JpaRepository<Test, Long> {

    Test save(Test test);
}
