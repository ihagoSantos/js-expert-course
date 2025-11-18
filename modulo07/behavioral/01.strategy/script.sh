# Postgres Docker Script

docker run \
    --name postgres \
    -e POSTGRES_USER=ihagosantos \
    -e POSTGRES_PASSWORD="senha123" \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres

docker exec -it postgres psql --username ihagosantos --dbname heroes

CREATE TABLE IF NOT EXISTS warriors (id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);

## list tables
\dt
SELECT * FROM warriors;

# MongoDB Docker Script
docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=ihagosantos \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb