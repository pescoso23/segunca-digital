// Localiza o campo onde a senha será exibida
const campoSenha = document.querySelector("#campo-senha");
// Localiza o número que mostra o tamanho da senha
const numeroSenha = document.querySelector("#numero-senha");

// Caracteres que poderão ser utilizados
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const caracteresEspeciais = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const todosOsCaracteres = letrasMaiusculas + letrasMinusculas + numeros + caracteresEspeciais;

// Tamanho inicial da senha
let tamanhoSenha = 8;

// Gera a primeira senha quando a página abrir
geraSenha();

// Função responsável por gerar a senha
function geraSenha() {
  let senha = "";
  
  // Garante que a senha tem pelo menos um caractere de cada tipo
  let caracteres = [
    letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)],
    letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)],
    numeros[Math.floor(Math.random() * numeros.length)]
  ];
  
  // Preenche o resto da senha aleatoriamente
  for (let i = 3; i < tamanhoSenha; i++) {
    const indice = Math.floor(Math.random() * todosOsCaracteres.length);
    caracteres.push(todosOsCaracteres[indice]);
  }
  
  // Embaralha os caracteres
  senha = caracteres.sort(() => Math.random() - 0.5).join("");
  
  // Exibe a senha no campo
  campoSenha.value = senha;
  
  return senha;
}

// Diminui o tamanho da senha
function diminuiTamanho() {
  if (tamanhoSenha > 1) {
    tamanhoSenha--;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

// Aumenta o tamanho da senha
function aumentaTamanho() {
  if (tamanhoSenha < 20) {
    tamanhoSenha++;
  }
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
}

// Copia a senha para a área de transferência
function copiarSenha() {
  const senha = campoSenha.value;
  navigator.clipboard.writeText(senha).then(() => {
    alert("Senha copiada para a área de transferência!");
  }).catch(() => {
    alert("Erro ao copiar a senha!");
  });
}

// Função para testar a força da senha
function testarSenha(senha) {
  if (
    senha.match(/[A-Z]/) &&
    senha.match(/[a-z]/) &&
    senha.match(/[0-9]/)
  ) {
    return true;
  }
  return false;
}

// Função para gerar senhas seguras
function geraSenhasSeguras() {
  let senha;
  do {
    senha = geraSenha();
  } while (testarSenha(senha) === false);
  return senha;
}