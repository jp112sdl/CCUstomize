#!/bin/sh
ADDON_NAME=CCUstomize
COPYFILE_DISABLE=1; export COPYFILE_DISABLE

rm ${ADDON_NAME}-addon.tgz

cd src/patchsource
./create_patches.sh

cd ..
chmod +x update_script
chmod +x rc.d/*
find . -name ".DS_Store" -exec rm -rf {} \;
find . -name "._*" -exec rm -rf {} \;
dot_clean .

tar -zcvf ../${ADDON_NAME}-addon.tgz *
cd ..
