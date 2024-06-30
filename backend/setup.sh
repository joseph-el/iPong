#!/bin/bash

npx prisma db seed
sleep 3
npm run start:dev
