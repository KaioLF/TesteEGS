var url = "http://localhost:3000/"

function validaForm(event){
    event.preventDefault();
    

    if(validaNome("nome") && validaNome("sobrenome") && validaCPF("cpf-usuario")){
        document.getElementById("form__submit-btn").onclick = enviar();
    }

    else{
        return
    }
}


//função que faz uma requisição de método POST dos dados inputados do usário e salva os dados no banco
function enviar()
{
 
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		"Nome": document.getElementById("nome").value,
		"Sobrenome": document.getElementById("sobrenome").value,
		"DataNascimento": document.getElementById("data-nascimento").value,
        "Email": document.getElementById("email").value,
        "CPF": document.getElementById("cpf-usuario").value
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "usuarios"
	fetch(url + "usuarios",
	{
		"method": "POST",
		"redirect": "follow",
		"headers":
		{
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		"body": JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
		alert("Cadastro efetuado! :D")
	})
}

//função que valida o nome do usário no momento do cadastro
function validaNome(id) {
    var nomeUsuario = document.getElementById(id).value;
    var issueArr = [];
    if (/[!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(nomeUsuario)) {
        alert("O NOME ou o SOBRENOME não devem conter caracteres especiais. por favor verifique");
        return false;
    }
    if (nomeUsuario == "" || nomeUsuario == undefined || nomeUsuario == null) {
        alert("O NOME ou o SOBRENOME não estão preenchidos, por favor verifique!");
        return false;
    }
    else {
        return true;
    }

}


function validaData(id){
    //TODO
}

function validaEmail(id){
	//TODO
}

//função que valida o CPF do usuário no momento do cadastro
function validaCPF(id){
	var cpf = document.getElementById(id).value;
	var Soma;
    var Resto;
    Soma = 0;
  	if (cpf == "00000000000"|| cpf == undefined || cpf == null){
		alert("CPF não preenchido!");
		return false;
		
	} 

  	for (i=1; i<=9; i++){
		Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  		Resto = (Soma * 10) % 11;
	} 

    if ((Resto == 10) || (Resto == 11)){
		Resto = 0;
	}

    if (Resto != parseInt(cpf.substring(9, 10))){
		alert("CPF INVALIDO!");
		return false;
	} 

  	Soma = 0;
    for (i = 1; i <= 10; i++){
		Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    	Resto = (Soma * 10) % 11;
	} 

    if ((Resto == 10) || (Resto == 11)){
		Resto = 0
	};
    if (Resto != parseInt(cpf.substring(10, 11) ) ){
		alert("CPF INVALIDO");
		return false;
	}
	else{
		return true;
	}
    
}

//função que lista todos os usuários cadastrados no banco
function listar(){
	fetch(url + "usuarios")
	.then(response => response.json())
	.then((usuarios) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaUsuarios = document.getElementById("lista-usuarios");
        //pega o ultimo usuário cadastrado
        let ultimoUsuario = usuarios[usuarios.length-1];
        //concatena o nome e o sobrenome do ultimop usuário
        let nomeCompleto = ultimoUsuario.nome + " " + ultimoUsuario.sobrenome;

        //pega a div do texto do ultimo usuário na "navbar"
        let divTexto = document.getElementById("text-last-user");
        //seta o texto para o nome completo
        divTexto.innerHTML = nomeCompleto;

		
		//limpa div de usuários
		while(listaUsuarios.firstChild)
		{
			listaUsuarios.removeChild(listaUsuarios.firstChild);
		}
		
		//preenche div com usuarios recebidos do GET
		for(let usuario of usuarios){
			//cria div para as informacoes de um usuario
			let divUsuario = document.createElement("div")
			divUsuario.setAttribute("class", "tabela")

            //divUsuario.style.display = "contents";
			
			//pega o nome do usuario
			let divNome = document.createElement("input");
			divNome.placeholder = "Nome";
			divNome.value = usuario.nome;
            divNome.style.margin = "15px"
			divUsuario.appendChild(divNome);


			//pega o sobrenome do usuario
			let divSobrenome = document.createElement("input");
			divSobrenome.placeholder = "Sobrenome";
			divSobrenome.value = usuario.sobrenome;
            divSobrenome.style.margin = "15px"
			divUsuario.appendChild(divSobrenome);

			//pega a data de nascimento do usuario
			let divData = document.createElement("input");
			divData.placeholder = "Data de Nascimento";
			divData.value = usuario.dataNascimento;
            //arruma a margem
            divData.style.margin = "15px"
            //manda para a div da lista de usuáriosenviar();
			divUsuario.appendChild(divData);
			
			//pega o email do usuario
			let divEmail = document.createElement("input");
			divEmail.placeholder = "E-mail";
			divEmail.value = usuario.email;
            //arruma a margem
            divEmail.style.margin = "15px"
            //manda para a div da lista de usuários
			divUsuario.appendChild(divEmail);
			
			//pega o cpf do usuario
			let divCpf = document.createElement("input");
			divCpf.placeholder = "CPF";
			divCpf.value = usuario.cpf;
            //arruma a margem
            divCpf.style.margin = "15px"
            //manda para a div da lista de usuários
			divUsuario.appendChild(divCpf);
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement("button")
			btnRemover.innerHTML = "Remover"
            //efetivamente remove o usuário pela função "remover"
			btnRemover.onclick = u => remover(usuario.id)
            //arruma a margem
			btnRemover.style.marginRight = "5px"
			btnRemover.style.marginLeft = "5px"


			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement("button")
			btnAtualizar.innerHTML = "Atualizar"
            //efetivamente atualiza o usuário pela função "atualizar"
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome, divSobrenome, divData, divEmail, divCpf)
            //arruma a margem
			btnAtualizar.style.marginLeft = "5px"
            btnAtualizar.style.marginRight= "5px"
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement("div")
			divBotoes.style.display = "flex"
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaUsuarios.appendChild(divUsuario)
		}
	})
}

//função para atualizar o cadastro de um usuário no banco fazendo uma requisição de método PUT
function atualizar(id, divNome, divSobrenome, divData, divEmail, divCpf)
{
	let body =
	{
		"Nome": divNome.value,
		"Sobrenome": divSobrenome.value,
		"DataNascimento": divData.value,
		"Email": divEmail.value,
		"Cpf": divCpf.value
	}
	
	fetch(url + "usuarios/" + id,
	{
		"method": "PUT",
		"redirect": "follow",
		"headers":
		{
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		"body": JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert("Usuário atualizado! \\o/")
	})
	.catch((error) =>
	{
		console.log(error)
		alert("Não foi possível atualizar o usuário :/")
	})
}


//função para remover um usuário do banco fazendo uma requisição de método DELETE
function remover(id)
{
	fetch(url + "usuarios/" + id,
	{
		"method": "DELETE",
		"redirect": "follow"
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert("Usuário removido! >=]")
	})
	.catch((error) =>
	{
		console.log(error)
		alert("Não foi possível remover o usuário :/")
	})
}