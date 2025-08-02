
FROM amazoncorretto:17-alpine-jdk

COPY target/user-backend-0.0.1-SNAPSHOT.jar /user-backend.jar
# EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/user-backend.jar"]