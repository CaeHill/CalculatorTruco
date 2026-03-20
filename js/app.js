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
            }
        });
    });
}

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', initDragAndDrop);



const 




    
const btn = document.getElementById('+');
btn.addEventListener('click', () => {teste(btn.id);});

function teste(buttonId){
    
    const sum1 = document.querySelector('#summation1');
    const num1 = getImage(sum1)
    const sum2 = document.querySelector('#summation2');
    const num2 = getImage(sum2)
    const sum3 = document.querySelector('#summation3');
    const num3 = getImage(sum3)
    const sum4 = document.querySelector('#summation4');
    const num4 = getImage(sum4)

    console.log(buttonId);

    const sum5 = document.querySelector('#summation5');
    const num5 = getImage(sum5)
    const sum6 = document.querySelector('#summation6');
    const num6 = getImage(sum6)
    const sum7 = document.querySelector('#summation7');
    const num7 = getImage(sum7)
    const sum8 = document.querySelector('#summation8');
    const num8 = getImage(sum8)

    const string = `${num1} ${num2} ${num3} ${num4} ${buttonId} ${num5} ${num6} ${num7} ${num8}`;

    const semEspacos = string.replace(/\s+/g, '');
    console.log(semEspacos);

    const result = eval(semEspacos);
    console.log(result);

    printResult(result);

}

function printResult(result) {
    
    const tamanho = result.toString().length;
    console.log(tamanho);

    const cartas = ("" + result).split("");
    console.log(cartas);

    b(tamanho, cartas);

}

function b(tamanho, cartas) {
    const resultTable = document.querySelectorAll('.resultTable');

    const reverse = cartas.reverse();

    for(let i = 0; i < cartas.length; i++) {
        const a = reverse[i];

        const pa = "result"+i;
        console.log(pa);

        const slot = document.getElementById(pa);

        slot.style.backgroundImage = "url('/img/clubs/"+a+".png')";
        slot.style.backgroundSize = '100% 100%';
        slot.style.backgroundPosition = 'center';
        slot.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.3)';
        slot.style.setProperty('--numero-imagem', `"${a}"`);
    }

    

}

function a() {
    const resultSlot1 = document.getElementById('result1');
    
    resultSlot1.style.backgroundImage = "url('/img/clubs/4.png')";
    resultSlot1.style.backgroundSize = '100% 100%';
    resultSlot1.style.backgroundPosition = 'center';
    resultSlot1.style.boxShadow = '0 8px 16px 8px rgba(0, 0, 0, 0.3)';
}

function getImage(divElemento) {

    const estilosComputados = window.getComputedStyle(divElemento);

    const bgImage = estilosComputados.getPropertyValue('background-image');

    const estiloBg = window.getComputedStyle(divElemento).backgroundImage;

    // Tratar e limpar a url
    const url = bgImage.split('"')[1] || bgImage.slice(4, -1).replace(/"/g, "");
    const nomeArquivo = url.split('/').pop();

    const nomeApenas = nomeArquivo.split('.').slice(0, -1).join('.');

    console.log(nomeApenas);

    return nomeApenas;
}
