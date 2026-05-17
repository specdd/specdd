HUGO_CACHEDIR := $(CURDIR)/tmp/hugo-cache

build:
	-rm -f specdd.zip
	HUGO_CACHEDIR=$(HUGO_CACHEDIR) hugo --cleanDestinationDir --gc --minify --baseURL https://specdd.ai/
	./scripts/check-production-output.sh public
	zip -r specdd.zip public

check-production-output:
	./scripts/check-production-output.sh public

up:
	hugo server --bind=0.0.0.0 --buildFuture

.PHONY: build check-production-output up
