<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $imagem = $_FILES['imagem'];
    $nomeArquivo = $_POST['nomeArquivo'];

    // Verifica se a pasta "images" existe, se não, crie-a
    if (!file_exists('images')) {
        mkdir('images', 0777, true);
    }

    $caminhoDestino = 'images/' . $nomeArquivo;

    if (move_uploaded_file($imagem['tmp_name'], $caminhoDestino)) {
        $nomeArquivo = explode('.',$nomeArquivo);
        echo $nomeArquivo[0]; // Retorna o nome gerado para a tela inicial
    } else {
        echo 'Erro ao salvar a imagem.';
    }
}
?>
