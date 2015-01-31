REPORTER = dot #spec

check: test

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
#		--require coffee-script/register \
#		--compilers coffee:coffee-script/register \
		test/*.js

test-cov:
	@NODE_ENV=test node node_modules/istanbul/lib/cli.js cover -x '**/examples/**' \
	./node_modules/mocha/bin/_mocha test/*.js -- \
	--reporter $(REPORTER) \
#	--require coffee-script/register \
	test/*.js \

.PHONY: test
