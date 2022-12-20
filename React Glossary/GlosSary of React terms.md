
*****

<p style="text-align:center"><img src='https://miro.medium.com/max/828/1*a-HMmQFQNC76zCZBZfFgJg.gif' alt="Logo"></p>
<h1 style="color:white;font-size:40px;text-align:center; ></h1>
<h1 align="center">
 <p style="text-align:center;"><img src=https://img.shields.io/badge/_GLOSSARY_OF_REACT-%233330.svg?style=for-the-badge&logo=react alt="Logo"></p>
 <h1 style="color:#5DD3D1;font-size:40px;text-align:center; ></h1>
<h1 align="center">Glosary of React terms</h1>
 Principal concepts about React

 [![JavaScrip](https://img.shields.io/badge/_About_Glossary-%233330.svg?style=for-the-badge&logo=react)](#about)
## Table of contents <a id="table"> </a>
1. [Previus Javascript concepts](https://github.com/Sesierras/Sesierras.github.io/tree/main/JavaScript-Dictionary)
1. [Introduction concepts](#introduction)
1. [Hooks](#hooks)
1. [Styles](#styles)
1. [Events](#event)
 1. [Forms](#forms)
1. [Routes](#routes)
1. [Asynchronism](#asynchronism)
1. [Important terms](#terms)

-------------------------------------------

1. ##  [Introduction Concepts](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom)<a id="introduction"> </a>

* * *

- ###  Bundles
Most React apps will have their files **“bundled”** using tools like Webpack, Rollup or Browserify. Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once.


- ### DOM & virtual DOM
In React, for every DOM object, there is a corresponding “virtual DOM object.” A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing’s power to directly change what’s on the screen. In another words; The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

This approach enables the declarative API of React: You tell React what state you want the UI to be in, and it makes sure the DOM matches that state. This abstracts out the attribute manipulation, event handling, and manual DOM updating that you would otherwise have to use to build your app. Since “virtual DOM” is more of a pattern than a specific technology, people sometimes say it to mean different things. In React world, the term “virtual DOM” is usually associated with React elements since they are the objects representing the user interface. React, however, also uses internal objects called “fibers” to hold additional information about the component tree. They may also be considered a part of “virtual DOM” implementation in React.

**Is the Shadow DOM the same as the Virtual DOM?**
No, they are different. The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.

**What is “React Fiber”?**
Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM. Read more.

Manipulating the DOM is slow. Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

- ### Difference **CRA & Vite  bundles**
Create React App (CRA) has long been the go-to tool for most developers to scaffold React projects and set up a dev server. It offers a modern build setup with no configuration. But, we see increased development and build time when the project size increases. This slow feedback loop affects developers’ productivity and happiness. To address these issues, there is a new front-end tooling in the ecosystem: Vite!

Unlike CRA, Vite does not build your entire application before serving, instead, it builds the application on demand. It also leverages the power of native ES modules, esbuild, and Rollup to improve development and build time.

- **Why is CRA slow?**
CRA uses a webpack under the hood. The webpack bundles the entire application code before it can be served. With a large codebase, it takes more time to spin up the development server and reflecting the changes made takes a long time.

- ****What is Vite?****
Vite is a next-generation, front-end tool that focuses on speed and performance.
	*	It consists of two major parts:
	**1.**  *A development server* that provides rich feature enhancements over native ES modules: fast Hot Module Replacement (HMR), pre-bundling, support for typescript, jsx, and dynamic import.
	**2.** *A build command* that bundles your code with Rollup, pre-configured to output optimized static assets for production.
- ### JSX
JSX is a **syntax extension to JavaScript**. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to ***React.createElement()*** calls which return plain JavaScript objects called “React elements”. To get a basic introduction to JSX see the docs here and find a more in-depth tutorial on JSX here.

React DOM uses camelCase property naming convention instead of HTML attribute names. For example, tabindex becomes tabIndex in JSX. The attribute class is also written as className since class is a reserved word in
JavaScript:
```Jsx
<h1 className="hello">My name is Clementine!</h1>
```


* ### Elements
React elements are the building blocks of React applications. One might confuse elements with a more widely known concept of “components”. An element describes what you want to see on the screen. React elements are immutable.
```Jsx
const element = <h1>Hello, world</h1>;
```
Typically, elements are not used directly, but get returned from components.

* ### Components
React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element:

```Jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```


Components can also be ES6 classes:
```Jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Components can be broken down into distinct pieces of functionality and used within other components. Components can return other components, arrays, strings and numbers. A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component. Component names should also always start with a capital letter (<Wrapper/> not <wrapper/>). See this documentation for more information on rendering components.


- ### Props
props are inputs to a React component. They are data passed down from a parent component to a child component.

Remember that props are readonly. They should not be modified in any way:
```Jsx
// Wrong!
props.number = 42;
```
If you need to modify some value in response to user input or a network response, use state instead.

- ### Props.children
 ==props.children==  is available on every component. It contains the content between the opening and closing tags of a component. For example:
```jsx
<Welcome>Hello world!</Welcome>
```
The string Hello world! is available in props.children in the Welcome component:
```
function Welcome(props) {
  return <p>{props.children}</p>;
}
```
For components defined as classes, use this.props.children:

```Jsx
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```
- ### State
Data that is mutated in a component's life. Through the use of state, we can update and maintain information within a component instead of having to rely on a parent. A component needs state when some data associated with it changes over time. For example, a Checkbox component might need isChecked in its state, and a NewsFeed component might want to keep track of fetchedPosts in its state.

The most important difference between state and props is that props are passed from a parent component, but state is managed by the component itself. A component cannot change its props, but it can change its state.

For each particular piece of changing data, there should be just one component that “owns” it in its state. Don’t try to synchronize states of two different components. Instead, lift it up to their closest shared ancestor, and pass it down as props to both of them.


Lifecycle Methods
Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM (mounting), when the component updates, and when the component gets unmounted or removed from the DOM.

- ### Controlled vs. Uncontrolled Components
React has two different approaches to dealing with form inputs.

1. - An input form element whose value is controlled by React is called a controlled component. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

2. 	- An uncontrolled component works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can’t force the field to have a certain value.

In most cases you should use controlled components.

- ### Keys
A “key” is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don’t need to be unique across the whole application or even a single component.

Don’t pass something like Math.random() to keys. It is important that keys have a “stable identity” across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as post.id.

- ### Refs
React supports a special attribute that you can attach to any component. The ref attribute can be an object created by React.createRef() function or a callback function, or a string (in legacy API). When the ref attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to “make things happen” in your app, consider getting more familiar with top-down data flow.

- ### Events
	 Handling events with React elements has some syntactic differences:
	*	It consists of two major parts:
	1. React event handlers are named using camelCase, rather than lowercase.
	2.  With JSX you pass a function as the event handler, rather than a string.
- ### Reconciliation
When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called “reconciliation”.

<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *

2. ## [Hooks](https://www.w3schools.com/react/react_hooks.asp) <a id="hooks"> </a>


**Hooks were added to React in version 16.8.** Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed. Hooks are functions that let you “hook into” React state and lifecycle features from function components. ==**Hooks don't work inside classes**== — they let you use React without classes. **(We don't recommend rewriting your existing components overnight but you can start using Hooks in the new ones if you'd like.)**

- ### Hooks in React

Here is an example of a Hook; here we are using the useState Hook to keep track of the application state..
```Jsx
import React, { useState } from "react"; // Too important. State generally refers
to application data or properties that need to be tracked.
import ReactDOM from "react-dom/client"; //You must import Hooks from react.

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```

- #### ==Hook Rules==
There are **3** rules for hooks:

1. Hooks can only be called inside React function components.
2. Hooks can only be called at the top level of a component.
3. Hooks cannot be conditional

### Hook useState
The React useState Hook allows us to track state in a function component. State generally refers to data or properties that need to be tracking in an application.

```Jsx
`Use the state variable in the rendered component.`

`At the top of your component, import the useState Hook.`
import { useState } from "react";

`We initialize our state by calling useState in our function component.`
import ReactDOM from "react-dom/client";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return <h1>My favorite color is {color}!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);
```
### Hook useEffect
### [Hook useEffect](https://dmitripavlutin.com/react-useeffect-explanation/)

The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: ***fetching data, directly updating the DOM, and timers.*** UseEffect accepts two arguments. The second argument is optional.
```useEffect(<function>, <dependency>)```

A functional React component uses props and/or state to calculate the output. If the functional component makes calculations that don't target the output value, then these calculations are named side-effects.

- Examples of side-effects are fetch requests, manipulating DOM directly, using timer functions like setTimeout(), and more.

The component rendering and side-effect logic are independent. It would be a mistake to perform side-effects directly in the body of the component, which is primarily used to compute the output.

```jsx
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output
  // Bad!
  document.title = `Greetings to ${name}`; // Side-effect!
  return <div>{message}</div>;       // Calculates output
}
```
How to decouple rendering from the side-effect? Welcome useEffect() — the hook that runs side-effects independently of rendering.

```jsx
import { useEffect } from 'react';
function Greet({ name }) {
  const message = `Hello, ${name}!`;   // Calculates output
  useEffect(() => {
    // Good!
    document.title = `Greetings to ${name}`; // Side-effect!
  }, [name]);
  return <div>{message}</div>;         // Calculates output
}
```

How often the component renders isn't something you can control — if React wants to render the component, you cannot stop it. **useEffect(callback, dependencies)** is the hook that manages the side-effects in functional components. callback argument is a function to put the side-effect logic. dependencies is a list of dependencies of your side-effect: being props or state values.

useEffect(callback, dependencies) invokes the callback after initial mounting, and on later renderings, if any value inside dependencies has changed. The next step to mastering useEffect() is to understand and avoid the infinite loop pitfall.

<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *
3. ## [React Styles](https://www.w3schools.com/react/react_css.asp) <a id="styles"> </a>

There are many ways to style React with CSS, this tutorial will take a closer look at inline styling, and CSS stylesheet.

**- Inline Styling**
To style an element with the inline style attribute, the value must be a JavaScript object:



```jsx
`Insert an object with the styling information.`

class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1 style={{color: "red"}}>Hello Style!</h1>
      <p>Add a little style!</p>
      </div>
    );
  }
}
```

 - **camelCased Property Names**
Since the inline CSS is written in a JavaScript object, properties with two names, ==like background-color, must be written with camel case syntax:==

```jsx
`Use backgroundColor instead of background-color`

class MyHeader extends React.Component {
  render() {
    return (
      <div>
      <h1 style={{backgroundColor: "lightblue"}}>Hello Style!</h1>
      <p>Add a little style!</p>
      </div>
    );
  }
}

```

Import the stylesheet in your component:
```Jsx
`App.js:`
import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './mystyle.module.css';

class Car extends React.Component {
  render() {
    return <h1 className={styles.bigblue}>Hello Car!</h1>;
  }
}

export default Car;
 ```


Import the component in your application:
```Jsx
`index.js:`
import React from 'react';
import ReactDOM from 'react-dom/client';
import Car from './App.js';

ReactDOM.render(<Car />, document.getElementById('root'));
```

<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *

4. ## [Event management](https://reactjs.org/docs/handling-events.html) <a id="event"> </a>
### Events Javascript vs React
 React events are named using camelCase, rather than lowercase. With **JSX you pass a function as the event handler**, rather than a string.
For example, the HTML:
```Jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
is slightly different in React:
```Jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
Another difference is that you cannot return false to prevent default behavior in React. You must call preventDefault explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:
```Jsx
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```
In React, this could instead be:
```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```
Here, e is a synthetic event. React defines these synthetic events according to the W3C spec, so you don’t need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the SyntheticEvent reference guide to learn more.

When using React, you generally don’t need to call addEventListener to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

When you define a component using an ES6 class, a common pattern is for an event handler to be a method on the class. For example, this Toggle component renders a button that lets the user toggle between **“ON” and “OFF” states:**

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```
<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *

5. ## [Forms](https://www.w3schools.com/react/react_forms.asp#:~:text=In%20React%2C%20form%20data%20is,handlers%20in%20the%20onChange%20attribute.) <a id="forms"> </a>
Just like in HTML, React uses forms to allow users to interact with the web page. You add a form with React like any other element:


```jsx
`Add a form that allows users to enter their name:`

function MyForm() {
  return (
    <form>
      <label>Enter your name:
        <input type="text" />
      </label>
    </form>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);
```
###  [React Formik](https://www.npmjs.com/package/formik)

Formik is a small group of React components and hooks for building forms in React and React Native. It helps with the three most annoying parts:

1. Getting values in and out of form state
2. Validation and error messages
3. Handling form submission.

By colocating all of the above in one place, Formik keeps things organized--making testing, refactoring, and reasoning about your forms a breeze.

- The Basics
We’re going to start with the most verbose way of using Formik. While this may seem a bit long-winded, it’s important to see how Formik builds on itself so you have a full grasp of what’s possible and a complete mental model of how it works.

- A simple newsletter signup form
Imagine we want to add a newsletter signup form for a blog. To start, our form will have just one field named email. With Formik, this is just a few lines of code.
```jsx
 import React from 'react';
 import { useFormik } from 'formik';

 const SignupForm = () => {
   // Pass the useFormik() hook initial form values and a submit function that will
   // be called when the form is submitted
   const formik = useFormik({
     initialValues: {
       email: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />

       <button type="submit">Submit</button>
     </form>
   );
 };
```

We pass our form’s initialValues and a submission function (onSubmit) to the useFormik() hook. The hook then returns to us a goodie bag of form state and helper methods in a variable we call formik. For now, the only helper methods we care about are as follows:

	- handleSubmit: A submission handler
	- handleChange: A change handler to pass to each <input>, <select>, or <textarea>
	- values: Our form’s current values
As you can see above, we pass each of these to their respective props...and that’s it! We can now have a working form powered by Formik. Instead of managing our form’s values on our own and writing our own custom event handlers for every single input, we can just use useFormik().
This is pretty neat, but with just one single input, the benefits of using useFormik() are unclear. So let’s add two more inputs: one for the user’s first and last name, which we’ll store as firstName and lastName in the form.

```jsx
import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *

6. ## [Routes](https://reactrouter.com/en/main/components/routes) <a id="routes"> </a>
###  React  router **V6**

Rendered anywhere in the app,  Routes will match a set of child routes from the current location.

```jsx
interface RoutesProps {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
}

<Routes location>
  <Route />
</Routes>;
```
If you're using a data router like createBrowserRouter it is uncommon to use this component as it does not participate in data loading.

Whenever the location changes, Routes looks through all its child routes to find the best match and renders that branch of the UI. Route elements may be nested to indicate nested UI, which also correspond to nested URL paths. Parent routes render their child routes by rendering an Outlet.

```jsx
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>
```


* * *


6. ## [Asynchronism](https://docs.react-async.com/) <a id="asynchronism"> </a>

React Async is a utility belt for declarative promise resolution and data fetching. It makes it easy to handle asynchronous UI states, without assumptions about the shape of your data or the type of request. **React Async consists of a React component and several hooks. You can use it with fetch, Axios or other data fetching libraries, even GraphQL.**
*	**Rationale**
React Async is different in that it tries to resolve data as close as possible to where it will be used, while using declarative syntax, using just JSX and native promises. This is in contrast to systems like Redux where you would configure any data fetching or updates on a higher (application global) level, using a special construct (actions/reducers).

	* React Async works** well even in larger applications with multiple or nested data dependencies. It encourages loading data on-demand and in parallel at component level instead of in bulk at the route/page level. It's entirely decoupled from your routes, so it works well in complex applications that have a dynamic routing model or don't use routes at all.
React Async is promise-based, so you can resolve anything you want, not just fetch requests.
*	**Concurrent React and Suspense**
The React team is currently working on a large rewrite called Concurrent React, previously known as "Async React". Part of this rewrite is Suspense, which is a generic way for components to suspend rendering while they load data from a cache. It can render a fallback UI while loading data, much like <Async.Pending>.
React Async has no direct relation to Concurrent React. They are conceptually close, but not the same. React Async is meant to make dealing with asynchronous business logic easier. Concurrent React will make those features have less impact on performance and usability. When Suspense lands, React Async will make full use of Suspense features. In fact, you can already start using React Async right now, and in a later update, you'll get Suspense features for free. In fact, React Async already has experimental support for Suspense, by passing the suspense option.
### [API Fetching **V6**](https://www.copycat.dev/blog/react-fetch/)

Often times, in fullstack web applications, you are required to either interact with a database; this can be a relational or non-relational database, or interact with an API. In such scenarios, you will need to send or request data through some network. Fetch allows you to send or get data across networks. As a React developer, you should be able to comfortably consume APIs in your React applications in order to build a full-fledged React application.

What is a REST API: Fetching data from API
A REST API is an API (Application Programming Interface) which allows two software programs to communicate with each other. An API outlines the proper way for a developer to write a program requesting services from an operating system or other application.

REST stands for “Representational State Transfer” and it refers to an architectural style and approach to communication used in web services. REST APIs follow a structure known as the REST Structure for APIs. This consists of various rules that developers must follow when creating APIs.

Advantages of RESTFul APIs: Fetching data from API
The RESTful API architecture is advantageous over other similar technologies such as SOAP (Simple Object Access Protocol) because REST uses less bandwidth, making it more suitable for efficient internet usage. REST API is universal to language or platform as such, it can be consumed with any language or ran on any platform. RESTful APIs can also be built with programming languages such as JavaScript or Python.

Fetching data from API in React SPA
There are several methods to use REST APIs in a React application. These methods cut across using the built-in JavaScript fetch() API, to using your own custom React hook, to using third party libraries such as Axios, which is used to make an HTTP request from Node.js or XMLHttpRequests right from the browser.

When we make a data request from our application to an API, we must set up a state to store the data when it returns. Like Redux, a state is kept in a context object or a state management tool. But in order to keep things straightforward, we will store the returned data in the local state of React using useState React hook.

The next step is to provide a state to manage the loading phase of your application in order to enhance the user experience and a second state to manage the error in the event that something goes wrong

With that said, we therefore will have the following states:

```Jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```
**Where Should you use the Fetch Method in React Application?**
In your React application, you should always make your fetch request in the componentDidMount lifecycle method in a class component or using the useEffect hook in a functional component.

This is due to the fact that when we fetch data from the backend, we perform an operation known as a side effect, which can result in a variety of outcomes for the same data fetching. The identical request can, for instance, return a success or an error. In React, we should avoid performing side effects directly within the component body to avoid inconsistencies.

In this case, we will fetch our data in the Hook like so:

```jsx
componentDidMount() {
  fetch(`https://api.github.com/users/eunit99/repos`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}
```

```jsx
// Note: the empty deps array [] means
// this useEffect will run once
// similar to componentDidMount()
useEffect(() => {
  fetch(`https://api.github.com/users/eunit99/repos`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
}, [])
```
A sample API response may look like so:

```jsx
{
  "id": 350135946,
  "node_id": "MDEwOlJlcG9zaXRvcnkzNTAxMzU5NDY=",
  "name": "advance-loan",
  "full_name": "Eunit99/advance-loan",
  "private": false,
  "owner": {
    "login": "Eunit99",
    "id": 24845008,
    "node_id": "MDQ6VXNlcjI0ODQ1MDA4",
    "avatar_url": "https://avatars.githubusercontent.com/u/24845008?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Eunit99",
    "html_url": "https://github.com/Eunit99",
    "followers_url": "https://api.github.com/users/Eunit99/followers",
    "following_url": "https://api.github.com/users/Eunit99/following{/other_user}",
    "gists_url": "https://api.github.com/users/Eunit99/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Eunit99/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Eunit99/subscriptions",
    "organizations_url": "https://api.github.com/users/Eunit99/orgs",
    "repos_url": "https://api.github.com/users/Eunit99/repos",
    "events_url": "https://api.github.com/users/Eunit99/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Eunit99/received_events",
    "type": "User",
    "site_admin": false
  },
  "html_url": "https://github.com/Eunit99/advance-loan",
  "description": null,
  "fork": false,
  "url": "https://api.github.com/repos/Eunit99/advance-loan",
  "forks_url": "https://api.github.com/repos/Eunit99/advance-loan/forks",
  "keys_url": "https://api.github.com/repos/Eunit99/advance-loan/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/Eunit99/advance-loan/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/Eunit99/advance-loan/teams",
  "hooks_url": "https://api.github.com/repos/Eunit99/advance-loan/hooks",
  "issue_events_url": "https://api.github.com/repos/Eunit99/advance-loan/issues/events{/number}",
  "events_url": "https://api.github.com/repos/Eunit99/advance-loan/events",
  "assignees_url": "https://api.github.com/repos/Eunit99/advance-loan/assignees{/user}",
  "branches_url": "https://api.github.com/repos/Eunit99/advance-loan/branches{/branch}",
  "tags_url": "https://api.github.com/repos/Eunit99/advance-loan/tags",
  "blobs_url": "https://api.github.com/repos/Eunit99/advance-loan/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/Eunit99/advance-loan/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/Eunit99/advance-loan/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/Eunit99/advance-loan/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/Eunit99/advance-loan/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/Eunit99/advance-loan/languages",
  "stargazers_url": "https://api.github.com/repos/Eunit99/advance-loan/stargazers",
  "contributors_url": "https://api.github.com/repos/Eunit99/advance-loan/contributors",
  "subscribers_url": "https://api.github.com/repos/Eunit99/advance-loan/subscribers",
  "subscription_url": "https://api.github.com/repos/Eunit99/advance-loan/subscription",
  "commits_url": "https://api.github.com/repos/Eunit99/advance-loan/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/Eunit99/advance-loan/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/Eunit99/advance-loan/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/Eunit99/advance-loan/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/Eunit99/advance-loan/contents/{+path}",
  "compare_url": "https://api.github.com/repos/Eunit99/advance-loan/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/Eunit99/advance-loan/merges",
  "archive_url": "https://api.github.com/repos/Eunit99/advance-loan/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/Eunit99/advance-loan/downloads",
  "issues_url": "https://api.github.com/repos/Eunit99/advance-loan/issues{/number}",
  "pulls_url": "https://api.github.com/repos/Eunit99/advance-loan/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/Eunit99/advance-loan/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/Eunit99/advance-loan/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/Eunit99/advance-loan/labels{/name}",
  "releases_url": "https://api.github.com/repos/Eunit99/advance-loan/releases{/id}",
  "deployments_url": "https://api.github.com/repos/Eunit99/advance-loan/deployments",
  "created_at": "2021-03-21T22:29:30Z",
  "updated_at": "2021-09-03T01:11:41Z",
  "pushed_at": "2021-04-17T07:58:20Z",
  "git_url": "git://github.com/Eunit99/advance-loan.git",
  "ssh_url": "git@github.com:Eunit99/advance-loan.git",
  "clone_url": "https://github.com/Eunit99/advance-loan.git",
  "svn_url": "https://github.com/Eunit99/advance-loan",
  "homepage": null,
  "size": 25511,
  "stargazers_count": 1,
  "watchers_count": 1,
  "language": "JavaScript",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 0,
  "license": null,
  "allow_forking": true,
  "is_template": false,
  "web_commit_signoff_required": false,
  "topics": [],
  "visibility": "public",
  "forks": 0,
  "open_issues": 0,
  "watchers": 1,
  "default_branch": "main"
}
```
The sample response above is from the GitHub REST API when I make a GET request to the following endpoint *https://api.github.com/users/eunit99.* It returns all the stored data about a user called `eunit99`. With this response, we can decide to render it whichever way we like in our React app.
### [Axios](https://mauriciogc.medium.com/react-haciendo-peticiones-con-axios-y-hooks-27029dc36299)
When we're developing a real application, there's a point where we need to make requests to a API. React , unlike other frameworks/libraries, does not have its own way of consuming one API , so we have the freedom to use API Native Fetch  or some other library like **Axios  or  Apollo Client , etc.**


**Axiosis** a client HTTP API based on , which can be used in the browser and on a server with Node.js, works asynchronously , allowing REST  API calls with JSON return .  It is also one of the most popular promise - based clients , which is simple , lightweight , and very `XMLHttpRequestAxios` easy to customize .

We are going to create the request , where we will occupy useEffect.  Axios, as well as the state list that will save the list.
```Jsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Axios({
      url: "https://jsonplaceholder.typicode.com/posts",
    })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  return (
    <div className="App">
      <div>
        {list.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

<div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *

______________

# Important terms 📕📖<a id="terms"> </a>

### npm
A command line tool for handling packages of reusable JavaScript code designed to be shared.

### package.json
A list of dependencies, or what packages are required for a given js application. You can check for its presence by running “npm test” which will return “hotdog”. Running npm init  will create or edit an existing package.json file.

### npm install
Reads the package.json file and downloads the packages from npmjs.com where they are hosted. Will likely result in a dependency tree because the packages have dependencies, which have dependencies etc. To install a package in our local JSON file, run npm install followed by the package name.

### node
A JS runtime, allowing JavaScript to be run locally on your computer, instead of in a browser. A runtime is the period in which a computer is executing or software designed to support the execution of computer programs.

### framework
A standardized way of creating and deploying web applications.

### React
A JS framework with a specific way for designing and structuring a JS app, it offers both performance and composition benefits through its virtual DOM and JS extension, JSX.

### virtual DOM
The virtual DOM is a programming concept where an ideal("virtual") representation of a UI is kept in memory and synched with the real DOM. This is what enables React to be declarative meaning you can tell React what you want the UI to look like (the virtual DOM) and it will make the actual DOM match it without you having to do the manual DOM manipulation required in vanilla J.S.

### Babel
A transpiler that converts JSX into vanilla JS.

### Webpack
An open-source JavaScript module bundler.

### JSX
An extension of vanilla JS similar to html, it follows a declarative writing structure meaning you can express what you want the UI to look like and JSX will take care of the rest.

### Declarative vs. imperative(style of programming)
To write imperative code is to write how something is done in detail(written *explicit* steps). Declarative means you write what you would *like* to do. Most vanilla JS is imperative. React is considered declarative because you can create the structure of the UI without giving it the explicit commands necessary for DOM manipulation in traditional JS.


### Modular code
Code that is separated into separate files with each module being responsible for a single feature or functionality. Reasons you would want to separate your code into modules:
- adhere to the single responsibility principle
- easier to navigate
- easier to debug
- produces clean and DRY code (DRY - Don’t Repeat Yourself vs. WET - Write Everything Twice)

### component
Components modularize both functionality and presentation in our code, letting us split the UI into independent, reusable pieces, freeing us to think about each piece in isolation.

### component chain
The practice of linking files through importing and exporting.

### export default
We export to allow other files to import a files contents. Export default lets us denote that whatever follows that statement is the main thing we want to export.

### dynamic vs static components
A static component - also known  as a presentational or stateless component - is a component whose sole responsibility is rendering data passed down from the parent. A dynamic component may or may not include state, but does allow for user interactivity.

### Props
Props - short for "properties" - are reusable values that are passed down from a parent component to a child component. Props can be any datatype.

### Prop drilling
Data is passed from a component higher in the app hierarchy to a child component further down. It allows access to state at different levels of the component hierarchy.

### default props
A prop value assigned by the component responsible for rendering the props in the case that the props it receives are not what is expected and/or wanted. Default props should be used in the child component as opposed to conditional logic in the parent component passing the props to adhere to the single responsibility principle.

### Callback function
Generally speaking, a callback function is a function passed into another function as an argument. In the context of React, we send a callback function down from a parent component as props to a child. When the callback is invoked (an action), it can send data or change state in the parent component that owns it. The parent can then share that data with all of its children - including any siblings of the component that received the callback. Hence, what we mean by data down, actions up.

### Recursive component
A component that calls itself. Recursion is an example of a tree problem - the flow and logic resemble a tree structure.
Three main constructs are required to implement recursion with a component:
1. The seeder  - the initial value received as props
2. the invariant - the separate method that allows the component to call itself
3. the base case - this is the point at which the function should cease recursion (otherwise we’d overwhelm the call stack)

### Arrow functions in React
By using the arrow function, we implicitly bind a method to our class, thus preventing *this* from changing value and causing bugs when we use callbacks.

### Ternary in React
A method for conditionally rendering elements inline.
Its basic syntax is condition ? true : false.

### state
Data that is mutated in a component's life. Through the use of state, we can update and maintain information within a component instead of having to rely on a parent.

### this.setState()
A built in function used to update state in a *non-blocking* manner and alert React to re-render. This.setState() is asynchronous and waits for the component to finish performing its task before updating state. That this built in function alerts React of a change in state and therefore a need for a re-render is in contrast to the inefficient process of "dirty checking" which runs checks for changes of state instead of being alerted. Dirty checking is practiced by Angular, a rival framework

### synthetic events
An api wrapper which enables React to standardize how events are handles across all browsers.

### event pooling
Event Pooling is a performance increase that allows for synthetic event objects to be re-used by nullifying all values when the callback is invoked by an event. Whenever an event fires, the event's object is sent to a callback and "scrubbed" up for later use. This prevents you from accessing the event in an asynchronous way, however if you would like to, you can save it to a variable or call event.persist().

### [supported events](https://reactjs.org/docs/events.html#supported-events)
Events with built-in React handlers that are triggered by an event in the bubbling phase. Here is a list of built-in event handlers:

### event bubbling vs capturing
Event bubbling is when an event is first captured and handled by the inside element before before propagated to the outside elements. Event capturing (aka trickling) is when the event is first captured by the outermost element and the propagated to the inner most element. Trickle down, bubble up.

### controlled form
Unlike uncontrolled forms which can only have static display values passed down from a parent as props, a controlled form sets default values in state and derives its input values from state thus granting us control to render and restrict our inputs in time with the user.

### onChange
a built-in event which invokes an anonymous function that takes in the event as an argument. It is heavily employed in a controlled form to show live updates for what the user is inputting by making a an input field its target: it is triggered when ever the user strikes a key.

### onSubmit
A built-in event which invokes an anonymous function whenever a user hits enter/clicks submit. The anonymous function will then call a function for handling the submit event.

### Single-page Application
A single-page application is an application that loads a single HTML page and all the necessary assets (such as JavaScript and CSS) required for the application to run. Any interactions with the page or subsequent pages do not require a round trip to the server which means the page is not reloaded.

Though you may build a single-page application in React, it is not a requirement. React can also be used for enhancing small parts of existing websites with additional interactivity. Code written in React can coexist peacefully with markup rendered on the server by something like PHP, or with other client-side libraries. In fact, this is exactly how React is being used at Facebook.

### ES6, ES2015, ES2016, etc
These acronyms all refer to the most recent versions of the ECMAScript Language Specification standard, which the JavaScript language is an implementation of. The ES6 version (also known as ES2015) includes many additions to the previous versions such as: arrow functions, classes, template literals, let and const statements. You can learn more about specific versions here.

### Compilers
A JavaScript compiler takes JavaScript code, transforms it and returns JavaScript code in a different format. The most common use case is to take ES6 syntax and transform it into syntax that older browsers are capable of interpreting. Babel is the compiler most commonly used with React.

### Package Managers
Package managers are tools that allow you to manage dependencies in your project. npm and Yarn are two package managers commonly used in React applications. Both of them are clients for the same npm package registry.

### CDN
CDN stands for Content Delivery Network. CDNs deliver cached, static content from a network of servers across the globe.

 <div align="right">
 <p><a href="#table"><img src=https://img.shields.io/badge/_Return_to_table_of_contents-%233330.svg?style=for-the-badge&logo=react </a></p> <p style="text-align:right;" ></p>
  </div>


* * *
![JavaScript](https://img.shields.io/badge/--000?logo=react&logoColor=fffff)
## About this Glossary  <a id="about"> </a>
I took a lot of concepts from the web with the idea of collecting as much information as possible, making it easy to read and compress into one file.  👉 **The references are found as links in each of the main concepts.** ✅


## 🌱Contributing
![forthebadge](https://forthebadge.com/images/badges/ctrl-c-ctrl-v.svg)
Pull requests are welcome!.

* * *
Collected by [Sesierras](https://github.com/Sesierras) 👋


<div align="center">
 <p><a href="https://github.com/Sesierras"><img src=https://i.postimg.cc/hP8F7gF5/Logo-design-9.png></a></p>
 <p><a href="https://github.com/Sesierras"><img src=http://ForTheBadge.com/images/badges/built-with-love.svg></a></p>
  </div>
