#!/usr/bin/env bash
#
# @(#) install-and-initialize-react-app.sh
#
declare prefix='/usr/local'

: ${CREATE_REACT_APP:="${prefix}/bin/create-react-app"}
: ${GIT:="${prefix}/bin/git"}
: ${NODE:="${prefix}/bin/node"}
: ${NPX:="${prefix}/bin/npx"}
: ${YARN:="${prefix}/bin/yarn"}

declare script_name=${0##*/}

declare app_name=${1:-'react-app'}

have_required_utilities ()
{
    for app in "$NODE" "$YARN" "$NPX" "$GIT"; do
        if test ! -x "$app"; then
            cat <<EOF
$script_name: $app: No such file or directory
Please install ${app##*/}, then try again.
EOF
            return 1
        fi
    done
    return 0
}

install_create_react_app ()
{
    if test -x "$CREATE_REACT_APP"; then
        return 0
    fi
    sudo $YARN global add create-react-app --prefix="$prefix"
}

initialize_react_app ()
{
    if test ! -x "$NPX"; then
         sudo $YARN global add npx --prefix="$prefix" || exit 1
    fi
    if ! $NPX create-react-app "$app_name"; then
        echo "$script_name: $app_name: No such file or directory"
        return 1
    elif  ! cd "$app_name"; then
        echo "$script_name: $app_name: Permission denied"
        return 1
    fi
    $GIT init .
    $GIT add .
    $YARN start
}

# Exec only if not sourced.
if test ."$0" = ."${BASH_SOURCE[0]}"; then
    have_required_utilities || exit 1
    install_create_react_app || exit 1
    initialize_react_app || exit 1
fi
