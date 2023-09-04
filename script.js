const inputImagem = document.getElementById('inputImagem');
const labelInputImagem = document.querySelector('label[for="inputImagem"]');
const codigoGeradoSpan = document.getElementById('codigoGerado'); // Refer�ncia ao span

inputImagem.addEventListener('change', () => {
    if (inputImagem.files && inputImagem.files[0]) {
        // Uma imagem foi selecionada, exiba o nome do arquivo na etiqueta
        labelInputImagem.textContent = inputImagem.files[0].name;
    }
});

/**
 * Gerador de nome para imagem
 * @param {string} prefix - Prefixo deve conter um concatenador  Ex: '.' ou '_' ou '-'
 * @param {int} tam - tamanho do c�digo aleat�rio
 * @returns - retornar um nome para imagem de acordo com os par�metros.
 */
function gerarNomeAleatorio( prefix = '', tam = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nomeAleatorio = '';
    for (let i = 0; i < tam; i++) {
        nomeAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return prefix+nomeAleatorio;
}

function salvarImagem() {
    const inputImagem = document.getElementById('inputImagem');
    const imagemExibida = document.getElementById('imagemExibida');

    if (inputImagem.files && inputImagem.files[0]) {
        const imagemSelecionada = inputImagem.files[0];
        const nomeAleatorio = gerarNomeAleatorio('', 10);
        const nomeArquivo = nomeAleatorio + '.' +imagemSelecionada.type.split('/',2)[1];

        const reader = new FileReader();

        reader.onload = function (e) {
            imagemExibida.src = e.target.result;
        };

        reader.readAsDataURL(imagemSelecionada);

        // Enviar a imagem para o servidor
        const formData = new FormData();
        formData.append('imagem', imagemSelecionada);
        formData.append('nomeArquivo', nomeArquivo);

        fetch('./salvar_imagem.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(nomeGerado => {
            // Apenas para fins de exibi��o, voc� pode ajustar isso conforme necess�rio
            codigoGeradoSpan.textContent = nomeGerado;
            inputImagem.value = '';
            labelInputImagem.textContent = 'Arraste e solte ou selecione uma imagem';
        })
        .catch(error => {
            console.error('Erro ao salvar a imagem: ' + error);
        });
    }
}



