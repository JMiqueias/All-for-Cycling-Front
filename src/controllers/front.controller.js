const getHome = (req,res) =>{
   
        res.render("home");

}

const getLogin =(req,res) =>{
    res.render('login');
}

const getCadUser =(req,res) =>{
     // Recuperar informações da URL
     const {editar,imagem, nome, valor, categoria, tipo, descricao ,anunciante,telefone,cidade,UF} = req.query;
    res.render('cad_user',{editar,imagem, nome, valor, categoria, tipo, descricao ,anunciante,telefone,cidade,UF});
}

const getCadItem =(req,res) =>{
    res.render('cad_item');
}

const getMore =(req,res) =>{
    // Recuperar informações da URL
    const { imagem, nome, valor, categoria, tipo, descricao ,anunciante,telefone,cidade,UF} = req.query;

    // Renderizar a página correta com as informações recuperadas

    res.render('more',{ imagem, nome, valor, categoria, tipo, descricao,anunciante,telefone,cidade,UF});
}

const geContato =(req,res) =>{
    res.render('contato');
}

const getProds =(req,res) =>{

      res.render('meus_produtos');
}

const getSobre =(req,res) =>{

  res.render('sobre');
}

module.exports ={
    getHome,
    getLogin,
    getCadUser,
    getCadItem,
    geContato,
    getProds,
    getMore,
    getSobre
};