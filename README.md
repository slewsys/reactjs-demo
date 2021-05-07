## React.js demo

- Lesson 1 implements a simple web app using HTML markup and JavaScript.
- Lesson 2 converts the HTML markup in Lesson 1 using JavaScript's DOM API.
- Lesson 3 is a React app that parallels the JavaScript from Lesson 2.
- Lesson 4 converts the React DOM API of Lesson 3 to JSX, paralleling the HTML
  markup of Lesson 1.
- Lesson 5 is a Rails API server that loads a React UI via `react-rails` gem.

## Installation

Begin by cloning this repository, e.g., in a Unix terminal, run:
```shell
git clone https://github.com/slewsys/reactjs-demo.git
cd ./reactjs-demo
```

Lessons 1 and 2 can be run simply by opening the associated HTML
file in a web browser.  For example,

```shell
cd ./lesson1
open lesson1.html
```

Lessons 3 and 4 were created with
[Facebook's Create React App](https://github.com/facebook/create-react-app).
The following packages must be installed to run them:

- [nodejs](https://nodejs.org/en/)  (v14.6.1)
- [npm](https://github.com/npm/npm) (7.11.2)
- [yarn](https://github.com/yarnpkg/yarn) (v2.4.1)

Lesson 5 additionally requires ruby:

- [ruby-lang](https://www.ruby-lang.org) (3.0.1)

These can be installed with version manager
[asdf](https://asdf-vm.com)
from the `bash` command prompt as follows¹:

```shell
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
cat <<'EOF' | tee -a ~/.bashrc >>~/.bash_profile
export ASDF_DIR=~/.asdf
if test -f "${ASDF_DIR}/asdf.sh"; then
    source "${ASDF_DIR}/asdf.sh"
    source "${ASDF_DIR}/completions/asdf.bash"
fi
EOF
source ~/.bashrc
asdf plugin add nodejs
node_lts=$(asdf list all nodejs 14. | tail -1)
asdf install nodejs $node_lts
asdf global  nodejs $node_lts
npm i -g npm
npm i -g yarn
asdf reshim nodejs
asdf plugin add ruby
ruby_stable=$(asdf list all ruby 3. | grep -v -- '-[a-z]' | tail -1)
asdf install ruby $ruby_stable # ruby builds from source, so be patient
asdf global  ruby $ruby_stable
```

To check the versions installed:

```shell
node --version
npm --version
yarn --version
ruby --version
```

The output should look something like:

    v14.16.1
    7.11.2
    1.22.10
    ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [x86_64-linux]

Lessons 3 and 4 can now be viewed by `cd`ing to their respective
directories, and running, e.g.,:

```
cd lesson3
yarn install
yarn start
```

For instructions on viewing Lesson 5, see
[Lesson 5 README](https://github.com/slewsys/reactjs-demo/tree/master/lesson5#readme)

---
¹ To install ruby, software development tools are also a prerequisite.
For instance, on Debian/Ubuntu, try:

```shell
sudo apt install build-essential autoconf automake git libncurses-dev \
    libgdbm-dev libffi-dev liblzma-dev libreadline-dev libsqlite3-dev \
    libssl-dev libz-dev tk-dev zlib1g-dev
```

On Fedora/CentOS, try:

```shell
sudo dnf group install 'C Development Tools and Libraries'
sudo dnf install gdbm-devel libffi-devel ncurses-devel openssl-devel \
    readline-devel sqlite-devel tk-devel xz-devel zlib-devel
```

On MacOS, install Xcode and GnuPG. For example, after installing
[GPGTools](https://gpgtools.org), add _/opt/MacGPG2/bin_
to your path:

```shell
cat <<'EOF' | tee -a ~/.bashrc >>~/.bash_profile
export PATH=$PATH:/opt/MacGPG2/bin
EOF
```

Alternatively, GnuPG can be installed via
[MacPorts](https://www.macports.org/) or
[Homebrew](https://brew.sh/).
