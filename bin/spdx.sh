#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# SPDXVersion: SPDX-2.2
# SPDX-FileCopyrightText: Copyright 2020 Sam Bacha
# This Source Code Form is subject to the terms of the MIT License
# If a copy of the MPL was not distributed with this
# file, You can obtain one at hhttps://spdx.org/licenses/MIT.html
# v0.2.1 - 2020-09-05

SPDX="^// SPDX-License-Identifier:\.$"
 
# CHANGE VALUES AFTER `egrep` FOR FILE EXTENSIONS 
for f in $(find . -type f | egrep '\.(js|sol|ts)$'); do
    HEADER=$(head -16 $f)
    if [[ $HEADER =~ $SPDX ]]; then
        BODY=$(tail -n +17 $f)
        cat license_header > temp
        echo "$BODY" >> temp
        mv temp $f
    else
        echo "$f was missing header \033[32m FIXED"
        cat spdx_header $f > temp
        mv temp $f
    fi
done