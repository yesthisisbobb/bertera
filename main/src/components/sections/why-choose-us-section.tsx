
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mountain, Award, ShieldCheck } from "lucide-react"; // Changed Users to ShieldCheck for producer aspect

export function WhyChooseUsSection() {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-accent" />,
      title: "Sustainable Agroforestry",
      description:
        "As 'forest friends,' we practice agroforestry, growing our coffee in harmony with nature. This promotes biodiversity, protects ecosystems, and results in uniquely flavored, sustainably sourced beans.",
    },
    {
      icon: <Mountain className="h-10 w-10 text-accent" />,
      title: "Signature Arjuno Coffee",
      description:
        "Experience the exceptional taste of our Arjuno coffee, cultivated on the fertile volcanic slopes of Mount Arjuno in Pandaan, Pasuruan. This origin, near our main farm, produces beans with a distinctive heavy body and syrupy mouthfeel.",
    },
    {
      icon: <Award className="h-10 w-10 text-accent" />,
      title: "Uncompromising Quality",
      description:
        "From meticulous bean selection to expert processing, we are dedicated to delivering premium Indonesian coffee that consistently exceeds expectations. Quality is at the heart of everything we do.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-accent" />, // Changed icon
      title: "Producer & Direct Sourcing", // Changed title
      description:
        "We are primarily producers with our own farm, ensuring quality control from seed to cup. We also work closely with select partner farmers, guaranteeing traceability and ethical practices, not just acting as traders.", // Changed description
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose Bertera Niaga Global?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the distinct advantages of partnering with us for your premium Indonesian coffee needs. We go beyond borders to bring you beyond expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <CardHeader className="items-center">
                <div className="p-3 bg-accent/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl lg:text-2xl text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
