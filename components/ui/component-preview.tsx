"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import CoolTodo from "@/components/CoolTodo";
import FlyTestimonial from "@/components/FlyTestimonial";
import OrbitAnimation from "@/components/OrbitMotion";
import CardSplitMenu from "@/components/CardSplitMenu";
import CookieCard from "@/components/CookieCard";
import FeaturesGrid from "@/components/FeatureGrid";
import { FunRotatingText } from "@/components/RotatingText";
import SparkleButton from "@/components/SparkleButton";
import { ComponentData } from "@/types";
import { Home, Settings, User, Mail, Heart, Star } from "lucide-react";

interface ComponentPreviewProps {
  componentData: ComponentData;
}

export function ComponentPreview({ componentData }: ComponentPreviewProps) {
  const componentKey = Object.keys(componentsData.components).find(
    (key) => componentsData.components[key].title === componentData.title
  );

  // Component renderers based on component key
  switch (componentKey) {
    case "cool-todo":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8">
          <CoolTodo
            todos={
              componentData.demoData?.todos || [
                { id: 1, title: "Finish  project", completed: false },
                { id: 2, title: "Read docs", completed: true },
                { id: 3, title: "Workout", completed: false },
              ]
            }
            speed="normal"
            fontStyle="font-mono"
            color="text-neutral-700"
          />
        </div>
      );

    case "fly-testimonial":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8">
          <FlyTestimonial className="" font="font-serif" speed="normal" />
        </div>
      );

    case "orbit-animation":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-4 h-96 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[300px] max-h-[300px] flex items-center justify-center">
            <OrbitAnimation />
          </div>
        </div>
      );

    case "card-split-menu":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8 flex justify-center items-center h-64">
          <CardSplitMenu
            items={[
              { icon: <Home size={20} />, name: "Home" },
              { icon: <Settings size={20} />, name: "Settings" },
              { icon: <User size={20} />, name: "Profile" },
              { icon: <Mail size={20} />, name: "Messages" },
            ]}
            direction="right"
            autoTrigger={true}
            openDelay={1000}
            closeDelay={3000}
            repeat={true}
          />
        </div>
      );

    case "cookie-card":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8 relative h-64 block">
          <CookieCard
            heading="Yes, we use cookies 🍪"
            message="Our cookies don't predict the future, but they do help us remember you!"
            acceptText="Accept Cookies"
            rejectText="Manage Preferences"
            speed="normal"
            placement="bottom-right"
            className=""
            fontClassName=""
          />
        </div>
      );

    case "feature-cards":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-4">
          <FeaturesGrid
            featuresArray={[
              {
                id: 1,
                title: "Fast Performance",
                description:
                  "Lightning-fast components built for modern web applications",
                iconUrl: "https://img.icons8.com/fluent/48/000000/speed.png",
              },
              {
                id: 2,
                title: "Easy Integration",
                description:
                  "Simple copy-paste components that work out of the box",
                iconUrl: "https://img.icons8.com/fluent/48/000000/puzzle.png",
              },
              {
                id: 3,
                title: "Customizable",
                description:
                  "Fully customizable with Tailwind CSS and modern design patterns",
                iconUrl:
                  "https://img.icons8.com/fluent/48/000000/paint-palette.png",
              },
            ]}
            cardSize={{ width: "w-full", height: "h-48" }}
            hoverBgColor="#FEF3C7"
            floatingCircles={true}
          />
        </div>
      );

    case "text-animations":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8 flex justify-center items-center h-32">
          <FunRotatingText
            text={["Playful Animations", "Made by Todlerr", "Nothing Fancy"]}
            duration={2000}
            containerClassName="text-center"
          />
        </div>
      );

    case "sparkle-button":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-8 flex justify-center items-center h-32">
          <SparkleButton text="Hover Me" />
        </div>
      );

    case "animated-testimonials":
      return (
        <div className="bg-amber-50 border border-amber-50 rounded-lg p-4">
          <AnimatedTestimonials
            testimonials={
              componentData.demoData?.testimonials || [
                {
                  quote:
                    "This component library has transformed how I build interfaces. The animations are smooth and the code is clean.",
                  name: "Sarah Chen",
                  designation: "Frontend Developer",
                  src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&h=150&auto=format&fit=crop",
                },
                {
                  quote:
                    "I love how easy it is to integrate these components. They work perfectly with my existing design system.",
                  name: "Michael Rodriguez",
                  designation: "UI/UX Designer",
                  src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
                },
                {
                  quote:
                    "The attention to detail in these animations is incredible. My users love the smooth interactions.",
                  name: "Emily Johnson",
                  designation: "Product Manager",
                  src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
                },
              ]
            }
            autoplay={false}
          />
        </div>
      );

    default:
      return (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-amber-800 mb-2">
            {componentData.title}
          </h3>
          <p className="text-amber-600">Preview coming soon...</p>
        </div>
      );
  }
}

// Import the components data to access component keys
const componentsData = {
  components: {
    "cool-todo": { title: "Cool Todo" },
    "fly-testimonial": { title: "Fly Testimonial" },
    "orbit-animation": { title: "Orbit Animation" },
    "card-split-menu": { title: "Card Split Menu" },
    "cookie-card": { title: "Cookie Card" },
    "feature-cards": { title: "Feature Cards" },
    "text-animations": { title: "Text Animation" },
    "sparkle-button": { title: "Sparkle Button" },
    "animated-testimonials": { title: "Animated Testimonials" },
  },
};
