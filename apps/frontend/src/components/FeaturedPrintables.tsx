import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import type { Printable } from "@/types"

interface FeaturedPrintablesProps {
  printables: Printable[]
}

export default function FeaturedPrintables({ printables }: FeaturedPrintablesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % printables.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [printables.length])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const currentPrintable = printables[currentIndex]

  return (
    <div className="relative">
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-square md:aspect-auto overflow-hidden">
            <img
              src={currentPrintable.image || "/placeholder.svg"}
              alt={currentPrintable.title}
              className="object-cover md:object-contain"
            />
            <Badge className="absolute top-4 left-4 z-10">Featured</Badge>
          </div>
          <CardContent className="flex flex-col justify-center p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{currentPrintable.title}</h2>
                <p className="text-muted-foreground">by {currentPrintable.creator.name}</p>
              </div>
              <p className="text-muted-foreground">{currentPrintable.description}</p>
              <div className="flex items-center gap-2">
                <div className="font-bold text-xl">
                  {currentPrintable.price === 0 ? (
                    "Free"
                  ) : (
                    <>
                      ${currentPrintable.price.toFixed(2)}
                      {currentPrintable.originalPrice && (
                        <span className="ml-2 text-base text-muted-foreground line-through">
                          ${currentPrintable.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="gap-2" size="lg">
                  <Download className="h-4 w-4" />
                  {currentPrintable.price === 0 ? "Download Now" : "Buy Now"}
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to={`/printable/${currentPrintable.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
      <div className="flex justify-center gap-2 mt-4">
        {printables.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}