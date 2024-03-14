import type { Compiler } from 'webpack'

export default class CodeletHMRPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('TaroMiniHMRPlugin', (compilation) => {
      compilation.hooks.beforeChunkAssets.tap('TaroMiniHMRPlugin', () => {
        compilation.chunks.forEach((chunk) => {
          console.log('runtimeModules 11111 => ', chunk.name, chunk.hasRuntime())
          if (chunk.hasRuntime() && chunk.name === 'bundle') {
            const runtimeModules = compilation.chunkGraph.getChunkRuntimeModulesInOrder(chunk)
            for (const module of runtimeModules) {
              if (module.name === 'jsonp chunk loading') {
                console.log('runtimeModules 22222 => ', module)
                const runtimeSource: any = compilation.codeGenerationResults.getSource(
                  module,
                  chunk.runtime,
                  'runtime',
                )
                runtimeSource._value += `
                var miniHMRCallback = function(parentChunkLoadingFunction, data) {
                  var chunkIds = data[0];
                  var moreModules = data[1];
                  if(chunkIds.some(function(id) { return installedChunks[id] === 0 })) {
                    chunkIds.forEach(id => {
                      delete installedChunks[id]
                    })
                    Object.keys(moreModules).forEach(id => {
                      delete __webpack_module_cache__[id]
                    })
                  }
                  if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
                }
                chunkLoadingGlobal.push = miniHMRCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
                `
              }
            }
          }
        })
      })
    })
  }
}
