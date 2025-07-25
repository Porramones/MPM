function falarComEspecialista() {
    alert("Você clicou no botão! Aqui você pode abrir um chat, redirecionar, etc.");
    // window.location.href = "/contato"; // ou o destino desejado
  }
 //Código de multi telas no HTML //
  function mostrarConteudo(id) {
    const secoes = document.querySelectorAll('.conteudo');
    secoes.forEach(sec => sec.classList.remove('ativo'));
    document.getElementById(id).classList.add('ativo');
  }
 //Código de Calculadora do meu primeiro milhão //
  function calcularPrimeiroMilhao() {
    const aporteMensalInput = document.getElementById('aporteMensal');
    const patrimonioAtualInput = document.getElementById('patrimonioAtual');
    const rentabilidadeInput = document.getElementById('rentabilidadeReal');
    const resultado = document.getElementById('resultadoMilhao');
  
    let aporteMensal = parseFloat(aporteMensalInput.value.replace(/\./g, '').replace(',', '.'));
    let patrimonioAtual = parseFloat(patrimonioAtualInput.value.replace(/\./g, '').replace(',', '.'));
    let rentabilidadeAnual = parseFloat(rentabilidadeInput.value.replace(',', '.'));
  
    if (isNaN(aporteMensal) || isNaN(patrimonioAtual) || isNaN(rentabilidadeAnual)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  
    const metaMilhao = 1000000;
    const taxaMensal = (rentabilidadeAnual / 100) / 12;
    let meses = 0;
    let montante = patrimonioAtual;
  
    // Simulação mês a mês
    while (montante < metaMilhao && meses < 1000 * 12) { // Limite de 1000 anos para evitar loop infinito
      montante = montante * (1 + taxaMensal) + aporteMensal;
      meses++;
    }
  
    if (meses >= 1000 * 12) {
      resultado.innerText = "Com os valores informados, não será possível atingir R$ 1.000.000,00.";
      return;
    }
  
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
  
    const montanteFinal = montante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    let mensagem = `Com aportes mensais de ${aporteMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}, `;
    mensagem += `patrimônio atual de ${patrimonioAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}, `;
    mensagem += `e uma rentabilidade de ${rentabilidadeAnual.toFixed(2)}% ao ano, `;
    mensagem += `você atingirá R$ 1.000.000,00 em aproximadamente ${anos} anos e ${mesesRestantes} meses.`;
  
    mensagem += `\nValor final estimado: ${montanteFinal}`;
  
    resultado.innerText = mensagem;
  }

  //Código de comparador de CDI x LCI/LCA //

  function calcularIR(prazo) {
    if (prazo <= 180) return 0.225;
    if (prazo <= 360) return 0.20;
    if (prazo <= 720) return 0.175;
    return 0.15;
}

function compararInvestimentosCdi() {
    const valor = parseFloat(document.getElementById('valorInvestido').value);
    const dias = parseInt(document.getElementById('prazo').value);
    const cdiAnual = parseFloat(document.getElementById('cdi').value);
    const percCdb = parseFloat(document.getElementById('cdbPercentual').value);
    const percLci = parseFloat(document.getElementById('lciPercentual').value);

    if (isNaN(valor) || isNaN(dias) || isNaN(cdiAnual) || isNaN(percCdb) || isNaN(percLci)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const cdiDiario = Math.pow(1 + cdiAnual / 100, 1 / 365) - 1;

    const brutoCDB = Math.pow(1 + cdiDiario, dias) - 1;
    const rendimentoCDB = brutoCDB * (percCdb / 100);
    const irCDB = calcularIR(dias);
    const liquidoCDB = rendimentoCDB * (1 - irCDB);
    const valorFinalCDB = valor * (1 + liquidoCDB);

    const brutoLCI = Math.pow(1 + cdiDiario, dias) - 1;
    const rendimentoLCI = brutoLCI * (percLci / 100);
    const valorFinalLCI = valor * (1 + rendimentoLCI);

    const melhor = valorFinalCDB > valorFinalLCI ? 'CDB' : 'LCI/LCA';
    const diferenca = Math.abs(valorFinalCDB - valorFinalLCI);

    let texto = `▶ CDB - ${percCdb}% do CDI por ${dias} dias\n`;
    texto += `- Rentabilidade líquida: ${(liquidoCDB * 100).toFixed(2)}%\n`;
    texto += `- Valor final: R$ ${valorFinalCDB.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;

    texto += `▶ LCI/LCA - ${percLci}% do CDI por ${dias} dias\n`;
    texto += `- Rentabilidade líquida (isenta): ${(rendimentoLCI * 100).toFixed(2)}%\n`;
    texto += `- Valor final: R$ ${valorFinalLCI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n`;

    texto += `✅ ${melhor} é a melhor opção neste cenário, com R$ ${diferenca.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} a mais.`;

    document.getElementById('resultadoCdi').innerText = texto;
}

  //Código de liberdade financeira //

  function calcularLiberdadeFinanceira() {
    let rendaMensal = parseFloat(document.getElementById('rendaMensal').value.replace(/\./g, '').replace(',', '.'));
    let patrimonioAtual = parseFloat(document.getElementById('patrimonioAtual').value.replace(/\./g, '').replace(',', '.'));
    let rentabilidadeAnual = parseFloat(document.getElementById('rentabilidadeReal').value.replace(',', '.'));
    let prazoAnos = parseFloat(document.getElementById('prazoAnos').value);

    if (
        isNaN(rendaMensal) || isNaN(patrimonioAtual) ||
        isNaN(rentabilidadeAnual) || isNaN(prazoAnos)
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const rendaAnual = rendaMensal * 12;
    const patrimonioNecessario = rendaAnual / 0.04;
    const faltaAcumular = patrimonioNecessario - patrimonioAtual;

    const prazoMeses = prazoAnos * 12;
    const taxaMensal = (rentabilidadeAnual / 100) / 12;

    const fator = Math.pow(1 + taxaMensal, prazoMeses);
    const aporteMensal = (faltaAcumular > 0)
        ? Math.ceil((faltaAcumular * taxaMensal) / (fator - 1) * 100) / 100
        : 0;

    let mensagem = `Para receber ${rendaMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} por mês (${rendaAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} por ano), você precisará acumular ${patrimonioNecessario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.`;

    if (faltaAcumular > 0) {
        mensagem += `\nAtualmente você tem ${patrimonioAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}, e faltam ${faltaAcumular.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para atingir esse objetivo.`;

        mensagem += `\nPara alcançar isso em ${prazoAnos} anos com uma rentabilidade real de ${rentabilidadeAnual.toFixed(2)}% ao ano, você precisa investir ${aporteMensal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} por mês.`;
    } else {
        mensagem += `\nParabéns! Você já atingiu (ou ultrapassou) sua liberdade financeira.`;
    }

    document.getElementById('resultadoLiberdade').innerText = mensagem;
    function falarComEspecialista() {
        alert("Você clicou no botão! Aqui você pode abrir um chat, redirecionar, etc.");
        // window.location.href = "/contato"; // ou o destino desejado
      }
}


