#!/usr/bin/env bash
#
# @(#) upgrade-react-apps.sh
#

: ${CURL:='/opt/bin/curl'}
: ${GREP:='/usr/bin/grep'}
: ${RUBY:='/opt/bin/ruby'}
: ${SED:='/usr/bin/sed'}
: ${YARN:='/opt/bin/yarn'}

declare script_name=${0##*/}

declare changelog_md='CHANGELOG.md'
declare changelog_url="https://github.com/facebookincubator/create-react-app/blob/master/${changelog_md}"

fetch-changelog ()
{
    # TODO: check file timestamp.
    if test ! -f "$changelog_md"; then
        $CURL -C - -LO "$changelog_url"
    fi
    if test ! -f "$changelog_md"; then
        echo "$script_name: $changelog_md: fetch failed" >&2
        return 1
    fi
}

upgrade-react-scripts ()
{
    declare current_version=''
    declare new_version=$($GREP 'data-name="v' "$changelog_md" |
                  $SED -n 's/.*data-name="v\([^"]\{1,\}\)".*/\1/p;q')

    if test ! -f "package.json"; then
        echo "$script_name: package.json: No such file or directory" >&2
    else
        current_version=$($RUBY -r json -e 'puts JSON.parse(File.read "package.json")["dependencies"]["react-scripts"]')
    fi

    if test ."$new_version" = .''; then
        echo "$script_name: $changelog_md: parse failed" >&2
        return 1
    elif test "$current_version" != "$new_version" &&
            ! $YARN add --exact react-scripts@$new_version; then
        echo "$script_name: react-scripts: upgrade failed" >&2
        return 1
    fi
    return 0
}

upgrade-modules ()
{
    if ! $YARN upgrade; then
        echo "$script_name: modules: upgrade failed" >&2
        return 1
    fi
    return 0
}

# Exec only if not sourced.
if test ."$0" = ."${BASH_SOURCE[0]}"; then
    declare oldpwd=$PWD
    for dir in $PWD/lesson[34]; do
        if test ! -d "$dir"; then
            echo "$script_name: $dir: No such file or directory" >&2
            continue
        elif ! cd "$dir"; then
            echo "$script_name: $dir: Permission denied" >&2
            continue
        fi
        fetch-changelog || continue
        upgrade-react-scripts || continue
        upgrade-modules || continue
    done
    cd "$oldpwd"
fi
