# Spartan Assistant Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project primarily uses React, Firebase, and Mapbox. View `package.json` for full list of dependences or here(https://github.com/Ashwin-T/Spartan-Assistant/network/dependencies)

## Requirements Prior to Development

1. Have Node.js installed on local machine
2. Add a file with a name of Secrets.jsx inside the `src\tools` directory. The contents of this file shall be provided on request
3. Run `git pull` and `npm install` to work with the newest version and download all dependences on local machine

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run deploy`

This script encapsulates two subscripts which allow for production build to be created and shipped to hosting:
#### `predeploy: npm run build` and `deploy: firebase deploy`

## How to Add New Data

### Graduation Data
To change Graduation Data change the following object inside `src\data\GraduationData.json`.
The object inside the file contains this shape:
```
{
    "currentGraduationYear": "2022", //Senior graduating year of current school year
    "freshmanGraduationYear": "2025" //Freshment graduating year of current school year
}
```

**Note: You must change this every year in order for the application to be fast and is a key part of its functionality**

### FAQs
Add new FAQS via adding to the 'faqs' array present in the directory `src\data\FaqEN.json`.
Each object inside the 'faqs' array should mimic this structure:
```
{
    "faq": "What activities could I get involved in?", //the faq
    "answer": "High school is your chance to branch out, try new things, discover passions, and make new friends! An updated list of clubs and information about sports and other programs may be found on the MVHS website." 
    //the answer to said faq
},
```

## Important Links
Add new important link via adding to the 'links' array present in the directory `src\pages\resources\Resources.jsx`.
Each object inside the 'links' array should mimic this structure:
```
{
    name: "Mvhs.io", //the name to be displayed
    link: "https://mvhs.io", //link to said page
    description: "Mvhs.io is a versitle app for MVHS staff and students.", //description of said link
    image: "images/mvhsioLogo.png", //image to display to the left of the link and will be cropped into a circle
},
```
### Rooms
Add new rooms via adding to the 'features' array present in the directory `src\data\Rooms.json`.
Each object inside the 'features' array should mimic this structure:
```
{
    "type":"Feature",
    "geometry":{
        "type":"Point",
        "coordinates": [
            -122.06789, //longitude
            37.36093 //latitude
        ]
    },
    "properties":{
        "wing":"100's", //wing name
        "itemType":"room", 
        "name":"101", //name of room
        "name2":"None" //if a room has a room directly above it place the room above in this space
    }
    },
```

### Other (Vending Machines, Parking, or Bike Racks)
Add new other locations via adding to the 'features' array present in the directory `src\data\Other.json`.
Each object inside the 'features' array should mimic this structure:
```
{
    "type":"Feature",
    "geometry":{
        "type":"Point",
        "coordinates": [
            -122.06625112990642, //longitude
            37.360707960267256 //latitude
        ]
    },
    "properties":{
        "name" : "Bike Rack", //this can either be Bike Rack, Vending Machine, Parking Lot
        "key": "2" //option value to distinguish between objects 
    }
    },
```

### Contruction
Add new contruction area via adding to the 'constructionCoords' array present in the directory `src\pages\map\Constructionjsx`.
The 'constructionCoords' array should mimic this structure:
```
const constructionCoords = [
   [ 
        [
            [-122.06752065872784, 37.36014825552563],
            [-122.06751529102094, 37.36034875461623],
            [-122.06763338057628, 37.360361552412726],
            [-122.06764411599033, 37.36070709208356],
            [-122.06802522319214, 37.36069429434605],
            [-122.0680681648487, 37.360984375853995],
            [-122.0682560345959, 37.360984375853995],
            [-122.0682560345959, 37.360280499666594],
            [-122.06804132960308, 37.36023784239776],
            [-122.06804669731022, 37.36014825763118]
        ], 
        [
            [-122.06591376463683, 37.36018852332536],
            [-122.06601233304356, 37.35974725573569],
            [-122.06579225705387, 37.35974725573569],
            [-122.06577078622549, 37.359580882853216],
            [-122.06513306976764, 37.3595638189000],
            [-122.065115206145, 37.360224731586825]
        ],
        [ //this is a new area of construction. Each sub-array includes the perimeter points of said area
            [
                //longitude,
                //latitude
            ],
            [
                //longitude,
                //latitude
            ],
            [
                //longitude,
                //latitude
            ]
        ]     
    ]
]
```
## Fun Words
To change the fun words on the home page edit the contents of an/the array(s) in the directory `src\data\FunWords.json`
Within the object in said directory there are five arrays each including strings of words thats start with the same letter as the name of the array. Add, change, or delete accordingly.
