"use client";

import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { ComponentPreview } from "@/components/ui/component-preview";
import { Monitor, Code, Package, Settings } from "lucide-react";
import componentsData from "@/data/components.json";
import { ComponentsData, PropData } from "@/types";
import { TOC_INTERFACE } from "@/components/DynamicScrolland";
import { useState } from "react";
import FeaturesGrid from "@/components/FeatureGrid";
import FloatingSearch from "@/components/FloatingNav";

const data = componentsData as ComponentsData;

interface PropsTableProps {
  props: PropData[];
}

const tocData: TOC_INTERFACE[] = [
  { name: "Preview", value: "preview" },
  { name: "Installation", value: "installation" },
  { name: "Props", value: "props" },
];

function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-amber-100 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-amber-100">
            <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-900">
              Prop
            </th>
            <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-900">
              Type
            </th>
            <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-900">
              Default
            </th>
            <th className="border border-amber-200 px-4 py-3 text-left font-semibold text-amber-900">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={index} className="bg-white hover:bg-amber-50">
              <td className="border border-amber-200 px-4 py-3 font-mono text-sm text-amber-800">
                {prop.prop}
                {prop.required && <span className="text-red-500 ml-1">*</span>}
              </td>
              <td className="border border-amber-200 px-4 py-3 font-mono text-sm text-amber-700">
                {prop.type}
              </td>
              <td className="border border-amber-200 px-4 py-3 font-mono text-sm text-amber-700">
                {prop.default}
              </td>
              <td className="border border-amber-200 px-4 py-3 text-sm text-amber-700">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ComponentPageProps {
  params: {
    component: string;
  };
}

export default function ComponentClient({
  componentData,
  allData,
}: {
  componentData: {
    title: string;
    description: string;
    code: string;
    sourceCode: string;
    installCommands: string;
    utilsCode: string;
    props: PropData[];
  };
  allData: ComponentsData;
}) {
  const [selected, setSelected] = useState<TOC_INTERFACE | undefined>(
    undefined
  );

  const handleSelect = (item: TOC_INTERFACE) => {
    setSelected(item);
    document
      .getElementById(item.value || "")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Sidebar with active component
  const updatedCategories = allData.categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      ...item,
      active: item.href === `/components/${componentData.sourceCode}`,
    })),
  }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto  flex-1 items-start px-4  lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:px-8">
        <Sidebar categories={updatedCategories} />

        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full min-w-0">
            {/* Header */}
            <div className="space-y-2 pt-[99px]">
              <h1 className="text-3xl font-bold tracking-tight text-amber-900">
                {componentData.title}
              </h1>
              <p className="text-lg text-neutral-700">
                {componentData.description}
              </p>
            </div>

            {/* Preview and Code Tabs */}
            <div className="pt-8 pb-12 '  ">
              <Tabs defaultValue="preview" className="w-full ">
                <section
                  id="preview"
                  className="flex items-center justify-between"
                >
                  <TabsList>
                    <TabsTrigger
                      value="preview"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Monitor className="h-4 w-4 " />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Code className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                </section>

                <TabsContent
                  value="preview"
                  className="border border-amber-200 rounded-lg bg-white"
                >
                  <ComponentPreview componentData={componentData} />
                </TabsContent>

                <TabsContent value="code">
                  <CodeBlock
                    code={componentData.code}
                    filename={componentData.sourceCode}
                    language="tsx"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Installation */}
            <section className="space-y-4" id="installation">
              <h2 className="text-2xl font-semibold text-amber-900 flex items-center gap-2">
                {/* <Package className="h-6 w-6" /> */}
                Installation
              </h2>

              <Tabs defaultValue="manual" className="w-full">
                <TabsList>
                  <TabsTrigger value="manual">Manual</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-amber-800 mb-3">
                      Install dependencies
                    </h3>
                    <CodeBlock
                      code={componentData.installCommands}
                      language="bash"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-amber-800 mb-3">
                      Add util file
                    </h3>
                    <CodeBlock
                      code={componentData.utilsCode}
                      filename="lib/utils.ts"
                      language="tsx"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-amber-800 mb-3">
                      Copy the source code
                    </h3>
                    <CodeBlock
                      code={componentData.code}
                      filename={componentData.sourceCode}
                      language="tsx"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Props */}
            <section className="mt-12 space-y-4" id="props">
              <h2 className="text-2xl font-semibold text-amber-900 flex items-center gap-2">
                {/* <Settings className="h-6 w-6" /> */}
                Props
              </h2>
              <PropsTable props={componentData.props} />
            </section>
          </div>
        </main>
        <div className="fixed bottom-[16%] left-1/2 -translate-x-1/2 z-50">
          <FloatingSearch />
        </div>

        <FeaturesGrid />
      </div>
    </div>
  );
}
