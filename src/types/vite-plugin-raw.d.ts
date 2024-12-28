declare module 'vite-plugin-raw' {
    interface RawPluginOptions {
      fileRegex?: RegExp;
    }
  
    function rawPlugin(options?: RawPluginOptions): any;
    export default rawPlugin;
  }
  