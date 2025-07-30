package dev.springboot.backend.santiago.usersapp.users_backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.springboot.backend.santiago.usersapp.users_backend.entities.Role;
import dev.springboot.backend.santiago.usersapp.users_backend.entities.User;
import dev.springboot.backend.santiago.usersapp.users_backend.models.IUser;
import dev.springboot.backend.santiago.usersapp.users_backend.models.UserRequest;
import dev.springboot.backend.santiago.usersapp.users_backend.repositories.RoleRepository;
import dev.springboot.backend.santiago.usersapp.users_backend.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) this.userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.userRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return this.userRepository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        user.setRoles(getRoles(user));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    @Override
    public Optional<User> update(UserRequest user, Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User userBD = userOptional.get();
            userBD.setName(user.getName());
            userBD.setLastname(user.getLastname());
            userBD.setEmail(user.getEmail());
            userBD.setUsername(user.getUsername());

            userBD.setRoles(getRoles(user));
            return Optional.of(this.userRepository.save(userBD));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public Long deleteById(Long id) {
        this.userRepository.deleteById(id);
        return id;
    }

    private List<Role> getRoles(IUser user) {
        List<Role> roles = new ArrayList<>();
        Optional<Role> roleOptional = this.roleRepository.findByName("ROLE_USER");
        roleOptional.ifPresent(roles::add);

        if (user.isAdmin()) {
            Optional<Role> adminRoleOptional = this.roleRepository.findByName("ROLE_ADMIN");
            adminRoleOptional.ifPresent(roles::add);
        }
        return roles;
    }

}
