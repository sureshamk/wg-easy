
FROM --platform=arm64 linuxserver/wireguard:1.0.20210914

RUN mkdir -p /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
# IMPORTANT: set the exact version
ENV NODE_VERSION v16.17.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
# add node and npm to the PATH
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH
RUN npm -v
RUN node -v



# Copy Web UI
COPY src/ /app/
WORKDIR /app
RUN npm i --production



# # Move node_modules one directory up, so during development
# # we don't have to mount it in a volume.
# # This results in much faster reloading!
# #
# # Also, some node_modules might be native, and
# # the architecture & OS of your development machine might differ
# # than what runs inside of docker.
RUN mv /app/node_modules /node_modules

# # Enable this to run `npm run serve`
# RUN npm i -g nodemon

# # Install Linux packages
# RUN apk add -U --no-cache \
#   ip6tables iptables \
#   wireguard-tools \
#   dumb-init

# Expose Ports
EXPOSE 51820/udp
EXPOSE 51821/tcp

# Set Environment
ENV DEBUG=Server,WireGuard

# Run Web UI
WORKDIR /app
CMD [ "node", "server.js"]
