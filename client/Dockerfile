FROM node:20-alpine

# set working directory
WORKDIR /app/client/

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /client/node_modules/.bin:$PATH

# copy app into '/app/cient/' folder in the container
COPY package*.json  /app/client/

# install app dependencies
RUN npm install

COPY . /app/client

# start app
CMD ["npm", "start"]