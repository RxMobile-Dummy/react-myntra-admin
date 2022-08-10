
# React Clean Architecture
Applying clean architecture to a react codebase brings lots of benefits, most of them you can find by simply googling what's clean architecture and what should we adopt architectural patterns.
One advantage that strikes me is having business rules isolated from framework-specific things. This means that our core logic is not coupled to React, React Native etc...  
This gives you enough flexibility to, for example, move specific parts of the application to a backend, change libraries without too much pain, test once and reuse as many times as you want, share code between React and React Native applications, among others.   
This is a realistic approach, what I mean by that is: It's simple enough to be applicable and Robust enough to have it in a production environment.
Although I have greatly simplified it, for educational purposes, I believe that this example is of great value to get you started with applying architectural patterns and adapting them to your own needs.    


## Philosophy
![high-level-diagram](https://github.com/eduardomoroni/react-clean-architecture/blob/master/docs/images/high-level-diagram.jpg)  

The nomenclature may vary, but the concept behind this architectural pattern is: the domain dictates how tools should be organized and not the other way around.
What I mean by that is that we should organize our codebase around the business rules and not around the frameworks we use to achieve business rules.
The diagram above shows how the dependency rule works, the inner circles must not know about the outer circles. That is, there cannot be an import of a use case within an entity, or import of a framework within a use case.
Another important rule is: entities and use cases should not rely on external libraries. The explanation is simple, the core of our application must be robust enough and malleable enough to meet the demands of the business without needing any external intervention.

## Communication flow
![communication-flow-diagram](https://github.com/eduardomoroni/react-clean-architecture/blob/master/docs/images/communication-flow.jpg)  

### A brief explanation of each responsibility
- **Entity**: Application independent business rules
- **Interactor**: Application-specific business rules
- **Adapter**: Glue code from/to *Interactors* and *Presenter*, most of the time implementing a framework-specific behaviour.
  e. g.: We have to connect *Interactor* with react container, to do so, we have to connect *Interactor* with redux (framework) and then connect redux to container components.
- **Presenter**: Maps data from/to *Adapter* to/from *Components*.
- **Components**: Simplest possible unit of presentation. Any mapping, conversion, MUST be done by the *Presenter*.

## Sample apps DEMO
Talk is cheap, don't you think? That's why I'm sharing two sample apps to facilitate your digestion.  
A great advantage of following clean architecture is having all business logic self-contained and closer, in a readable way.  
Take a look at `core/entities/` and `core/useCases/` folders and see for yourself.

## Folder Structure
This repository contains 2 examples of how to implement react following clean architecture, represented by the [diagram](#philosophy) above, and both follow the same folder structure:
```
./src
├── core
│   └── lib
│       ├── adapters
│       │   └── redux
│       ├── entities
│       ├── frameworks
│       └── useCases
├── native
│   └── src
│       ├── components
│       └── stylesheets
└── web
    └── src
        ├── assets
        ├── components
        └── stylesheets
```
*Note:* the `frameworks` folder comprises framework-specific setups to have it available to the adapters.  

