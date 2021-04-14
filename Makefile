install:
	yarn

develop:
	yarn start

build:
	yarn build

upload: build
	yarn siasky

.PHONY: install develop build upload

