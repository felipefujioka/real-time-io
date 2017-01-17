docker stop game-server-container
docker rm game-server-container

docker build -t game-server-image .

docker run -p 4002:4002 --name game-server-container game-server-image