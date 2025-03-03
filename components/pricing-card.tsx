import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
interface PricingCardProps {
    title: string
    description: string
}

export function PricingCard({ title, description }: PricingCardProps) {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter className="pt-4"></CardFooter>
        </Card>
    )
}