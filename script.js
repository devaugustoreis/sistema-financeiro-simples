// Creating an array to store all the transactions made. It is already filled with some data for testing purposes.
// Criando uma lista para armazenar todas as transações feitas. Ela já está preenchida com algumas informações para fins de testes.
const arrayTransactions = [
    {
        'typeTransaction': 'income',
        'description': 'Salário',
        'date': '2021-06-05',
        'value': 2860.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Aluguel',
        'date': '2021-06-10',
        'value': 1200.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Condomínio',
        'date': '2021-06-10',
        'value': 350.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Luz',
        'date': '2021-06-10',
        'value': 150.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Água',
        'date': '2021-06-10',
        'value': 120.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Internet',
        'date': '2021-06-15',
        'value': 110.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Mercado',
        'date': '2021-06-18',
        'value': 840.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Celular',
        'date': '2021-06-20',
        'value': 55.00
    }, 
    {
        'typeTransaction': 'income',
        'description': 'Empréstimo',
        'date': '2021-06-21',
        'value': 900.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Gás',
        'date': '2021-06-25',
        'value': 120.00
    },
    {
        'typeTransaction': 'income',
        'description': 'Freelance',
        'date': '2021-06-26',
        'value': 400.00
    },
    {
        'typeTransaction': 'expense',
        'description': 'Sushi',
        'date': '2021-06-28',
        'value': 80.00
    },
]

// These are the three big buttons with "Receitas", "Despesas" and "Saldo" written on them.
// Esses são os três botões grandes com "Receitas", "Despesas" e "Saldo" escritos neles.
let btnIncome = document.getElementById('btn-income')
let btnExpenses = document.getElementById('btn-expenses')
let btnTotal = document.getElementsByClassName('card-total')[0]

// Getting access to the modal so that we can dynamically show or hidden it.
// Obtendo acesso ao modal para que possamos mostrá-lo ou escondê-lo dinamicamente.
let modal = document.getElementById('modal-full-screen')

// Getting access to the modal title and "R$" span so that we can dynamically change it (content / colors).
// Obtendo acesso ao título do modal e à span "R$" para que possamos alterá-los dinamicamente (conteúdo / cores)
let operation = document.querySelector('.operation-title')
let spanRS = document.querySelector('.span-RS')

// Getting access to the value's input and div.
// Obtendo acesso ao input e div do valor.
let divInputValue = document.querySelector('.div-value')
let inputValue = document.getElementById('value')

// Getting access to the description's input.
// Obtendo acesso ao input da descrição.
let inputDescription = document.getElementById('description')

// Getting acess to the date's input and div.
// Obtendo acesso ao input e div da data.
let divInputDate = document.querySelector('.div-date')
let inputDate = document.getElementById('date-transaction')

// This is the "Adicionar" button in the modal.
// Esse é o botão "Adicionar" no modal.
let addItem = document.getElementById('add-item')

// This is the "x" button that closes the modal.
// Esse é o botão "x" que fecha o modal.
let closeModal = document.getElementsByClassName('close')[0]

// Storing some of the colors in variables, so that it becomes more intuitive to know which color the hexadecimal code represents along the code.
// Armazenando algumas cores em variáveis para que fique mais intuitivo saber qual cor o código hexadecimal representa no decorrer do código.
let green = '#4caf50'
let red = '#d43333'

// These variables will be used in the Hover and Focus functions that dinamically change the modal colors. They receive one color according to which button ("Receitas" or "Despesas") the user clicks.
// Essas variáveis serão usadas nas funções de Hover e Focus que mudam as cores do modal dinamicamente. Elas recebem uma cor de acordo com qual botão ("Receitas" ou "Despesas") o usuário clicar.
let colorHover = '' 
let clearColorHover = ''
let colorFocus = ''
let placeholderHoverColor = ''

// This is the big green button with "Receitas" written on it.
// Esse é o grande botão verde com "Receitas" escrito nele.
btnIncome.onclick = function() {
    // Setting green (and its variations) in the variables used in the Hover and Focus functions below.
    // Definindo verde (e suas variações) nas variáveis utilizadas nas funções de Hover e Focus abaixo.
    colorHover = '#255927' // dark green
    clearColorHover = green
    colorFocus = '#e6f7e7' // light green

    // Setting the correct class for the addItem button ("Adicionar"), so that the color is correct when it becomes enabled.
    // Definindo a classe correta para o botão addItem ("Adicionar"), para que a cor esteja correta quando se tornar habilitado.
    addItem.classList.remove('btn-red')
    addItem.classList.add('btn-green')

    // Calling the function that sets the correct class for the placeholder according to the clicked button ("Receitas" or "Despesas").
    // Chamando a função que define a classe correta para o placeholder de acordo com o botão clicado ("Receitas" or "Despesas").
    formatPlaceholder('placeholder-green', 'placeholder-red', 'placeholder-darkgreen')

    // Calling the function that sets the actual day as default date.
    // Chamando a função que define a dia atual como a data padrão.
    setDateAsToday()

    // Calling the function that resets the modal's values and shows it.
    // Chamando a função que reseta os valores do modal e o faz aparecer.
    showModal()

    // Setting "Nova Receita" as the modal title and green ("#4caf50") as the color of span, input text and borderBottoms.
    // Definindo "Nova Receita" como título do modal e verde ("#4caf50") como a cor do span, texto do input e das "borderBottoms".
    formatModal('Receita', green)

    // This onclick event on the addItem ("Adicionar") button calls a function that creates an item in a unordered list.
    // Esse evento "onclick" no botão addItem ("Adicionar") chama uma função que criar um item numa lista desordenada.
    addItem.onclick = function() {
        adicionarItem('income')
    }
}

// This is the big red button with "Despesas" written on it. This onclick event follows the same patterns as the one above.
// Esse é o grande botão vermelho com "Depesas" escrito nele. Esse evento "onclick" segue os mesmos padrões do de cima.
btnExpenses.onclick = function() {
    colorHover = '#851b1b' // dark red
    clearColorHover = red
    colorFocus = '#f5d0d0' // light red

    addItem.classList.remove('btn-green')
    addItem.classList.add('btn-red')
    
    formatPlaceholder('placeholder-red', 'placeholder-green', 'placeholder-darkred')
    setDateAsToday()
    showModal()
    formatModal('Despesa', red)

    addItem.onclick = function() {
        adicionarItem('expense')
    }
}

// This function sets the correct class for the placeholder.
// Essa função define a classe correta para o placeholder.
function formatPlaceholder(add, remove, hoverColor) {
    inputValue.classList.remove(remove)
    inputValue.classList.add(add)
    inputDescription.classList.remove(remove)  
    inputDescription.classList.add(add)
    placeholderHoverColor = hoverColor
}

// This function sets the actual day as default date for the date's input.
// Essa função define a data atual como a data padrão para o input da data.
function setDateAsToday() {
    let today = new Date().toISOString().slice(0, 10)
    document.getElementById('date-transaction').value = today
}

// This function resets the values on modal and makes it appear. It also automatically sets focus on the value's input.
// Essa função reseta os valores no modal e o faz aparecer. Também coloca o foco no input do valor automaticamente.
function showModal() {
    inputValue.value = ''
    inputDescription.value = ''
    addItem.disabled = true
    modal.style.display = 'block'
    inputValue.focus()   
}

// This function sets correct title and colors (span, input text, borderBottoms) for the modal.
// Essa função define o título e as cores (span, texto do input, "borderBottoms") corretas para o modal.
function formatModal(title, color) {
    operation.innerHTML = `Nova ${title}`
    spanRS.style.color = `${color}`
    inputValue.style.color = `${color}`
    divInputValue.style.borderBottom = `2px solid ${color}`
    inputDescription.style.color = `${color}`
    inputDescription.style.borderBottom = `2px solid ${color}`
    inputDate.style.color = `${color}`
    divInputDate.style.borderBottom = `2px solid ${color}`
}

// This function disables clicking on the addItem ("Adicionar") button if the value's or description's input is still empty.
// Essa função desabilita clicar no botão addItem ("Adicionar") se o input do valor ou da descrição ainda estiverem vazios.
function verifyInputs() {
    if (inputValue.value != '' && inputDescription.value != '') {addItem.disabled = false}
    else {addItem.disabled = true}
}

// These 2 functions close (actualy hide) the modal when the user clicks out of it or in the "x" button.
// Essas 2 funções fecham (na realidade escondem) o modal quando o usuário clicar fora do mesmo ou no botão "x".
closeModal.onclick = function() {
    modal.style.display = 'none'
}

window.onmousedown = function(event) {
    if (event.target == modal) {modal.style.display = 'none'}
}

// These functions dynamically change the color of some modal elements (text, borders, placeholder) when hovering or focusing on the input field of value.
// Essas funções alteram dinamicamente a cor de alguns elementos do modal (text, borders, placeholder) quando focando ou passando o mouse por cima do campo do valor.
function hoverValueDiv() {
    spanRS.style.color = colorHover
    inputValue.style.color = colorHover
    divInputValue.style.borderBottom = `2px solid ${colorHover}`
    inputValue.classList.add(placeholderHoverColor)
}

function clearHoverValueDiv() {
    spanRS.style.color = clearColorHover
    inputValue.style.color = clearColorHover
    divInputValue.style.borderBottom = `2px solid ${clearColorHover}`
    inputValue.classList.remove(placeholderHoverColor)
}

function focusInputValue() {
    inputValue.style.backgroundColor = colorFocus
    divInputValue.style.backgroundColor = colorFocus
}

function clearFocusInputValue() {
    inputValue.style.backgroundColor = 'white'
    divInputValue.style.backgroundColor = 'white'
}

// These functions dynamically change the color of some modal elements (text, borders, placeholder) when hovering or focusing on the input field of description.
// Essas funções alteram dinamicamente a cor de alguns elementos do modal (text, borders, placeholder) quando focando ou passando o mouse por cima do campo da descrição.
function hoverInputDescription() {
    inputDescription.style.color = colorHover
    inputDescription.style.borderBottom = `2px solid ${colorHover}`
    inputDescription.classList.add(placeholderHoverColor)
}

function clearHoverInputDescription() {
    inputDescription.style.color = clearColorHover
    inputDescription.style.borderBottom = `2px solid ${clearColorHover}`
    inputDescription.classList.remove(placeholderHoverColor)
}

function focusInputDescription() {
    inputDescription.style.backgroundColor = colorFocus
}

function clearFocusInputDescription() {
    inputDescription.style.backgroundColor = 'white'
}

// These functions dynamically change the color of some modal elements (text, borders, placeholder) when hovering or focusing on the input field of date.
// Essas funções alteram dinamicamente a cor de alguns elementos do modal (text, borders, placeholder) quando focando ou passando o mouse por cima do campo da data.
function hoverDateDiv() {
    inputDate.style.color = colorHover
    divInputDate.style.borderBottom = `2px solid ${colorHover}`
}

function clearHoverDateDiv() {
    inputDate.style.color = clearColorHover
    divInputDate.style.borderBottom = `2px solid ${clearColorHover}`
}

function focusInputDate() {
    inputDate.style.backgroundColor = colorFocus
}

function clearFocusInputDate() {
    inputDate.style.backgroundColor = 'white'
}

// Creating variables to store the total of incomes, expenses and balance.
// Criando variáveis para armazenar o total de receitas, despesas e balanço.
let totalIncomes = 0
let totalExpenses = 0
let totalBalance = 0

// Getting acess to the values shown to the user through variables so that it can be dynamically changed according to the variables above.
// Obtendo acesso aos valores mostrados ao usuário através de variáveis para que possa ser alterado dinamicamente de acordo com as variáveis acima.
let displayIncomes = document.querySelector('.card-income p')
let displayExpenses = document.querySelector('.card-expenses p')
let displayBalance = document.querySelector('.card-total p')

// When the user clicks on the "Adicionar" button, this function adds the new transaction into the array. It also calls again the functions to calculate balance and create a list.
// Quando o usuário clica no botão "Adicionar", essa função adiciona a nova transação na lista. Também chama novamente as funções para calcular o balanço e criar um item da lista.
function adicionarItem(typeTransaction) {
    arrayTransactions.push({
        'typeTransaction': typeTransaction,
        'description': inputDescription.value,
        'date': inputDate.value,
        'value': parseFloat(inputValue.value)
    })

    calcBalance()
    createList()

    modal.style.display = 'none' 
}

// This function calculates total of incomes, expenses and balance. It also updates the values shown to the user.
// Essa função calcula o total de receitas, despesas e balanço. Também atualiza os valores mostrados ao usuário.
function calcBalance() {
    totalIncomes = totalExpenses = 0
    arrayTransactions.forEach(transactionItem => {
        if (transactionItem.typeTransaction === 'income') {totalIncomes += transactionItem.value}
        else {totalExpenses += transactionItem.value}
    })
    totalBalance = totalIncomes - totalExpenses
    displayIncomes.innerHTML = `R$ ${totalIncomes.toFixed(2)}`
    displayExpenses.innerHTML = `R$ ${totalExpenses.toFixed(2)}`
    displayBalance.innerHTML = `R$ ${totalBalance.toFixed(2)}`
    verifyTotal()
}

// Getting acess to the list's div so that we can chage its borderTop color dynamically.
// Obtendo acesso a div da lista para que possamos alterar a cor do "borderTop" dinamicamente.
let divLista = document.querySelector('.div-lista')

// This function verifies if balance is positive or negative, and then changes the text and border color to green or red according to it.
// Essa função verifica se o balanço é positivo ou negativo e então muda a cor do texto e das bordas para ver ou vermelho de acordo com isso.
function verifyTotal() {
    if (totalBalance >= 0) {
        btnTotal.style.border = `2px solid ${green}`
        btnTotal.style.color = green
        divLista.style.borderTop = `2px solid ${green}`
    }
    else {
        btnTotal.style.border = '2px solid #ff0000'
        btnTotal.style.color = red
        divLista.style.borderTop = `2px solid ${red}`
    }
}

// Getting acess to the empty (for now) unordered list so that we can add list itens in it.
// Obtendo acesso a lista desordenada vazia (por hora) para que possamos adicionar itens nela.
let ul = document.getElementById('lista-transações')

// This function creates a list of itens based in the objects inside of "arrayTransactions".
// Essa função cria uma lista de itens baseado nos objetos dentro de "arrayTransactions". 
function createList() {
    /* Inicialmente a lista desordenada é esvaziada e o contador de Index zerado. Isto é necessário para que a lista sempre seja criada do zero de acordo com os objetos dentro de 
    arrayTransactions, mesmo após a adição ou remoção de elementos deste array.*/
    /* Initially, the UL is emptied and de Index counter is set to zero. This is necessary so that the list is always created from zero according with the objects inside of
    array Transactions, even after adding or removing elements of this array.*/
    ul.innerHTML = ''
    let contIndex = 0
    arrayTransactions.forEach (transactionItem => {
        // Creating an empty list item (for now) in the unordered list.
        // Criando um item da lista vazio (por hora) na lista desordenada.
        li = document.createElement('li')

        // Creating a span and adding the content of the description's input in it. Also adding a class to it for formatting (CSS) purposes.
        // Criando um span e adicionando o conteúdo do input da descrição nele. Também adicionando uma classe nele para fins de formatação (CSS).
        let spanDescription = document.createElement('span')
        spanDescription.className = 'span-description'
        spanDescription.innerHTML = transactionItem.description

        // Creating a span and adding the content of the date's input in it.
        // Criando um span e adicionando o conteúdo do input da data nele.
        let spanDate = document.createElement('span')
        spanDate.innerHTML = transactionItem.date
        spanDate.innerHTML = formatDate(spanDate.innerHTML)

        // Creating a span and adding the content of the value's input in it. Also formatting the value for 2 decimal places.
        // Criando um span e adicionando o conteúdo do input da valor nele. Também formatando o valor para 2 casas decimais.
        let spanValue = document.createElement('span')
        spanValue.className = 'span-value'
        spanValue.innerHTML = `R$ ${transactionItem.value.toFixed(2)}`

        // Creating a button to remove a item from the list. Also adding a class so that we can have a HTML collection of them later.
        // Criando um botão para remover um item da lista. Também adicionando uma classe para que tenhamos uma HTML collection deles depois.
        let removeButton = document.createElement('button')
        removeButton.className = 'remove';
        removeButton.innerHTML = '&times;';
        
        // Calling the function that sets the color of text and borders to match the type of transaction.
        // Chamando a função que define que as cores do texto e das bordas correspondam ao tipo da transação.
        if (transactionItem.typeTransaction === 'income') {formatItem(green, green)}
        else {formatItem(red, '#ff0000')}

        // Adicionando um atributo personalizado chamado Index para cada item da lista. É através desse atributo que faremos a conexão entre cada item da lista e o objeto equivalente dentro de arrayTransactions.
        // Adding a custom attribute named Index for every item in the list. It is through this attribute that we'll make the connection between every list iten and the corresponding object inside of arrayTransactions.
        li.setAttribute('index', contIndex)
        contIndex += 1

        // Adding the list item in the unordered list and then adding all the spans inside the list item. The prepend function makes the new itens appear as the first element of the list.
        // Adicionando o item da lista na lista desordenada e então adicionando todos os spans dentro do item da lista. A função "prepend" faz com que novos itens apareçam como o primeiro elemento da lista.
        ul.prepend(li)
        li.appendChild(spanDescription)
        li.appendChild(spanDate)
        li.appendChild(spanValue)
        spanValue.appendChild(removeButton)

        // Calling the function that will make the remove buttons work to delete the list itens.
        // Chamando a função que fará os botões de remover funcionarem para deletar itens da lista.
        buttonEvents()
    })
}

// This function returns the date string formatted correctly (with "/") and reverted.
// Essa função retorna a string da data formatada corretamente (com "/") e invertida.
function formatDate(date) {
    date = date.split('-')

    let day = date[2]
    let month = date[1]
    let year = date[0]

    return `${day}/${month}/${year}`
}

// This function formats the color of text and borders according to the type of transaction (income or expense).
// Essa função formata a cor do texto e das bordas de acordo com o tipo de transação (entrada ou saída).
function formatItem(colorText, colorBorder) {
    li.style.color = colorText
    li.style.borderRight = `10px solid ${colorBorder}`
}

// Storing all the remove buttons in a HTML Collection. We loop through this collection in the function bellow.
// Armazenando todos os botões de remover numa HTML Collection. Nós realizamos um ciclo nessa coleção nas funções abaixo. 
let itemButtons = document.getElementsByClassName('remove')

// This function will add an event that triggers another function (deleteItem) when clicking on the itemButtons (remove buttons).
// Essa função adicionará um evento que aciona outra função ("deleteItem") ao clicar nos "itemButtons" (botões de remover).
function buttonEvents() {
    for (let i = 0; i < itemButtons.length; i++) {
        itemButtons[i].addEventListener('click', deleteItem)
    }
}

/* This function deletes the "grandfather" of itself. In this case, when we click the remove buttons, it deletes the list item. At the same time, it also removes the corresponding
object in arrayTransactions. The connection between the two elements is made by the "index" custom attribute created before.*/
/* Essa função deleta o "avô" dela mesma. Nesse caso, ao clicarmos nos botões de remover, ela deleta o item da lista. Ao mesmo tempo, ela também remove o objeto correspondente
dentro de arrayTransactions. A conexão entre os dois elementos é feita pelo atributo personalizado "index" criado anteriormente.*/
function deleteItem() {
    let indexPosition = this.parentElement.parentElement.getAttribute('index')
    removeValue(indexPosition)
    this.parentElement.parentElement.remove()
}

// This function removes a element in arrayTransactions based in the index value given as a parameter. We also have to call other functions to update the balance and the list of itens.
// Essa função remove um elemento de arrayTransactions baseado no valor do indice dado como parâmetro. Também chamamos outras funções para atualizar o balanço e a lista de itens. 
function removeValue(indexPosition) {
    arrayTransactions.splice(indexPosition, 1)
    calcBalance()
    createList()
}

// These 3 functions must be called when the page loads, so that the list of itens appears and the balance ("Saldo") button works properly.
// Essas 3 funções devem ser chamadas ao iniciar a página para que a lista de itens apareça e o botão do balanço ("Saldo") funcione corretamente.
calcBalance()
verifyTotal()
createList()