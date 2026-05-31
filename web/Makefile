HUGO_CACHEDIR := $(CURDIR)/tmp/hugo-cache

build:
	-rm -f specdd.zip
	HUGO_CACHEDIR=$(HUGO_CACHEDIR) hugo --cleanDestinationDir --gc --minify --baseURL https://specdd.ai/
	zip -r specdd.zip public

up:
	@trap 'exit 130' INT TERM; \
	while true; do \
		HUGO_CACHEDIR=$(HUGO_CACHEDIR) hugo server --bind=0.0.0.0 --buildFuture; \
		status=$$?; \
		if [ $$status -eq 130 ] || [ $$status -eq 143 ]; then \
			exit $$status; \
		fi; \
		echo "hugo server exited with status $$status; restarting in 1s. Press Ctrl-C to stop."; \
		sleep 1; \
	done

.PHONY: build up
