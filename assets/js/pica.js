import Pica from 'pica'

export function resize(image, canvas) {
  const pica = new Pica()
  return pica.resize(image, canvas, {
    alpha: true
  })
}
