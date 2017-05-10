#!/bin/sh

url=$1

aws cloudsearchdomain upload-documents \
  --documents people.json \
  --content-type 'application/json' \
  --endpoint-url $url
