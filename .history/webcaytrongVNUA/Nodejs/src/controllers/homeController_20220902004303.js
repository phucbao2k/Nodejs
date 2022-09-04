import db from '../models/index';
import CRUDService from '../services/CRUDService';
let getHomePage = async (req, res) => { 
    try{
let data = await db.User.findAll();
return res.render('homepage.ejs',{
    data: JSON.stringify(data)
});
    }catch(e){
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
 let message=  await CRUDService.createNewUser(req.body);
 console.log(message);
    return res.send('post');
   
}
let displayGetCRUD = async (req, res) => { 
    let data = await CRUDService.getAllUsers();
    console.log('--------------------------------');
    console.log(data);
    console.log('--------------------------------');
    return res.render('displayCRUD.ejs',{
        dataTable: data,
    });}
let getEditCRUD =(req, res) =>{
    let userId = req.query.id;
    let userData = CRUDService.get
console.log(req.query.id);
return res.send('edit');
}
export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,   
    getEditCRUD: getEditCRUD,
};