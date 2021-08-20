# Simple projects

This extension provide a very simple way to manager your projects inside vscode. Once you told Simple projects where you store your projects it will let you switch between them without extra step.

## Features
Simple projects come with two commands :

* `simple-projects.openProject` to open a project
* `simple-projects.refreshProject` to refresh the projects list

Projects are fetched only on startup so if you create a new project while vscode is open you need to refresh the list before being able to switch to it.

## Extension Settings
This extension contributes the following settings:

* `simple-projects.sources`: an array of paths where the extensions should look to find your projects
* `simple-projects.newWindow`: tell the extension if projects should be opened in a new window.

## Release Notes

### 0.0.3
Add path as a description to know wich project you open if two have the same name

### 0.0.2
Fixing a bug when two projects shared the same name

### 0.0.1

Initial release of simple projects
