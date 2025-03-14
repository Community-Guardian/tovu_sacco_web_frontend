import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const team = [
    {
      name: "Bemjamin Karanja",
      role: "CEO",
      image: "https://media.istockphoto.com/id/1446821520/photo/happy-success-and-portrait-of-black-man-startup-ceo-proud-confident-and-leader-african.jpg?s=612x612&w=0&k=20&c=bLUdPqn26HYj-_SlOh9mbco3roKYPKOjk6UAZkwW2Yc=",
    },
    {
      name: "Mary Njeri",
      role: "Operations Manager",
      image: "https://www.shutterstock.com/shutterstock/videos/1034544386/thumb/1.jpg?ip=x480",
    },
    {
      name: "Kelvin Mugo",
      role: "Financial Advisor",
      image: "https://www.shutterstock.com/shutterstock/videos/1034544401/thumb/1.jpg?ip=x480",
    },
  ];

  return (
    <div className="container py-8 mx-auto px-4 md:px-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">About Tovu Sacco</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
            Empowering Dreams Through Goal-Based Savings

At Tovu SACCO, our mission is to empower individuals and communities to achieve their financial dreams through tailored goal-based savings plans. We are dedicated to providing personalized support, innovative financial solutions, and a collaborative environment to help our members reach their unique financial goals faster and more effectively.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-muted-foreground mb-6">
            A Future Where Every Dream is Within Reach

Our vision is to be the leading SACCO in fostering financial empowerment and goal achievement. We envision a future where every member, regardless of their background, has the tools, guidance, and support to turn their financial aspirations into reality. Through our commitment to goal-based savings, we aim to create a thriving community of financially empowered individuals driving positive change and prosperity.
            </p>
            {/* <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground mb-6">
              The core values of Tovu Sacco are integrity, community focus, empowerment, innovation, responsibility, excellence, inclusivity, sustainability, respect, and accountability.
            </p> */}
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="https://www.runnymede.com/wp-content/uploads/2021/09/save-money.jpg" alt="Tovu Sacco Office" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Our Leadership Team</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image src={member.image || "/assets/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Our History</h2>
        <Card>
          <CardHeader>
            <CardTitle>Established in 2010</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Founded in 2010, Tovu Sacco began as a small group of like-minded individuals who believed in the power of
              community savings. Over the years, we've grown to serve thousands of members, always staying true to our
              core values of integrity, community, and financial empowerment.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}