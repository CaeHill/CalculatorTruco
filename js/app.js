main();

function main() {
    document.addEventListener('DOMContentLoaded', initDragAndDrop);

    //Call actions in operator button click
    const operatorBtn = document.querySelectorAll('.operatorTable') 
    operatorBtn.forEach(operatorBtn => {
        operatorBtn.addEventListener('click', () => {
            const gridName = operatorBtn.parentElement.id;
            calcFormatter(operatorBtn.id, gridName);
        })
    })

    //Cards table remove
    const cardTable = document.querySelectorAll('.cardTable');
    cardTable.forEach(slot => {
        slot.addEventListener('click', () => {
            slot.style.backgroundImage = 'none';
            slot.style.boxShadow = 'none';
            slot.style.cursor = 'default';
        });
    });

    //Cards result table remove
    const resultTable = document.querySelectorAll('.resultTable');
    resultTable.forEach(slot => {
        slot.addEventListener('click', () => {
            slot.style.backgroundImage = 'none';
            slot.style.boxShadow = 'none';
            slot.style.cursor = 'default';
            slot.style.setProperty('--numero-imagem', 0);
        });
    });
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
            result = result.toFixed(3);
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
    resultTable.forEach(resultSlot => {
        resultSlot.style.backgroundImage = 'none';
        resultSlot.style.boxShadow = 'none';
        resultSlot.style.setProperty('--numero-imagem', 0);
    })

    //Get current page
    const page = getPageName();

    //Card set in result table
    const reverseVet = resultCardsVet.reverse();
    for(i = 0; i < reverseVet.length; i++) {
        const card = reverseVet[i];
        const resultSlotId = "result"+i;
        const resultSlot = document.getElementById(resultSlotId);

        //Styles set
        resultSlot.style.backgroundSize = '100% 100%';
        resultSlot.style.backgroundPosition = 'center';
        resultSlot.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.3)';
        resultSlot.style.cursor = 'pointer';
        resultSlot.style.setProperty('--numero-imagem', `"${card}"`);

        //Specific treatment for the Point image
        if(card == ".") {
            resultSlot.style.backgroundImage = "url('/img/"+page+"/point.png')";
        }
        //Specific treatment for the Infinity and NaN image
        else if(!(card.toLowerCase() == card.toUpperCase())) {
            resultSlot.style.backgroundImage = "url('/img/NaN/"+card+".png')";
        }
        //Numbers images
        else {
            resultSlot.style.backgroundImage = "url('/img/"+page+"/"+card+".png')";
        }
    }
}

function getImageId(card) {

    //Get current image
    const currentCard = window.getComputedStyle(card);
    const currentImage = currentCard.getPropertyValue('background-image');

    //Clean URL
    const url = currentImage.split('"')[1] || currentImage.slice(4, -1).replace(/"/g, "");
    const imageId = (url.split('/').pop()).split('.').slice(0, -1).join('.');

    //ConsoleLogs
    console.log(imageId);

    return imageId;
}

function getPageName() {

    //Get current page
    const page = window.location.pathname;

    //Clean path
    const pageClear = (page.split("/").pop()).split('.').slice(0, -1).join('.');

    //ConsoleLogs
    console.log(pageClear);

    return pageClear;
}

function resultErro(result) {
    if((result.toString().includes('I')) || (result.toString().includes('N'))) {
        return true;
    }

    return false;
}

// Função para inicializar o drag and drop das cartas
function initDragAndDrop() {
    // Seleciona todas as imagens das cartas na mão
    const cardImages = document.querySelectorAll('.cardHandImg');

    // Para cada imagem, torna arrastável e adiciona eventos
    cardImages.forEach(img => {
        img.draggable = true; // Permite arrastar a imagem

        img.addEventListener('dragstart', (event) => {
            // Passa a URL da imagem como dado transferido
            event.dataTransfer.setData('text/plain', img.src);
        });
    });

    // Seleciona todos os slots na mesa (cardTable)
    const cardSlots = document.querySelectorAll('.cardTable');

    // Para cada slot, adiciona eventos de drop
    cardSlots.forEach(slot => {
        slot.addEventListener('dragover', (event) => {
            event.preventDefault(); // Permite o drop
        });

        slot.addEventListener('drop', (event) => {
            event.preventDefault();
            const src = event.dataTransfer.getData('text/plain');
            if (src) {
                // Aplica a imagem como background do slot
                slot.style.backgroundImage = `url(${src})`;
                slot.style.backgroundSize = '100% 100%';
                slot.style.backgroundPosition = 'center';
                slot.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.3)';
                slot.style.cursor = 'pointer';
            }
        });
    });
}
