type Props = {
  value: string;
}

export default function GreenTextCell({ value }: Props) {
  return (
    <p className="text-green-primary font-medium">{value}</p>
  )
}