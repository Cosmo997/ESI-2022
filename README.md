# ESI-2022

<div align="center">
   
<img src="https://user-images.githubusercontent.com/45004856/174649866-33fdcf32-f2f5-4f18-8ee3-a6e6058d5c53.jpeg" width="400" height="150">
   
**&**
   
<img src="https://user-images.githubusercontent.com/45004856/174649734-bf1028af-33f3-43f8-b3b8-e43a97c26a5f.png" width="400" height="200">
   
</div>

## Table of contents

1. [Project Overview](#about)

2. [Get Started](#get_started)

3. [WIKI](https://github.com/Cosmo997/ESI-2022/wiki)

4. [Presentation]()
   
5. [Technologies](#technologies)
   
    - [Camunda Platform 7](#platform)
    - [SpringBoot](#springboot)
    - [NodeJs](#node)

6. [Project Team](#project_team)


## About the Project <a name="about"/>

Main target of the project is to demonstrate the advantages of a BPMN Engine in the enterprise
to carry on and track most of the repetitive tasks and processes happening in the organization.

## Get Started <a name="get_started"/>

* First of all, make sure to have [Camunda](https://camunda.com/download/) running.
<img width="1788" alt="Screenshot 2022-06-18 at 12 00 46" src="https://user-images.githubusercontent.com/45004856/174432801-f2d51aa2-463f-408e-9f01-9b4c27af5c31.png">

* After that, make sure to have at least one process deployed on the Camunda Platform Engine. 

* Then go to the Cockpit link [CockPit-Processes](http://localhost:8080/camunda/app/cockpit/default/#/processes) and verify that the version of the process is correct by clicking on it.


* After that, start the relative Worker insiede the NODE project by running the following commands:
``` 
npm install
```

Then run the relative worker script defined inside the package.json file.  
``` 
npm run 'name-of-worker' 
```

<img width="486" alt="Screenshot 2022-06-18 at 12 14 38" src="https://user-images.githubusercontent.com/45004856/174433318-eb44b20c-6ae7-4736-ac8d-d3c7e4511e11.png">

* Then go to [TaskList Section](http://localhost:8080/camunda/app/tasklist) of Camunda Platform Engine, click on **Start Process** and now, we can start the entry process mark with START at the end of the name.


Now the process is correctly running and the external task client is subscribed to it's relative Service Task.

## Technologies <a name="technologies"/>

1. [Camunda Platform 7](https://camunda.com/) <a name="platform"/>

<img src="https://camunda.com/wp-content/uploads/2021/06/Organic-Social-Previews-Camunda-Website_1200x627_Camunda-Platform.png" alt="SpringBoot" width="300" height="150" />

2. [SpringBoot](https://spring.io/projects/spring-boot) <a name="springboot"/>

<img src="https://spring.io/images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg" alt="SpringBoot" width="300" height="100" />

3. [NodeJs](https://nodejs.org/en/) <a name="node"/>

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png" alt="Node" width="300" height="100" />

## Project Team <a name="project_team"/>

Member | Email |
---- | ---- |
 Daniele Moschini | <daniele.moschini@studenti.unicam.it> |
 Damiano Serpetta | <damiano.serpetta@studenti.unicam.it> |
 Michele Benedetti | <michele.benedetti@studenti.unicam.it> |

