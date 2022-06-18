import { Builder, By, Capabilities, Key, until, WebDriver } from 'selenium-webdriver';

let webDriver: WebDriver | null = null;

/**
 * 初期化処理
 */
const init = async () => {
  webDriver = await new Builder()
    // Chrome起動時のオプションの設定
    .withCapabilities(Capabilities.chrome().set('chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox'
      ],
      w3c: false
    }
    ))
    .build();
};

/**
 * スクレイピング先のURLの設定
 */
const setUrl = (url: string) => {
  if (webDriver) {
    webDriver.get(url);
  }
}

/**
 * メイン関数
 * 
 * @returns 
 */
const main = async () => {
  init();
  setUrl('https://kokushin-u.jp/');

  if (!webDriver) return;

  console.log(await webDriver.wait(until.elementLocated(By.name('title')), 5000).getText());
};

main();
