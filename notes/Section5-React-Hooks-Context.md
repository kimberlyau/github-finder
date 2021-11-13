# XXV: Overview of Hooks & Context

## What are Hooks?

-   Hooks are functions that let us hook into React state and lifecycle features from a function component
    -   i.e. Usage of `componentDidMount()` would be limited to only class based components
-   Ex:
    -   `useState`
        -   Allows state within functional component
    -   `useEffect`
        -   Mimics lifecycle methods in functional component
    -   `useContext`
        -   Makes it easy to bring in context into any component
    -   `useReducer`
        -   Redux-like reducer
            -   Reducer: function to dispatch actions to for app level state
    -   `useRef`
        -   Deals w/ React refs

### Usage

`import {useState, useEffect} from 'react';`
