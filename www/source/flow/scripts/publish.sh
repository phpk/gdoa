
#!/usr/bin/env bash

cd dist/core && npm publish

cd ../activity-diagram && npm publish

cd ../chart-diagram && npm publish

cd ../class-diagram && npm publish

cd ../flow-diagram && npm publish

cd ../layout && npm publish

cd ../sequence-diagram && npm publish

cd ../../bundle
npm run build
cd ../dist/bundle && npm publish
