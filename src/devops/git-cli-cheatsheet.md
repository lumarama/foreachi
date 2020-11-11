---
title: Git CLI Cheatsheet
permalink: /devops/git-cli-cheatsheet
---
# Git CLI Cheatsheet

## Repository Management

```bash
# Clone remote repository
git clone <repo-url>
```

## Branch Management

```bash
# Create a new branch to track changes in the remote branch and switch to it
git checkout -b <local-branch-name> origin/<remote-branch-name>

# List all local and remote branches
git branch -a

# Fetch remote branches
git fetch
```

## Commit Management

```bash
# Show current branch status, shows modified files (staged and not staged)
git status

# Commit all changes to the local branch
git commit -am "<commit-message>"

# Push local branch to remote repo
git push

# Fetch and merge remote branch changes into your local branch
git pull

# Discard local not commited changes
git checkout -- .

# Fetch and rebase your local branch commits on top of the remote branch commits
git pull --rebase
# if rebase failed with conflicts - resolve conflicts, stage changes and continue rebase
git add --all
git rebase --continue
# you can also abort failed rebase
git rebase --abort
```
