import db from '../models/index';

let getHomePage =áync(req, res) => { 
    
    return res.render('homepage.ejs')
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

export default {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
};
