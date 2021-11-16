import esmModule from './static-esm-module'

const getLazyModule = async () => (await import('./lazy-module')).default

setTimeout(() => {
  getLazyModule().then((modDefault) => {
    console.log(modDefault)

    const element = document.createElement('div')
    element.innerText = modDefault
    document.body.appendChild(element)
  })
}, 300)

console.log(esmModule)
