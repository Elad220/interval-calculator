all: build-and-deploy

build-and-deploy:
	npm run build
	npm run deploy