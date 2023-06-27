FROM public.ecr.aws/docker/library/node:18-alpine as build-stage
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm upgrade -g && npm install
COPY ./ .
RUN npm run build

FROM public.ecr.aws/nginx/nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /ergoz/chat
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]