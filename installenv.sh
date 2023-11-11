#!/bin/bash

set -e

rm -rf env
python3 -m venv env
. env/bin/activate
pip install -q -U pip setuptools wheel
pip install -r ${BRANCH}/requirements.txt
