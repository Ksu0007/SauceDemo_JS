import { browser } from '@wdio/globals'


export default class Page {

    async open(path) {
        await browser.url(`https://www.saucedemo.com/${path}`);
    }
    
}
