
// objeto e as suas respetivas funções
let Form_validador = {

    handle_submit: (event)=>{

        // Para o evento de submit
        // previna o comportamento padrão
        event.preventDefault();

        // envio verdadeiro
        let send = true;

        // pega todos os inputs do formulario
        let inputs = document.querySelectorAll('input');

        // limpar os erros
         Form_validador.clearError();

        for(let i = 0; i < inputs.length; i++){

            // retorna todos os inputs do formulario
            let input = inputs[i];

            // recebe o input especifico e o retorna
            let check = Form_validador.checkInput(input);
           
            // se input diferente de true, quer dizer que ouve erro
            if(check !== true){
               
                // envio falso
                send = false;

                // exibe erro
                // manda o input e o erro
              
                Form_validador.showError(input, check);
                
            }
        }
       

        if(send){
            form.submit();
        }
    },
   
    
    // recebe o proprio input
    checkInput: (input)=>{

        // verefica se input tem a regra
        let rules = input.getAttribute('data-rules');

        if(rules !== null){

            // tem regras na variavel rules
            // separa as regras
            rules = rules.split('|');

            for(let k in rules){
                let regras = rules[k].split('=');
                
               
                // vereficar cada uma das regras ou criar as suas regras
                switch (regras[0]) {
                    case 'required':

                        if(input.value == ''){

                            return 'Campo não pode ser vazio';
                        }

                    break;
                    case 'min':
                        if(input.value.length < regras[1]){

                            return 'Campo não pode ter minimo '+regras[1]+' Caracteres';
                        }
                       
                    break;
                    
                }// end switch

            }//end for

        }//end if

        return true;
    },
    showError:(input, erro)=>{
        input.style.borderColor = '#ff0000';
        
        let errorElement = document.createElement('div');
            errorElement.classList.add('error');
            errorElement.innerHTML = erro;

            input.parentElement.insertBefore(errorElement, input.nextElementSibling );
    },

    clearError:()=>{

        

        // remove os erros de cada input
        let errorElements = document.querySelectorAll('.error');

            for(let i = 0; i < errorElements.length; i++){
                errorElements[i].remove();
            }
        // limpa cada erro no input especifico do formulario
        let clear = form.querySelectorAll('input');

            for(let k=0; k<clear.length; k++){
                clear[k].style = '';
            }
    },

};

// form recebe a classe do formulario 
let form = document.querySelector('.validador');

//vamos fazer o bloqueio no envio, 
//fica a espera quando o formulario tiver um submit
    form.addEventListener('submit', Form_validador.handle_submit);
