# nodeblog
A blog app with static view partials served up using Node, Express and Angular.

This is a work in progress and I fully realize that many options for this same sort of thing are available already. It's more fun to do things for myself and learn Node in the process.

The current version under the master branch is incomplete but should contain a code that is in good working order and that compiles.

If you would like to see the work in progress that may not actually compile, checkout the dev branch (literally and figuratively).

# Known Issues
- When deployed to remote host on MS Azure, posts are not received by Angular controller due to path resolution issues for backend code on remote host.
- Embedded JS functions within individual posts are somehow out of scope and therefore result in undefined errors.
- "Gist" Angular directive for displaying GitHub Gists does not work.
- I forgot to gitignore the bower and node dependencies before I commited this repo to Github. Clearly, I need to clean that up. Sorry!
