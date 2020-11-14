var firebaseConfig = {
    apiKey: "AIzaSyBQDsy-LKD4glxFqmZ8Xl3zeTK-nb0JuNg",
    authDomain: "receitas-web.firebaseapp.com",
    databaseURL: "https://receitas-web.firebaseio.com",
    projectId: "receitas-web",
    storageBucket: "receitas-web.appspot.com",
    messagingSenderId: "682540538905",
    appId: "1:682540538905:web:139d4548cdc8fad4489e88"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
ref = database.ref('Receitas');
ref.on('value', obterDadosReceitas, error);

let dados = [];

function obterDadosReceitas(data){
    dados = data.val();
    montarCorpoDaPagina();
}

function error(err){
    console.log("Erro ao obter dados das receitas: " + err);
}

function montarCorpoDaPagina(){    
    var view = '';  
    for(var i=0; i < dados.length; i++){
        if(i % 4 === 0){
            view += `<section class="row card_area">
                        <div class="row">`
        }

        view += `<div class="col-12 col-sm-12 col-md-6 col-lg-3">
                    <div class="card">
                        <div class="card-body" id="card-receita-`+dados[i].id+`">
                            <h5 class="card-title">`+ dados[i].nome +`</h5>
                            <p class="card-text">`+dados[i].descricao+`</p>
                            <a href="#" class="btn btn-outline-danger" onClick="preencherDadosModalDetalhes(`+i+`)">
                                <b>Leia mais...</b>
                            </a>
                        </div>
                    </div>
                </div>`
        
        if(i % 4 === 3 || i === dados.length - 1){
            view += `   </div>
                    </section>`
        }
    }

    $('#principal').html(view);    
}

function preencherDadosModalDetalhes(id) {    
    $('#conteudo-modal').text(dados[id].conteudo);
    $('#exampleModalCenterTitle').text(dados[id].nome);
    $('#modal1').modal('show');
}

