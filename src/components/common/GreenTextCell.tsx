type Props = {
  value: string;
  className?: string;
}

export default function GreenTextCell({ value, className }: Props) {
  return (
    <p className={`${className} text-green-primary font-medium`}>{value}</p>
  )
}