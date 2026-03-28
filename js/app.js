main();

function main() {
    document.addEventListener('DOMContentLoaded', initDragAndDrop);

    //Get name of chosen deck
    const btnDeckChooser = document.querySelectorAll('.btnDeckChooser');
    btnDeckChooser.forEach(deck => {
        deck.addEventListener('click', () => {
            const deckImage = deck.querySelector('img');
            const imagePath = deckImage.src;

            //Clean URL
            const deckChoose = clearURL(imagePath);

            //ConsoleLogs
            console.log(deckChoose);

            //Save chosen deck
            sessionStorage.setItem('deckChoose', deckChoose);
        });
    });

    //Get chosen deck saved
    const deckChoose = sessionStorage.getItem('deckChoose');

    //ConsoleLogs
    console.log(deckChoose);
    
    //Print all card hand images
    const hand = document.querySelectorAll('.cardHandImg');
    hand.forEach(card => {
        const id = card.id;
        card.src = "img/"+deckChoose+"/"+id+".png";
    });

    //Call actions in operator button click
    const operatorBtn = document.querySelectorAll('.operatorTable');
    operatorBtn.forEach(operatorBtn => {
        operatorBtn.addEventListener('click', () => {
            const gridName = operatorBtn.parentElement.id;
            calcFormatter(operatorBtn.id, gridName);
        });
    });

    //Cards table remove
    const cardTable = document.querySelectorAll('.cardTable');
    cardTable.forEach(slot => {
        slot.addEventListener('click', () => {
            styleRemove(slot);
        });
    });

    //Cards result table remove
    const resultTable = document.querySelectorAll('.resultTable');
    resultTable.forEach(slot => {
        slot.addEventListener('click', () => {
            slot.style.setProperty('--numero-imagem', 0);
            styleRemove(slot);
        });
    });

    //Reset table
    const cardBoxBtn = document.querySelector('#cardBack');
    cardBoxBtn.addEventListener('click', resetTable);


}

function calcFormatter(buttonId, gridName){
    //String builder
    const cardsVet = ["","","","",buttonId,"","","",""];
    for(i = 0; i < cardsVet.length; i++) {
        if(i == 4) {
            continue;
        }
        const cardId = gridName+i;
        const card = document.getElementById(cardId);
        let cardNum = getImageId(card);
        
        //Specific treatment for the Point image
        if(cardNum == "point") {
            cardNum = ".";
        }

        cardsVet[i] = cardNum;
    }
    const cardsString = cardsVet.join("");

    //ConsoleLogs
    console.log(cardsString);

    calcResult(cardsString);
}

function calcResult(cardsString) {
    //Calculator result
    let result = eval(cardsString);

    //Rounding double numbers
    if(!(Number.isInteger(result)) && !(resultErro(result))) {
        const decimalLength = result.toString().split(".")[1].length || 0;
        if(decimalLength >= 3) {
            //Cut repeating decimal and 0 additional
            result = result.toFixed(3);
            result = result.toString().replace(/(\.\d*?[1-9])0\d*/, '$1');
        } else {
            result = result.toFixed(decimalLength);
        }
    }
    const resultCardsVet = ("" + result).split("");

    //ConsoleLogs
    console.log(result);
    console.log(resultCardsVet);

    printResult(resultCardsVet);
}

function printResult(resultCardsVet) {
    //Result table reset
    const resultTable = document.querySelectorAll('.resultTable');
    resultTable.forEach(slot => {
        slot.style.setProperty('--numero-imagem', 0);
        styleRemove(slot);
    })

    //Get current deck choose
    const deckChoose = sessionStorage.getItem('deckChoose');

    //Card set in result table
    const reverseVet = resultCardsVet.reverse();
    for(i = 0; i < reverseVet.length; i++) {
        const card = reverseVet[i];
        const resultSlotId = "result"+i;
        const resultSlot = document.getElementById(resultSlotId);

        //Styles set
        resultSlot.style.setProperty('--numero-imagem', `"${card}"`);
        styleSet(resultSlot);

        //Specific treatment for the Point image
        if(card == ".") {
            resultSlot.style.backgroundImage = "url('/img/"+deckChoose+"/point.png')";
        }
        //Specific treatment for the Infinity and NaN image
        else if(!(card.toLowerCase() == card.toUpperCase())) {
            resultSlot.style.backgroundImage = "url('/img/NaN/"+card+".png')";
        }
        //Numbers images
        else {
            resultSlot.style.backgroundImage = "url('/img/"+deckChoose+"/"+card+".png')";
        }
    }
}

function getImageId(card) {
    //Get current image
    const currentCard = window.getComputedStyle(card);
    const currentImage = currentCard.getPropertyValue('background-image');

    //Clean URL
    const imageId = clearURL(currentImage);

    //ConsoleLogs
    console.log(imageId);

    return imageId;
}

function resultErro(result) {
    if((result.toString().includes('I')) || (result.toString().includes('N'))) {
        return true;
    }

    return false;
}

function initDragAndDrop() {
    const cardImages = document.querySelectorAll('.cardHandImg');
    cardImages.forEach(img => {
        //Allows drag the image
        img.draggable = true;

        img.addEventListener('dragstart', (event) => {
            //Pass the image URL as transferred data
            event.dataTransfer.setData('imageUrl', img.src);
        });
    });

    const cardSlots = document.querySelectorAll('.cardTable');
    cardSlots.forEach(slot => {
        slot.addEventListener('dragover', (event) => {
            //Allows dropping
            event.preventDefault();
        });

        slot.addEventListener('drop', (event) => {
            event.preventDefault();
            const src = event.dataTransfer.getData('imageUrl');
            if (src) {
                //Apply the image as the slot background
                slot.style.backgroundImage = `url(${src})`;
                styleSet(slot);
            }
        });
    });
}

function styleSet(slot) {
    slot.style.backgroundSize = '100% 100%';
    slot.style.backgroundPosition = 'center';
    slot.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.4)';
    slot.style.cursor = 'pointer';
}

function styleRemove(slot) {
    slot.style.backgroundImage = 'none';
    slot.style.boxShadow = 'none';
    slot.style.cursor = 'default';
}

function clearURL(URL) {
    const auxURL = URL.split('"')[1] || URL.slice(4, -1).replace(/"/g, "");
    const clearURL = (auxURL.split('/').pop()).split('.').slice(0, -1).join('.');

    return clearURL;
}

function resetTable() {
    const tableCards = document.querySelectorAll('.cardTable');
    tableCards.forEach(card => {
        styleRemove(card);
    });

    const resultCards = document.querySelectorAll('.resultTable');
    resultCards.forEach(card => {
        card.style.setProperty('--numero-imagem', 0);
        styleRemove(card);
    });
}