build:
	-rm -f specdd.zip
	rm -rf public
	hugo
	zip -r specdd.zip public

up:
	hugo server --bind=0.0.0.0 --buildFuture

.PHONY: build up
