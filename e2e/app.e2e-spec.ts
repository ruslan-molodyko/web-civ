import { AngularWatchPage } from './app.po';

describe('angular-watch App', function() {
  let page: AngularWatchPage;

  beforeEach(() => {
    page = new AngularWatchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
