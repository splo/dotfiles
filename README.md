# Splo's dotfiles

## Requirements

- [Git](https://git-scm.com/)
- [rsync](https://rsync.samba.org/)

## Setup

```bash
git clone --separate-git-dir=$HOME/.dotfiles.git https://github.com/splo/dotfiles.git /tmp/dotfiles.git
rsync --recursive --verbose --exclude '.git' /tmp/dotfiles.git/ $HOME/
rm -r /tmp/dotfiles.git
alias dotfiles='/usr/bin/env git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME'
dotfiles config --local status.showUntrackedFiles no
```
