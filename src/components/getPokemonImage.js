
export default function getPokemonImage({id}) {
  return (
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  )
}