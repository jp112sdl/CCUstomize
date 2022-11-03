#!/bin/sh
#
# This helper script will create/recreate our 0000-XXXXXX.patch
# patchset files by generating diff output of orig<>real file differences in
# all the 0000-XXXX folders

export LC_ALL=C

patchdirs=$(find . -maxdepth 1 -type d -regex "\\./[0-9][0-9][0-9][0-9]-.*" | sort)

rm ../addon/*.patch

for dir in ${patchdirs}; do
  cd ${dir}
  origfiles=$(find . -name "*.orig" -type f -print | sort)
  rm -f ../../addon/${dir}.patch
  for file in ${origfiles}; do
    diff -u --label=${file} --label=${file%.orig} ${file} ${file%.orig} >> ../../addon/${dir}.patch
  done
  cd ..
done
