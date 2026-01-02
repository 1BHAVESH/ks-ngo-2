import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cows } from "@/data/ngo-data"

const CowsPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-forest text-center mb-6">Our Cows / Gaushala</h1>
          <p className="text-xl text-earth text-center max-w-3xl mx-auto">
            Meet the beautiful souls under our care at our sanctuary
          </p>
        </div>
      </section>

      {/* Cows Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cows.map((cow) => (
              <Card key={cow.id} className="overflow-hidden border-sage hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-sage-light relative">
                  <img src={cow.image || "/placeholder.svg"} alt={cow.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-forest">{cow.name}</h3>
                    {cow.adoptable && <Badge className="bg-forest text-cream">Available</Badge>}
                  </div>
                  <div className="space-y-2 text-earth">
                    <p>
                      <span className="font-semibold text-forest">Age:</span> {cow.age} years
                    </p>
                    <p>
                      <span className="font-semibold text-forest">Health:</span> {cow.health}
                    </p>
                    <p>
                      <span className="font-semibold text-forest">Breed:</span> {cow.breed}
                    </p>
                    <p className="text-sm leading-relaxed pt-2">{cow.story}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CowsPage
