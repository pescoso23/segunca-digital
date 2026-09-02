const senhaInput = document.getElementById("senha");
const checkboxMaiusculas = document.getElementById("maiusculas");
const checkboxMinusculas = document.getElementById("minusculas");
const checkboxEspeciais = document.getElementById("especiais");
const botaoValidar = document.getElementById("validarSenha");
const botaoGerar = document.getElementById("gerarSenha");
const botaoDiminuir = document.getElementById("diminuirTamanho");
const botaoAumentar = document.getElementById("aumentarTamanho");
const valorTamanho = document.getElementById("valorTamanho");
const statusTexto = document.getElementById("status");
const barraForca = document.getElementById("barraForca");

let tamanhoSenha = 12;

function atualizarTamanhoSenha() {
  valorTamanho.textContent = tamanhoSenha;
}

function gerarSenhaAleatoria() {
  const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const especiais = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let caracteresDisponiveis = numeros;

  if (checkboxMaiusculas.checked) caracteresDisponiveis += letrasMaiusculas;
  if (checkboxMinusculas.checked) caracteresDisponiveis += letrasMinusculas;
  if (checkboxEspeciais.checked) caracteresDisponiveis += especiais;

  let senha = "";

  for (let i = 0; i < tamanhoSenha; i++) {
    const indice = Math.floor(Math.random() * caracteresDisponiveis.length);
    senha += caracteresDisponiveis[indice];
  }

  senhaInput.value = senha;
  validarSenha();
}

function verificarForcaSenha(senha) {
  const regrasAtivas = {
    maiusculas: checkboxMaiusculas.checked,
    minusculas: checkboxMinusculas.checked,
    especiais: checkboxEspeciais.checked,
  };

  let pontuacao = 0;

  if (senha.length >= 12) pontuacao += 1;
  if (senha.length >= 8) pontuacao += 1;
  if (/[A-Z]/.test(senha) && regrasAtivas.maiusculas) pontuacao += 1;
  if (/[a-z]/.test(senha) && regrasAtivas.minusculas) pontuacao += 1;
  if (/[^A-Za-z0-9]/.test(senha) && regrasAtivas.especiais) pontuacao += 1;

  const requisitosAtendidos = [
    !regrasAtivas.maiusculas || /[A-Z]/.test(senha),
    !regrasAtivas.minusculas || /[a-z]/.test(senha),
    !regrasAtivas.especiais || /[^A-Za-z0-9]/.test(senha),
  ].every(Boolean);

  if (senha.length === 0) {
    return { forca: "Aguardando senha", cor: "#9ca3af", largura: 0 };
  }

  if (pontuacao >= 5 && requisitosAtendidos) {
    return { forca: "Forte", cor: "#22c55e", largura: 100 };
  }

  if (pontuacao >= 3 && requisitosAtendidos) {
    return { forca: "Médio", cor: "#f59e0b", largura: 65 };
  }

  return { forca: "Fraco", cor: "#ef4444", largura: 30 };
}

function validarSenha() {
  const senha = senhaInput.value;
  const resultado = verificarForcaSenha(senha);

  statusTexto.textContent = resultado.forca;
  statusTexto.style.color = resultado.cor;
  barraForca.style.width = `${resultado.largura}%`;
  barraForca.style.background = resultado.cor;
}

botaoDiminuir.addEventListener("click", () => {
  if (tamanhoSenha > 6) {
    tamanhoSenha--;
    atualizarTamanhoSenha();
    gerarSenhaAleatoria();
  }
});

botaoAumentar.addEventListener("click", () => {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
    atualizarTamanhoSenha();
    gerarSenhaAleatoria();
  }
});

botaoValidar.addEventListener("click", validarSenha);
botaoGerar.addEventListener("click", gerarSenhaAleatoria);
senhaInput.addEventListener("input", validarSenha);

atualizarTamanhoSenha();