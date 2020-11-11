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

# Commit all changes to the local branch
git commit -am "<commit-message>"

# Push local branch to remote repo
git push

# Fetch and merge remote branch changes into your local branch
git pull
```
