# Ganni space tech setup

## GIT

We are using a GIT flow with the following branches:

Master (gannispace.com)
Staging (staging.gannispace.com)
develop (ganni-showroom.sorthvid.design)  
Features/\*

The Master and staging are hosted on Ganni's Netlify account (josefine.laigaard@ganni.com) contact esben@sorthvid.net for password. Develop branch is hosted on sorthvid's Netlify account. All environments are running as branch deploys which means that the main branches will build individually on pushes.

Every new releases should be tagged accordingly with correct SEM versions and release notes. ex. use yarn version manager to automatically bumb a version and add a new tag `yarn version mayor|minor|patch`.

## CMS

### 🔐 Local Setup

To start a local CMS server run `$ yarn cmsdev` and `$ yarn dev` after inserting this codesnippet in /static/config.yml

```yml
local_backend:
  url: http://localhost:8081/api/v1
```
