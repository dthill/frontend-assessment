FROM openjdk:17.0.2-jdk

WORKDIR /app
COPY .mvn/ .mvn/
COPY mvnw mvnw
COPY pom.xml pom.xml

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]