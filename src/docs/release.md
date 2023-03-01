# How to release a new version of Pomo

1. Create a new changelog entry using semver in the title. The release version in the follow steps is pulled from the changelog version header
2. Run the release script using `bash scripts/release.sh`
3. Push the release using `git push origin main`
4. Push the new tag using `git push --tags`
