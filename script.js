function createNewCard() {
    //Creates a new div element and assigns it to a variable called cardElement.
    let cardElement = document.createElement("div");
    
    //Adds the "card" class to the variable 'cardElement'.
    cardElement.classList.add("card");
    
    //Writes the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement.
    //A string using a backtick is used here to make sure the HTML elements are on 2 seperate lines 
    cardElement.innerHTML = `
       <div class="card-down"></div>
       <div class="card-up"></div>`
    
    //Returning the cardElement.
    return cardElement
}
//Test to make sure a new card was created successfully.
//createNewCardTest();


function appendNewCard(parentElement) {
    //Creates a new card by calling createNewCard() and assigns it to a variable named cardElement.
    let cardElement = createNewCard();
    
    //Appends the card element to the parentElement parameter (making the card element a "child"). 
    parentElement.appendChild(cardElement);
    
    //Returning the card element.
    return cardElement;
}
//A test to make sure the append new card function works properly.
//appendNewCardTest();


function shuffleCardImageClasses() {
  //Creates a new array that contains two of each image class, from the CSS file, string in order. Stored in the array variable called 'cardClasses'.
    let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
    
	/* 
    Used is a library to randomly "shuffle" the array created. The library is called "underscore.js" because it uses an "_" character as an object to contain helper methods. underscore.js is loaded in the HTML via the CDN. A link to the documentation is included below the CDN.
  
	I ignore the "require" syntax shown in the documentation as it is for non-browser environments. The '_' variable will already be available to you from loading the CDN.
	
		CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
	
		Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm
	*/

    //The array cardClasses is shuffled using the JS library and assigned to a new array called shuffledCards
    let shuffelledCards = _.shuffle(cardClasses);
   
  //Returns the shuffled array of class names.
    return shuffelledCards;
}
//A test to make sure the shuffled card class function works properly.
//shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
    //Creates an empty array to hold the card objects.
    let cards = [];
    
    //This for loop loops 12 times because we need 12 cards created
    for (let i = 0; i < 12; i++)
    {
        //appendNewCard is used to create/append a new card and stores the result in a newCard variable
        let newCard = appendNewCard(parentElement);
        
        //An image class is added to the new card element using the array of shuffled images
        newCard.classList.add(shuffledImageClasses[i]);

        //A card object is created and appended to the cards array. The new card object contains an index which is the same as the array, an element which is the new card, and a random image from the shuffled images array
        let cardObj = {
            index: i,
            element: newCard,
            imageClass: shuffledImageClasses[i]
        }
        
        //The card object is then pushed into the cards array.
        cards.push(cardObj);
    }

    //Returns the array of 12 card objects.
    return cards;
}
//A test to make sure the create cards function works properly.
//createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
    //A simple if statement to check if the two cardObjects match by checking their imageClass, returning true if they do match and false if they do not
    if (cardObject1.imageClass == cardObject2.imageClass)
    {
        return true;
    }
    else
    {
        return false;
    }
}
//A test to make sure the do cards match function works properly.
//doCardsMatchTest();


//The 'counters' object below is used as a dictionary to store counter names and their respective values. This object is empty for now and it will be filled it up in the following function. 

let counters = {};


function incrementCounter(counterName, parentElement) {
  //Checks to see if the 'counterName' is property defined in the 'counters' object, if it is not then initialize it with a value of 0.
    if (typeof(counters[counterName]) == "undefined")
    {
        counters[counterName] = 0;
    } 
    
  //Increment the counter for 'counterName'.
    counters[counterName]++;
    
  //Change the HTML within the 'parentElement' parameter to display the new counter value.
    parentElement.innerText = counters[counterName];

}
//A test to make sure the increment counter function works properly.
//incrementCounterTest();


/* 
	The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while waiting for the user to flip another card. Keeping track of this value is important in order to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. 
*/
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
    // Adds one to the flip counter UI using the incrementCounter method.
    incrementCounter("flipCounter", document.getElementById("flip-count"));
    
    //Checks if this is the first card flipped, if it is then the lastCardFlipped variable is set to this card and the method is returned.
    if (lastCardFlipped === null)
    {
        lastCardFlipped = newlyFlippedCard;
        return;
    }
    
    //Checks if the cards don't match, and removes the "flipped" class from both of them if they do not match. This also resets 'lastCardFlipped', and uses a 'return' to exit the function.
    if (doCardsMatch(lastCardFlipped, newlyFlippedCard) === false) 
    {
        lastCardFlipped.element.classList.remove("flipped");
        newlyFlippedCard.element.classList.remove("flipped");
        lastCardFlipped = null;
        return;
    }
    
    //Increments the match counter using the incrementCounter function.
    incrementCounter("matchCounter", document.getElementById("match-count"));
    
    //Plays either the win audio or match audio based on whether the user has the number of matches needed to win, which is 6.
    if (counters["matchCounter"] == 6) 
    {
        winAudio.play();
    }
    else 
    {
        matchAudio.play();
    }
    
    //Resets 'lastCardFlipped'
    lastCardFlipped = null;
}


// All the code below this comment sets up the game - please do not modify it in anyway 
//This code was also provided
let cardObjects = 
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}
