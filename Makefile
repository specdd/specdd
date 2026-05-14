BUILD_DIR := build
SRC_DIR := src
PACKAGE_NAME := specdd
PACKAGE_ZIP := $(BUILD_DIR)/$(PACKAGE_NAME).zip
PACKAGE_SIG := $(PACKAGE_ZIP).asc
SIGNING_KEY := FD87313256E08C486951F9091372D38569116BC5
PUBLIC_KEY := .gpg/code-signing-2026.01.gpg

build: verify-public-key
	mkdir -p $(BUILD_DIR)
	rm -f $(PACKAGE_ZIP) $(PACKAGE_SIG)
	cd $(SRC_DIR) && zip -r ../$(PACKAGE_ZIP) .
	gpg --batch --yes --local-user $(SIGNING_KEY) --armor --detach-sign --output $(PACKAGE_SIG) $(PACKAGE_ZIP)
	$(MAKE) verify-package

verify-public-key:
	gpg --show-keys --with-colons $(PUBLIC_KEY) | grep -q '^fpr:::::::::$(SIGNING_KEY):'

verify-package:
	mkdir -p $(BUILD_DIR)
	@set -e; \
	tmp_homedir="$$(mktemp -d "$(BUILD_DIR)/gnupg-verify.XXXXXX")"; \
	chmod 700 "$$tmp_homedir"; \
	trap 'rm -rf "$$tmp_homedir"' EXIT; \
	gpg --batch --homedir "$$tmp_homedir" --import $(PUBLIC_KEY); \
	gpg --batch --homedir "$$tmp_homedir" --verify $(PACKAGE_SIG) $(PACKAGE_ZIP)

.PHONY: build verify-public-key verify-package
