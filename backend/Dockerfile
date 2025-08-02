FROM maven:3.9.11-eclipse-temurin-17 AS build

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-alpine
COPY --from=build /target/user-backend-*.jar /user-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/user-backend.jar"]