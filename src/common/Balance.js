import { useBalance } from '@vechain.energy/use-vechain'

export default function Balance ({ address }) {
  const { vet, vtho } = useBalance(address)

  return (
    <div>
      VET: {vet} | VTHO: {vtho}
    </div>
  )
}
