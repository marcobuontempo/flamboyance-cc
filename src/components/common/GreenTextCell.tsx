type Props = {
  value: string;
  className?: string;
}

export default function GreenTextCell({ value, className }: Props) {
  return (
    <p className={`${className} bg-green-gradient bg-clip-text text-transparent font-medium`}>{value}</p>
  )
}