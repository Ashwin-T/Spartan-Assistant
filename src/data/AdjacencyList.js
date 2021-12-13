/*print("Hello World!");

public void setMyGender(){
    if(lover.equals("male") && gender.equals("Male")){
        gay = true;
    }else if(lover.equals("tree")){
        gender = "some wack shit";
    }else if(lover.equals("Ryan" && "Josie"){
        gender = "Ashwin";
    }

    while(gender = "Ashwin"){
        int rejectionRate = 100;
    }

    if(gender = "Taiga"){
        int rejectionRate = -100000;
    }
}
*/


// ok so heres what needs to happen. In order for the algorithm to work, we need to to take each intersection: 
//1. find the coords of it 2. take the connecting intersections to it and put the coords in the adjacentNodes property
//wait we decided to create our own algorithm?
//yes and its hard LOL
//why cant we just use the free api given
//bc its not free


const adjacencyList = new Map()

const addNode = (intersection) =>{
    adjacencyList.set(intersection, []);
}
const addPath = (origin, destination)=>{
    adjacencyList.get(origin).push(destination)
    adjacencyList.get(destination).push(origin)
}
