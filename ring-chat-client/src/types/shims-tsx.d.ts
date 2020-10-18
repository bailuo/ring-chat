import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    webkitURL?: any;
  }

  declare let window: Window;

  if (window.webkitURL !== undefined) {
    console.log(window.webkitURL);
  }
}
