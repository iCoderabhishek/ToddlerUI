import componentsData from "@/data/components.json";
import { ComponentsData } from "@/types";
import ComponentClient from "./ClientComponentPage";

const data = componentsData as ComponentsData;

export async function generateStaticParams() {
  return Object.keys(data.components).map((component) => ({
    component,
  }));
}

// Updated to await params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
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

// Updated to await params
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const componentData = data.components[component];

  if (!componentData) return <div>Component not found</div>;

  return <ComponentClient componentData={componentData} allData={data} />;
}
