let ansArr =[]
let data

// Function to display list elements
function displayList(ansArr) {
    let resultList = document.getElementById("demo");

    // Iterate over ansArr and create LI elements explictly the same can be acheiveed using some component like in react was done
    ansArr.forEach(dataInfo => {
        // Create a new list item
        let listItem = document.createElement("li");

        // Convert dataInfo to a string and set it as the content of the list item
        listItem.textContent = dataInfo.join(", ");

        // Append the list item to the UL
        resultList.appendChild(listItem);
    });
}

async function getApi(name, page ){
    try {
        //The fetch function initiates a network request and returns a Promise that resolves to the Response object representing the response to the request.
        const response = await fetch(`https://jsonmock.hackerrank.com/api/weather/search?name=${name}&page=${page}`);
        if(response.ok){
            /*
            The .json() method is required when working with the Fetch API in JavaScript to extract the JSON body content from the response. When you make a network request using fetch, the response doesn't immediately provide the actual data content. Instead, it returns a ReadableStream that needs to be processed appropriately.
            */

            //.json method thus helps in reading of the body of the response stream and parses it as JSON for easy manipulation
            const responseData = await response.json()
            //the data resides in the .data field of the response object
            data = responseData.data
        }
        //range over the entire "data" structure
        for(let i=0; i < data.length; i++){
            //converting the object data[i] into an array 
            const dataInfo = [
                data[i].name,
                data[i].weather,
                data[i].status,
            ]
            ansArr.push(dataInfo)
        }
        displayList(ansArr)



    } catch (err) {
        console.log("error occurred while fetching ", err);
    }
    console.log("ans is ", ansArr)

}
//Prompt the user and store the name query in a variable
let name = prompt("Enter name for query something:");

//can also accept page  from the user 
getApi(name, 1);

////*******USING 2ND APPROACH .THEN METHOD***** */


// function getApi() {
//     return fetch("https://jsonmock.hackerrank.com/api/weather/search?name=Ab&page=1")
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Network response was not ok");
//             }
//         })
//         .then(responseData => {
//             data = responseData.data;

//             for (let i = 0; i < data.length; i++) {
//                 ansArr.push(data[i]);
//             }
//         })
//         .catch(err => {
//             console.log("error occurred while fetching ", err);
//         });
// }

// getApi().then(() => {
//     console.log("inside the function ");
//     console.log("ans is ", ansArr); // Log ansArr after it's populated
// });