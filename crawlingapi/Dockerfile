FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/crawlingapi-0.0.1-SNAPSHOT.jar CralingApi.jar
ENTRYPOINT ["java", "-jar", "CralingApi.jar"]