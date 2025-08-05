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

}