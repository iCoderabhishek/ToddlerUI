import componentsData from "@/data/components.json";
import { ComponentsData, PropData } from "@/types";
import ComponentClient from "./ClientComponentPage";

const data = componentsData as ComponentsData;

interface ComponentPageProps {
  params: {
    component: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(data.components).map((component) => ({
    component,
  }));
}

export async function generateMetadata({ params }: ComponentPageProps) {
  const { component } = params;

  const componentData = data.components[component];

  if (!componentData) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: `${componentData.title} - TodlerrUI`,
    description: componentData.description,
  };
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const componentData = data.components[params.component];
  if (!componentData) return <div>Component not found</div>;

  // Pass data down into the Client Component
  return <ComponentClient componentData={componentData} allData={data} />;
}
