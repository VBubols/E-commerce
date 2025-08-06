let login = '', senha, qtdCont = 0, valor = 0, totalGeral = 0, cesta, loginAut
let article, div, div2, h2, h3, p1, p3, input, span, span2, aLink, aLink2, main, section, footer 
let usr = []
let snh = []

let produto = []
if(localStorage.prodArr){
    produto = JSON.parse(localStorage.getItem('prodArr'))
}

let cod = []
if(localStorage.codArr){
    cod = JSON.parse(localStorage.getItem('codArr'))
}

let preco = []
if(localStorage.precoArr){
    preco = JSON.parse(localStorage.getItem('precoArr'))
}

let descricao = []
if(localStorage.descricaoArr){
    descricao = JSON.parse(localStorage.getItem('descricaoArr'))
}

let qtd = []
if(localStorage.qtdArr){
    qtd = JSON.parse(localStorage.getItem('qtdArr'))
}

let totalCompra = []
if(localStorage.totCompArr){
    totalCompra = JSON.parse(localStorage.getItem('totCompArr'))
}

function montaHTML(){
    main = document.createElement('main')
    main.setAttribute('class', 'container')
    document.body.append(main)

    section = document.createElement('section')
    section.setAttribute('class', 'products-container')
    document.body.append(section)

    for(i in produto){
        article = document.createElement('article')
        article.setAttribute('class', 'card')
        section.append(article)

        div = document.createElement('div')
        div.setAttribute('class', 'product-image')
        div.setAttribute('id', 'img-' + i)
        div.setAttribute('onclick', 'abrelink(' + i + ')')
        article.append(div)

        document.getElementById('img-' + i).style.backgroundImage = 'url(./imagens/img' + i + '.jpg)'

        h3 = document.createElement('h3')
        h3.setAttribute('id', 'nome' + i)
        h3.innerHTML = produto[i]
        article.append(h3)

        p1 = document.createElement('p')
        p1.setAttribute('hidden', 'true')
        p1.innerHTML = 'Quantidade: '

        input = document.createElement('input')
        input.setAttribute('type', 'Number')
        input.setAttribute('value', '1')
        input.setAttribute('min', '1')
        input.setAttribute('max', '10')
        input.setAttribute('hidden', 'true')
        input.setAttribute('id', 'qtd-' + i)
        p1.append(input)
        article.append(p1)

        p2 = document.createElement('p')
        p2.innerHTML = 'R$ '

        span = document.createElement('span')
        span.setAttribute('id', cod[i])
        span.setAttribute('class', 'bold')
        span.innerHTML = preco[i].toFixed(2).replace('.', ',')
        p2.append(span)
        article.append(p2)
    }
    
    footer = document.createElement('footer')
    footer.setAttribute('id', 'rodape')
    document.body.append(footer)

    h2 = document.createElement('h2')
    h2.innerHTML = 'Informações sobre o site'
    footer.append(h2)

    p3 = document.createElement('p')
    p3.innerHTML = '&copy; 2025'
    footer.append(p3)

    span2 = document.createElement('span')
    span2.setAttribute('class', 'bold')
    span2.innerHTML = 'Loja dos Heróis'
    p3.append(span2)

    aLink2 = document.createElement('a')
    aLink2.setAttribute('id', 'adm')
    aLink2.setAttribute('href', 'atualizacao.html')
    aLink2.innerHTML = 'Administração'
    footer.append(aLink2)

    let logA = localStorage.getItem('loginAutenticado')
    if(logA == 'null' || logA == 'undefined'){
        document.getElementById('log').innerHTML = 'Login'
    } else{
        document.getElementById('log').innerHTML = `Bem-vindo, ${localStorage.getItem('loginAutenticado')}!`
    }
}

function criaLogin(){
    if(localStorage.usrArr){
        usr = JSON.parse(localStorage.getItem('usrArr'))
    }
    if(localStorage.snhArr){
        snh = JSON.parse(localStorage.getItem('snhArr'))
    }

    let novoUsr = prompt("Digite o nome de usuário:")
    usr.push(novoUsr)
    localStorage.usrArr = JSON.stringify(usr)

    let novaSnh = prompt("Digite uma senha:")
    snh.push(novaSnh)
    localStorage.snhArr = JSON.stringify(snh)

    if(usr.includes(novoUsr) && snh.includes(novaSnh)){
        alert("Login criado com sucesso")
    } else{
        alert("Login não foi possível criar seu login. Erro desconhecido.")
    }
}

function abreTelaLogin(){
    if(localStorage.usrArr){
        usr = JSON.parse(localStorage.getItem('usrArr'))
    }
    if(localStorage.snhArr){
        snh = JSON.parse(localStorage.getItem('snhArr'))
    }

    login = prompt("Digite seu nome de usuário:")
    senha = prompt("Digite sua senha:")

    let indUsr = usr.indexOf(login)
    if(usr[indUsr] == login && snh[indUsr] == senha){
        localStorage.setItem('loginAutenticado', login)
        loginAut = localStorage.getItem('loginAutenticado')
        document.getElementById('log').innerHTML = `Bem-vindo, ${loginAut}!`
    } else{
        document.getElementById('log').innerHTML = 'Login'
        alert(`Digite um usuário/senha válidos\nou crie um novo login no link ao lado.`)
    }
}

function compra(qtdId, produt, posArr){
    if(localStorage.posArr){
        qtd[posArr] = parseInt(document.getElementById(qtdId).value)
    } else{
        localStorage.posArr = JSON.stringify(qtd)
    }
    totalCompra[posArr] = qtd[posArr] * parseFloat(document.getElementById(produt).innerText.replace(',', '.'))
    localStorage.qtdArr = JSON.stringify(qtd)
    localStorage.totCompArr = JSON.stringify(totalCompra)
    localStorage.setItem('produtoIndividual', produto[posArr])
    localStorage.setItem('descricaoIndividual', descricao[posArr])
    let url_atual = window.location.href 
    if(url_atual != "http://127.0.0.1:5500/produto.html" && url_atual != "http://127.0.0.1:5500/produto.html#"){
        window.location.href = "/produto.html"
    }
    alert("Produto adicionado ao carrinho!")
}

function calculaCesta(){
    usr = JSON.parse(localStorage.getItem('usrARR'))
    loginAut = localStorage.getItem('loginAutenticado')
    if(usr.includes(loginAut)){
        let textoCarrinho = ''
        for(i in qtd){
            if(qtd[i] > 0){
                totalGeral += totalCompra[i]
                textoCarrinho += qtd[i] + " x " + preco[i].toFixed(2).replace('.', ',') + " - Boneco " + produto[i] + " R$ " + totalCompra[i].toFixed(2).replace('.', ',') + "\n"
            }
        }
        if(totalGeral > 0){
            alert(`${textoCarrinho} 
                =================================
                Total da compra       R$ ${totalGeral.toFixed(2).replace('.', ',')}
                `)
        }
    }
}