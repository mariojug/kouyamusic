clean:
	rm -rf client/build; rm -rf server/build

build:
	make clean
	cd client; npm run build; mv build ../server/build

deploy:	
	cd server; gcloud app deploy