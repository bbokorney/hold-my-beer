#!/bin/sh

url=$1

aws cloudsearchdomain upload-documents \
  --documents delete.json \
  --content-type 'application/json' \
  --endpoint-url $url
