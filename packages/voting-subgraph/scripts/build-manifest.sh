#!/bin/bash

NETWORK=$1

if [ "$STAGING" ]
then
  FILE=$NETWORK'-staging.json'
else
  FILE=$NETWORK'.json'
fi

DATA=manifest/data/$FILE

echo 'Generating manifest from data file: '$DATA
cat $DATA

mustache -p manifest/templates/daoFactory.template.yaml $DATA manifest/templates/subgraph.template.yaml > subgraph.yaml
