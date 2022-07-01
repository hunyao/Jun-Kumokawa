# [Jun-Kumokawa](#)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://mit-license.org/) ![Japanese](https://img.shields.io/badge/Japanese_(ja__JP)-100%-green) ![English](https://img.shields.io/badge/English_(en__US)-30%-yellow) ![Estonian](https://img.shields.io/badge/Estonian_(et__EE)-0.1%-red) ![HTML](https://img.shields.io/badge/HTML-100%-green) ![Cascading Style Sheet](https://img.shields.io/badge/Cascading_Style_Sheet-100%-green) ![JavaScript](https://img.shields.io/badge/JavaScript-100%-green) ![Node.js](https://img.shields.io/badge/Node.js-100%-green) ![Human](https://img.shields.io/badge/Human-v30.0-blue) ![platform](https://img.shields.io/badge/platform-Ubuntu-blue) ![dependencies](https://img.shields.io/badge/dependencies-ubuntu_|_vim_|_hhkb_|_trackball_|_urxvt-success) ![Theme](https://img.shields.io/badge/Theme-dark-%23333333)

Jun-Kumokawa is an efficient and flexible Human library for making web systems.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

[Learn how to use Jun-Kumokawa in your own project](#examples).

# Getting Started with Jun-Kumokawa

This website was built with [Create React App](https://github.com/facebook/create-react-app) , [MUI](https://github.com/mui-org/material-ui) and so on, and the design was inspired by GitHub already you know.

## Installation

npm:

``` shell
$ npm install Jun-kumokawa --save
```

yarn:

``` shell
$ yarn add Jun-Kumokawa
```

ubuntu:

``` shell
$ sudo apt install Jun-Kumokawa
```

## Examples

Here is the first one to hire me:

### Simple code to hire me in TypeScript

``` typescript
import JunKumokawa from 'Jun-Kumokawa';

const JunKumokawaA: JunKumokawa = new JunKumokawa({
  offer: true
});

JunKumokawaA
  .offerToHire()
  .then((response: boolean) => {
    JunKumokawaA.hire();
  })
  .catch(error => {
    if (error instanceof CannotHireException) {
      throw new WhyCouldNotWeMakeItException();
    } else {
      throw new HumanErrorException(error);
    }
  })
```

This example will offer to hire me, then you can hire me if I would like to.

## Who the hell are you?🤔

I am a self-learned developer who are made in Japan.

I learned HTML, CSS, JavaScript and PHP by myself when I was a high school student.

Also, I built my own home server:
  * Web server
  * Mail server
  * DNS server
  * and so on...

I have my own email address that works on the my mail server either.

I always think how to work, how to code and how to live efficiently. So I have been making a lot of scripts to do jobs efficiently on working. Also I helped members to solve their problems to keep going a project smoothly.

I always learn the new technologies while I work when a project takes new technologies.

I have developed systems with Windows and Ubuntu on projects and I recently develop with Ubuntu.

I have experienced:
  * designing databases, screens, apis, environments
  * coding and testing screens, apis
  * managing junior engineers

I can code HTML, CSS, JavaScript with and without frameworks and libraries.

I can code both of front-end and back-end by alone or a team

## Available Human Languages

In the world, I can:

### speak Japanese 🇯🇵

Speaks the language as native language in the production mode at everywhere.

### speak English 🌏

Speaks the language as second language in the development mode at everywhere.

### speak Estonian 🇪🇪

Can just say "Hi!" so far

## Available Coding Languages

In computers, I can:

### code JavaScript

Codes somethig whatever you want with the language in the production mode at everywhere

### code HTML

Codes somethig whatever you want with the language in the production mode at everywhere

### code CSS

Codes somethig whatever you want with the language in the production mode at everywhere

See the section Skills for more information.

## Contributing

The main purpose of this website is to continue evolving all of us, making it more efficient and smarter to survive in the world. Development of Jun-Kumkoawa happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

Jun-Kumokawa is [MIT licensed](https://mit-license.org/).

Copyright (c) 1992-present, Jun-Kumokawa

This Jun-Kumokawa has Super Cow Powers.
**DO NOT OPEN [THE PAGE](/moo)**
