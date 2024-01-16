# Use an official OpenJDK runtime as a parent image
# FROM openjdk:11-jre-slim
# FROM openjdk:8-jre-slim
# FROM maven:3.8.2-openjdk-11
FROM maven:3.5.3-jdk-8-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and any other necessary configuration files
COPY ./pom.xml /app
COPY ./src /app/src

# Build the application
RUN mvn clean package -Dmaven.test.skip=true

# Create a new image for running the application
FROM openjdk:8-jre-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port on which the Spring Boot application will run
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]