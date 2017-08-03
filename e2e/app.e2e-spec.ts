import { SimNgProjectsPage } from './app.po';

describe('sim-ng-projects App', () => {
  let page: SimNgProjectsPage;

  beforeEach(() => {
    page = new SimNgProjectsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
