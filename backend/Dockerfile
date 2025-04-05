FROM openjdk:17-slim

WORKDIR /app

ENV TODO_ACTIVE_ENV=prod
ENV TODO_DB_URL="jdbc:postgresql://database:5432/todo-database"
ENV TODO_DB_USERNAME=user
ENV TODO_DB_PASSWORD=password
ENV TODO_JWT_ISSUER=todo-app-backend
ENV TODO_JWT_ACCESS_SECONDS=900
ENV TODO_JWT_REFRESH_DAYS=7
ENV PASSWORD_HASH_STRENGTH=14
ENV FRONTEND_URL="http://localhost:5173"

COPY target/to-do-app-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

CMD ["java", "-jar", "to-do-app-0.0.1-SNAPSHOT.jar"]