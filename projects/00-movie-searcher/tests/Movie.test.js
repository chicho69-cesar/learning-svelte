import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/svelte'

import Movie from '../src/lib/Movie.svelte'

/* 'describe' es una función que nos permite agrupar tests. En este caso, estamos 
agrupando todos los tests que queramos hacer sobre el componente Movie. En el primer 
parámetro le pasamos el nombre del grupo de tests, y en el segundo parámetro una 
función que contiene todos los tests. */
describe('Movie', () => {
  /* 'it' es una función que nos permite crear un test. En este caso, estamos creando 
  un test que comprueba que el componente está definido. En el primer parámetro le 
  pasamos el nombre del test, y en el segundo parámetro una función que contiene 
  el test. */
  it('should be defined', () => {
    /* 'expect' es una función que nos permite hacer una aserción. En este caso, estamos 
    comprobando que el componente está definido. Existen una gran cantidad de 
    aserciones que podemos usar, como toBe, toReturn, toThrow… */
    expect(Movie).toBeDefined()
  })

  it('should be render correctly', () => {
    /* render de @testing-library/svelte recibe dos parámetros: el componente a 
    renderizar y las propiedades que queramos pasar al componente. En este caso, 
    le estamos pasando las propiedades title, year y poster. */
    const { getByAltText } = render(Movie, {
      props: {
        title: 'The Matrix',
        year: 1999,
        poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
      }
    })

    const img = getByAltText('The Matrix')
    expect(img.getAttribute('src')).toBe('https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg')
  })
})
