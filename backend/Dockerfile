
FROM amazoncorretto:17-alpine-jdk

COPY target/users-backend-0.0.1-SNAPSHOT.jar /users-backend.jar
# EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/users-backend.jar"]