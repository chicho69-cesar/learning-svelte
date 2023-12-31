import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/svelte'

import App from '../src/App.svelte'
import { RESPONSE_WITH_AVENGERS_MOVIES } from '../mocks/api-omdb'

describe('App', () => {
  it('user should be able to search a movie and get results', async () => {
    const { getByRole, findAllByText, findAllByAltText } = render(App)

    /* mockeamos las llamadas al método fetch de forma que devolvemos siempre la 
    respuesta mockeada */
    global.fetch = vi.fn().mockImplementationOnce(
      () => Promise.resolve({
        ok: true, // necesitamos que la respuesta sea correcta
        json: () => Promise.resolve(RESPONSE_WITH_AVENGERS_MOVIES)
      })
    )

    // recuperamos el input para la película
    const input = getByRole('textbox')
    // recuperamos el formulario del input
    const form = input.closest('form')

    // escribimos la película que queremos buscar en el input
    await fireEvent.input(input, { target: { value: 'Avengers' } })
    // enviamos el formulario
    await fireEvent.submit(form)

    // buscamos todos los títulos de Avengers por su texto
    const title = await findAllByText(/The Avengers/i)
    // recuperamos las imágenes de los resultados por su alt
    const img = await findAllByAltText(/The Avengers/i)

    // revisamos que estén definidos
    expect(title[0]).toBeDefined()
    expect(img[0]).toBeDefined()
  })
})
