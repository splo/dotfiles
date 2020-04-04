# Splo's dotfiles

## Features

- [Homebrew bundle](https://github.com/Homebrew/homebrew-bundle) brewfile.
- [Starship](https://starship.rs/) prompt.
- [Phoenix](https://github.com/kasper/phoenix) script.

## Requirements

- [Git](https://git-scm.com/)
- [rsync](https://rsync.samba.org/)

## Setup

```shell
git clone --separate-git-dir=$HOME/.dotfiles.git https://github.com/splo/dotfiles.git /tmp/dotfiles.git
rsync --recursive --verbose --exclude '.git' /tmp/dotfiles.git/ $HOME/
rm -rf /tmp/dotfiles.git
alias dotfiles='/usr/bin/env git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME'
dotfiles config --local status.showUntrackedFiles no
```

You can now continue by installing [Homebrew](https://brew.sh/).

Then install the common tools:

```shell
brew bundle --file ./dev/src/local/setup/Brewfile
```
