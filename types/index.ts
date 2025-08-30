export interface ComponentData {
  title: string;
  description: string;
  tag?: string[];
  code: string;
  installCommands: string;
  utilsCode: string;
  sourceCode: string;
  props: PropData[];
  demoData?: Record<string, any>;
}

export interface PropData {
  prop: string;
  type: string;
  required: boolean;
  default: string;
  description: string;
}

export interface SidebarItem {
  title: string;
  href: string;
  active?: boolean;
}

export interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export interface ComponentsData {
  categories: SidebarCategory[];
  components: Record<string, ComponentData>;
}