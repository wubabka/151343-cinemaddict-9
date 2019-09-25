import PageController from './controllers/page-controller';

const pageController = new PageController(document.querySelector(`.header`), document.querySelector(`.main`));

pageController.init();
