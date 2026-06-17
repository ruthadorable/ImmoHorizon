package repository;

import model.LoginRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public class LoginRepository implements JpaRepository<LoginRequest> {
}
