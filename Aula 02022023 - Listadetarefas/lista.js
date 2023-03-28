const frm = document.querySelector("form") // Obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro") // #

frm.addEventListener("submit", (e) => {
  e.preventDefault() // Evita envio do form

  const tarefa = frm.inTarefa.value // Obtém o conteúdo digitado

  const h5 = document.createElement("h5") // Cria o elemento h5
  const texto = document.createTextNode(tarefa) // Cria um texto
  h5.appendChild(texto) // Define que texto será filho de h5
  dvQuadro.appendChild(h5) // h5 será filho de divQuadro

  frm.inTarefa.value = "" // Limpa o campo de edição
  frm.inTarefa.focus() // Joga o cursor neste campo
})

frm.btSelecionar.addEventListener("click", () => { // A cada clique no botão
  const tarefas = document.querySelectorAll("h5") // Salva os elementos h5 na variável tarefas 

  if (tarefas.length == 0) { // Caso não tenha informações de tarefas para exibir
    alert("Não há tarefas para selecionar") // Essa mensagem será exibida na tela 
    return // Encerra a função                                         
  }

  let aux = -1 // Cria uma variável auxiliar                   

  for (let i = 0; i < tarefas.length; i++) { // Estrutura para percorrer a variável tarefa
    
    if (tarefas[i].className == "tarefa-selecionada") { // Verifica se a tarefa está selecionada
      tarefas[i].className = "tarefa-normal" // Se estiver, recebe os atributos da classe tarefa-normal      
      aux = i // Variável auxiliar recebe a tarefa que deverá ser modificada                                     
      break // Encerra a função                                       
    } 
  }

  if (aux == tarefas.length - 1) { // Verifica se a variável auxiliar está na última posição da lista de terefas
    aux = -1 // Se for, retorna ao início da lista
  }

  tarefas[aux + 1].className = "tarefa-selecionada" // Seleciona uma tarefa
})

frm.btRetirar.addEventListener("click", () => { // A cada clique no botão
  const tarefas = document.querySelectorAll("h5") // Salva os elementos h5 na variável tarefas

  let aux = -1 // Cria uma variável auxiliar               

  tarefas.forEach((tarefa, i) => { // Para cada tarefa
    if (tarefa.className == "tarefa-selecionada") { // Que for selecionada
      aux = i // A variável auxiliar recebe a posição da tarefa, na lista de tarefas
      console.log(i) // E printa no console                                   
    }
  })

  if (aux == -1) { // Se nenhuma tarefa for selecionada              
    alert("Selecione uma tarefa para removê-la...") // Esse alerta será exibido na tela
    return // Encerra a função
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) { // Se for confirmada a exclusão do registro na lista de tarefas
    dvQuadro.removeChild(tarefas[aux]) // O texto desse registro será excluido da lista e deixará de ser exibido na tela        
  }
})

frm.btGravar.addEventListener("click", () => { // A cada clique no botão
  const tarefas = document.querySelectorAll("h5") // Salva os elementos h5 na variável tarefas

  if (tarefas.length == 0) { // Se a lista de tarefas estiver vazia
    alert("Não há tarefas para serem salvas") // Essa mensagem será exibida na tela      
    return // Encerra a função                                        
  }

  let dados = "" // Cria uma variável extra                           
  tarefas.forEach(tarefa => { // Para cada tarefa na lista de tarefas
    dados += tarefa.innerText + ";" // A variável dados recebe as tarefas, separadas por ;         
  })

  localStorage.setItem("tarefasDia", dados.slice(0, -1)) // Salva todos os dados na memória local
  
  if (localStorage.getItem("tarefasDia")) { // Quando a lista de tarefas for salva
    alert("Ok! Tarefas Salvas") // Esse alerta será exibido na tela
  }
})

window.addEventListener("load", () => { // Quando a página for recarregada
  
  if (localStorage.getItem("tarefasDia")) { // Seleciona todos os dados referentes a lista de tarefas

    const dados = localStorage.getItem("tarefasDia").split(";") // A variável dados recebe a lista de tarefas 

    dados.forEach(dado => { // Percorre os dados armazenados em localStorage
  const h5 = document.createElement("h5") // Cria o elemento h5     
      const texto = document.createTextNode(dado)  
      h5.appendChild(texto) // Define que texto será filho de h5                      
      dvQuadro.appendChild(h5) // h5 será filho de divQuadro                  
    })
  }
})