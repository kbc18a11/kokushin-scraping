import { Builder, By, Capabilities, WebDriver } from 'selenium-webdriver';

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
const setUrl = async (url: string) => {
  if (webDriver) {
    await webDriver.get(url);
  }
}

/**
 * メイン関数
 * 
 * @returns 
 */
const main = async () => {
  await init();
  await setUrl('https://kokushin-u.jp/');

  if (!webDriver) return;

  // タイトル取得
  console.log(await webDriver.getTitle());

  const news = await webDriver.findElements(By.className('post'));

  news.forEach(async (element) => {
    console.log(await element.getText());
  });
};

main();
