# build environment
FROM node:12 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_URL=http://localhost:9999
COPY package.json /app/package.json
RUN yarn
RUN yarn global add react-scripts
COPY . /app
RUN yarn build

# production environment
FROM nginx:1.18.0
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]