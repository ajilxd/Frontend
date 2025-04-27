import { BrainCog, Package, ThumbsUp, Trophy, Users, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BrainCog,
    title: "Creative minds",
    description:
      "We choose our teams carefully. Our people are the secret to great work.",
  },
  {
    icon: Package,
    title: "Effortless updates",
    description:
      "Benefit from automatic updates to all boards any time you need to make a change to your website.",
  },
  {
    icon: Zap,
    title: "Strong empathy",
    description:
      "We've user tested our own process by shipping over 1k products for clients.",
  },
  {
    icon: Trophy,
    title: "Conquer the best",
    description: "We stay lean and help your product do one thing well.",
  },
  {
    icon: Users,
    title: "Designing for people",
    description:
      "We actively pursue the right balance between functionality and aesthetics, creating delightful experiences.",
  },
  {
    icon: ThumbsUp,
    title: "Simple and affordable",
    description:
      "From boarding passes to movie tickets, there's pretty much nothing you can't do.",
  },
];

export default function IconSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why choose our platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Our innovative approach combines cutting-edge technology with
              exceptional design to deliver outstanding results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-none bg-transparent"
              >
                <CardContent className="flex items-start space-x-4 p-0">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 dark:bg-primary/20 p-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
