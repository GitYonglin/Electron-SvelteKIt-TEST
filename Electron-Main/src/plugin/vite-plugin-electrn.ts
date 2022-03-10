import { join, resolve } from 'path';
import { Plugin, ViteDevServer } from 'vite';
import { AddressInfo } from 'net';
import { pack, runElectron } from '.';

function setChdir() {
  process.chdir(join(resolve(__dirname), '../../'));
}
const runPath = process.cwd();
type Version = `${number}.${number}`;
type AppiD = `${string}.${string}.${string}`;
export function vitePluginElectron(config: {
  appId: AppiD;
  copyright: string;
  productName: string;
  buildVersion: Version;
},renderDir = "render"): Plugin {
  return {
    name: 'vite-plugin-electron',
    enforce: 'post',
    // configResolved(config) {
    // },
    /** 调试服务器启动 */
    configureServer: ({ httpServer }: ViteDevServer) => {
      httpServer?.on('listening', async () => {
        const address = httpServer.address() as AddressInfo;
        process.env.VITE_PORT = address?.port.toString();
        setChdir();
        await runElectron();
      })
    },
    /** 编译 */
    closeBundle: async () => {
      setChdir();
      await pack(config, renderDir);
    }
  }
}
