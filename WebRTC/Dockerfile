FROM node:14.17.0

# 앱 디렉터리 생성
WORKDIR /app

# 앱 의존성 설치
COPY package*.json /app

RUN cd /app; npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . /app

EXPOSE 8001

CMD npm run server

