FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/UserService-0.0.1-SNAPSHOT.jar UserService.jar
ENTRYPOINT ["java", "-jar", "UserService.jar"]