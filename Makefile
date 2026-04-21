.PHONY: install lint build test unit watch coverage verify clean

install:
	npm ci

lint:
	npm run lint

build:
	npm run build

test: unit

unit:
	npm run test:unit

watch:
	npm run test:watch

coverage:
	npm run test:coverage

verify:
	npm run verify

clean:
	rm -rf .next coverage

