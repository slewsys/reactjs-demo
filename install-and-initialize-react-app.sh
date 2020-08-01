#!/usr/bin/env bash
#
# @(#) install-and-initialize-react-app.sh
#
declare prefix='/usr'

case "$(uname)" in
    Darwin|*BSD|Linux)
        prefix='/usr/local'
        ;;
esac

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

install_app ()
{
    declare app=$1
    declare app_path_var=$(tr 'a-z-' 'A-Z_' <<<$app)

    if eval test -x "\$$app_path_var"; then
        return 0
    fi
    sudo $YARN global add $app --prefix="$prefix"
}

initialize_react_app ()
{
    if ! $CREATE_REACT_APP "$app_name"; then
        echo "$script_name: $app_name: No such file or directory"
        return 1
    elif  ! cd "$app_name"; then
        echo "$script_name: $app_name: Permission denied"
        return 1
    fi
}

# Exec only if not sourced.
if test ."$0" = ."${BASH_SOURCE[0]}"; then
    have_required_utilities || exit 1
    install_app create-react-app || exit 1
    initialize_react_app || exit 1
    $YARN start
fi
