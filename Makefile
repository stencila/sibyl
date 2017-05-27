all: setup build cover

setup:
	bash kcov-install.sh
	sudo apt-get install shellcheck

build:
	docker build images/alpha-base --tag stencila/alpha-base

lint:
	shellcheck sibyl

test: lint
	bash test.sh

cover:
	kcov --exclude-pattern=test.sh coverage test.sh
