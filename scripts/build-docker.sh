#!/usr/bin/bash

location=$( dirname "$(realpath $0)" )

source "$location/../.env"

docker create \
    -e WEBSITE_URL=$WEBSITE_URL \
    -e COMMAND_PREFIX=$COMMAND_PREFIX \
    -e DISCORD_TOKEN=$DISCORD_TOKEN \
    -e POSTGRES_HOST=$POSTGRES_HOST \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_DB=$POSTGRES_DB \
    -e POSTGRES_USE_SSL=$POSTGRES_USE_SSL \
    --name 'ampbot' \
    amp/bot