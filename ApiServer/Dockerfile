FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY target/csvtosql-0.1.jar Csvtosql.jar
ENTRYPOINT ["java", "-jar", "Csvtosql.jar"]