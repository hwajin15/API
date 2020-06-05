databaseName="디비이름" \
docker run --name some-mysql \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=${databaseName} \
-d mysql:tag
