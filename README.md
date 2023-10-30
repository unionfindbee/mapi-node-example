# Mayhem for API: Node.js Express Application Example

[![Mayhem for API](https://mayhem4api.forallsecure.com/api/v1/api-target/forallsecure/forallsecure-mapi-action-examples/badge/icon.svg?scm_branch=main)](https://mayhem4api.forallsecure.com/forallsecure/forallsecure-mapi-action-examples/latest-job?scm_branch=main)

[![Mayhem for API](https://mayhem4api.forallsecure.com/downloads/img/mapi-logo-full-color.svg)](http://mayhem4api.forallsecure.com/signup)

## About Mayhem for API

🧪 Modern App Testing: Mayhem for API is a dynamic testing tool that
catches reliability, performance and security bugs before they hit
production.

🧑‍💻 For Developers, by developers: The engineers building
software are the best equipped to fix bugs, including security bugs. As
engineers ourselves, we're building tools that we wish existed to make
our job easier!

🤖 Simple to Automate in CI: Tests belong in CI, running on every commit
and PRs. We make it easy, and provide results right in your PRs where
you want them. Adding Mayhem for API to a DevOps pipeline is easy.

Want to try it? [Get started for free!](https://www.mayhem.security/get-started)!

## Example GitHub Actions Integration

This repository contains a simple Node.js Express API application being tested by Mayhem for API.

### Starting a Mayhem for API scan in Github Actions

To scan your Node.js API with Mayhem for API in CI, you need to:
1) Start your API
2) Start the Mayhem for API scan

In GitHub actions, those steps translate to:

```yaml
    - name: Run API
      run: node src/app.js &

    # Run Mayhem for API
    - name: Run Mayhem for API to check for vulnerabilities
      uses: ForAllSecure/mapi-action@v2
      with:
        mayhem-url: https://app.mayhem.security
        mayhem-token: ${{ secrets.MAYHEM_TOKEN }}
        api-url: http://localhost:3000
        api-spec: http://localhost:3000/api-docs
```
This repo contains a full example workflow for reference.

## Reports
Mayhem for API generates reports when you pass sarif-report or html-report to the input. Make sure to pass continue-on-error to the Mayhem for API step if you want to process the reports in follow-up steps.

### Artifact HTML Report

![sample report](https://mayhem4api.forallsecure.com/downloads/img/sample-report.png)

To artifact the report in your build, add this step to your pipeline:

```yaml
- name: Run Mayhem for API to check for vulnerabilities
  uses: ForAllSecure/mapi-action@v2
  continue-on-error: true
  with:
    mayhem-url: https://app.mayhem.security
    mayhem-token: ${{ secrets.MAYHEM_TOKEN }}
    api-url: http://localhost:3000 # <- update this
    api-spec: your-openapi-spec-or-postman-collection.json # <- update this
    html-report: mapi.html

# Archive HTML report
- name: Archive Mayhem for API report
  uses: actions/upload-artifact@v3
  with:
    name: mapi-report
    path: mapi.html
```

## GitHub Code Scanning support
![GitHub Code Scanning support](http://mayhem4api.forallsecure.com/downloads/img/sarif-github.png)

Uploading SARIF reports to GitHub allows you to see any issue found by
Mayhem for API right on your PR, as well as in the "Security" tab of
your repository. This currently requires you to have a GitHub Enterprise
Plan or have a public repository. To upload the SARIF report, add this
step to your pipeline:

```yaml
- name: Run Mayhem for API to check for vulnerabilities
  uses: ForAllSecure/mapi-action@v2
  continue-on-error: true
  with:
    mayhem-url: https://app.mayhem.security
    mayhem-token: ${{ secrets.MAYHEM_TOKEN }}
    api-url: http://localhost:3000 # <- update this
    api-spec: your-openapi-spec-or-postman-collection.json # <- update this
    sarif-report: mapi.sarif

# Upload SARIF file (only available on public repos or github enterprise)
- name: Upload SARIF file
  uses: github/codeql-action/upload-sarif@v2
  with:
    sarif_file: mapi.sarif
```

## CI Workflow Example for Node.js Application
Refer to the mapi.yml in this repository for a full example of integrating Mayhem for API with a Node.js Express application, including setting up the environment, running the application, and integrating the testing workflow.