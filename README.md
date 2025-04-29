# To-Do App 📝 
A simple To-Do App with user authrntication built with **Spring Boot** for the backend, **React** for the frontend and **PostgreSQL** as the database. 

## Setup & Installation Guide 
### Prerequisites: 
- [Docker](https://www.docker.com/get-started/) 
- [Maven](https://maven.apache.org/) (Optional) 

### Build and Run: 
1. **Make sure you are in the root directory of the project.** 
2. **Change directory to backend.**
```bash
cd backend 
``` 
3. **Build backend jar file.** 
```bash 
mvn clean package -DskipTests 
``` 

OR

```bash
# If you have not installed maven.
./mvnw clean package -DskipTests
```

4. **Change back to the project root directory.** 
```bash 
cd ..
``` 
5. **Run app.** 
```bash 
docker compose up  
``` 

OR

```bash
# Detached mode
docker compose up -d
```

## Tech Stack 🛠️ 
- **Backend:** Spring Boot(Java 17+) & Maven 
- **Frontend:** React, TypeScript, CSS & Vite 
- **DataBase:** PostgresSQL 
- **Containerization:** Docker & Docker Compose 
- **Authentication:** JWT (JSON Web Token) 

## Developer 
### **Thabo Thobakgale** 
#### Find me on: 
- [GitHub](https://github.com/tmanZA10) 
- [LinkedIn](www.linkedin.com/in/thabo-thobakgale-tman)