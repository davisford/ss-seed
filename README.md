# ss-ssed

This is a seed project for [SocketStream](http://socketstream.com) projects.  It's also the base repo used for a talk I'm presenting for the [Detroit Node Meetup](http://www.meetup.com/DetNode) on [Thursday, March 21, 2013](http://www.meetup.com/DetNode/events/68281302/).

The tags in this repo present specific snapshots of development where I'm continually building + modifying the base SocketStream default chat demo project and adding more and more integration with other tech at each tag commit.  The first tag is the stock demo chat app that SocketStream creates for you when you run the command: `socketstream -j new {project-name}`

# Installing SocketStream

You only need to install SocketStream globally with npm if you want to use it to bootstrap a new project.  Otherwise, if you clone this repo, you can install it via running `npm install` in the repo directory to install dependencies in `package.json` (SocketStream included).

# Installing nodemon

Highly recommend installing [nodemon](https://github.com/remy/nodemon) and running with `nodemon` during development so you can take advantage of live reload (which is awesome).

```
npm install -g nodemon
```

# Clone Repo

```
git clone git://github.com/davisford/ss-seed.git
```

# Checkout a particular tag

```
git checkout {tagname}
```

Tags are numbered sequentially 1, 2, 3, 4, ...  each tag adds more stuff, building on the previous tag.  *IMPORTANT*: After you checkout a tag, make sure you run `npm install` to update the dependencies (they often change between tags).

# Running the App
_don't forget_ `npm install`

```
nodemon app.js
```

Open the web browser on http://localhost:3000