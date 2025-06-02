document.addEventListener('DOMContentLoaded', function() {
    var vlrYuan = 0.78;
    var yuan = document.querySelector("#yuan");
    var real = document.querySelector("#real");

    yuan.addEventListener("keyup", () => {
        conversao("yuan-real");
    });
    
    real.addEventListener("keyup", () => {
        conversao("real-yuan");
    });

    yuan.addEventListener("blur", () => {
        yuan.value = formatar(yuan.value);
    });
    
    real.addEventListener("blur", () => {
        real.value = formatar(real.value);
    });

    yuan.value = "1,28";
    conversao("yuan-real");

    function formatar(value) {
        let vlr_con = consertar(value);
        let opcoes = {
            useGrouping: false,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        let formatador = new Intl.NumberFormat("pt-BR", opcoes);
        return formatador.format(vlr_con);
    }

    function consertar(value) {
        let vlr_con = value.replace(",", ".");
        let floatValue = parseFloat(vlr_con);
        if(isNaN(floatValue)) {
            floatValue = 0;
        }
        return floatValue;
    }

    function conversao(type) {
        if(type == "yuan-real") {
            let vlr_con = consertar(yuan.value);
            let valor_final = vlr_con * vlrYuan;
            valor_final = valor_final.toFixed(2);
            real.value = formatar(valor_final);
        }
        if(type == "real-yuan") {
            let vlr_con = consertar(real.value);
            let valor_final = vlr_con / vlrYuan;
            valor_final = valor_final.toFixed(2);
            yuan.value = formatar(valor_final);
        }
    }
});