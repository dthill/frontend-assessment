package pgfsd.testapp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pgfsd.testapp.entities.Test;

import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Long> {

    Test save(Test test);

    Optional<Test> findById(Long id);

    List<Test> findAll();

    @Query("SELECT t FROM Test t")
    Page<Test> findRandomTest(Pageable pageable);

    long count();


}
