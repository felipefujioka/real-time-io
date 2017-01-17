import { RealTimeIoPage } from './app.po';

describe('real-time-io App', function() {
  let page: RealTimeIoPage;

  beforeEach(() => {
    page = new RealTimeIoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
